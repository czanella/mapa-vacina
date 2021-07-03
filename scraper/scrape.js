require('dotenv').config();
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const GEOCODES_FILE = path.join(__dirname, '..', 'data', 'geocodes.json');

const geocodePositionstack = async (address) => {
  const apiEndpoint = new URL('http://api.positionstack.com/v1/forward');
  apiEndpoint.searchParams.set('access_key', process.env.POSITIONSTACK_API_KEY);
  apiEndpoint.searchParams.set('query', address);
  apiEndpoint.searchParams.set('country', 'BR');
  apiEndpoint.searchParams.set('region', 'Sao Paulo');
  apiEndpoint.searchParams.set('limit', '1');

  return fetch(apiEndpoint.toString());
};

const go = async () => {
  let geocodes = {};

  // Check for addresses that already have been geocoded
  if (fs.existsSync(GEOCODES_FILE)) {
    geocodes = JSON.parse(fs.readFileSync(GEOCODES_FILE));
  }

  // Fetch the vaccination points data
  const result = await fetch(process.env.VACCINATION_POINTS_ENDPOINT, {
    credentials: 'omit',
    headers: {
      'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:89.0) Gecko/20100101 Firefox/89.0',
      Accept: 'application/json, text/javascript, */*; q=0.01',
      'Accept-Language': 'en-US,en;q=0.5',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-Requested-With': 'XMLHttpRequest',
      Pragma: 'no-cache',
      'Cache-Control': 'no-cache'
    },
    referrer: new URL(process.env.VACCINATION_POINTS_ENDPOINT).origin,
    body: 'dados=dados',
    method: 'POST',
    mode: 'cors'
  });

  const vaccinationPoints = await result.json();

  // Geocode the vaccination points
  for (let i = 0; i < vaccinationPoints.length; i += 1) {
    const vp = vaccinationPoints[i];
    console.log(`Geocoding ${vp.equipamento} (${i + 1} of ${vaccinationPoints.length})... `);

    // We check if the VP hasn't been geocoded yet
    // If not, we try to geocode it and include in the geocodes dict
    if (geocodes[vp.equipamento]) {
      console.log('already geocoded');
      continue;
    }

    try {
      const geocodeResponse = await geocodePositionstack(
        vp.endereco.split('-')[0].trim(),
      );

      const geocodeData = await geocodeResponse.json();

      if (!geocodeResponse.ok) {
        throw new Error(geocodeData);
      }

      const { latitude, longitude, confidence } = geocodeData.data[0];
      console.log('confidence', confidence);
      if (!confidence || confidence < 0.75) {
        throw new Error('Bad confidence');
      }

      geocodes[vp.equipamento] = {
        endereco: vp.endereco,
        latitude,
        longitude,
        confidence,
      };
    } catch(err) {
      console.log('error!', err);
      geocodes[vp.equipamento] = {
        endereco: vp.endereco,
        ...err,
      };
    }

    fs.writeFileSync(
      GEOCODES_FILE,
      JSON.stringify(geocodes, null, 2),
    );
  }
}

go()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
