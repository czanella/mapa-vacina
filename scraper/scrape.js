const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '..', '.env'),
});

const fetch = require('node-fetch');
const fs = require('fs');

const GEOCODES_FILE = path.join(
  __dirname,
  '..',
  'client',
  'src',
  'data',
  'geocodes.json'
);

const geocode = async (address) => {
  const apiEndpoint = new URL(
    'https://maps.googleapis.com/maps/api/geocode/json'
  );
  apiEndpoint.searchParams.set('key', process.env.GOOGLE_GEOCODING_API_KEY);
  apiEndpoint.searchParams.set('address', address);
  apiEndpoint.searchParams.set(
    'bounds',
    '-24.032516,-46.870244|-23.332120,-46.301311'
  );
  apiEndpoint.searchParams.set(
    'components',
    'administrative_area:São Paulo|country:BR'
  );

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
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    body: 'dados=dados',
    method: 'POST',
  });

  const vaccinationPoints = await result.json();

  // Geocode the vaccination points
  for (let i = 0; i < vaccinationPoints.length; i += 1) {
    const vp = vaccinationPoints[i];
    console.log(
      `Geocoding ${vp.equipamento} (${i + 1} of ${
        vaccinationPoints.length
      })... `
    );

    // We check if the VP hasn't been geocoded yet
    // If not, we try to geocode it and include in the geocodes dict
    if (geocodes[vp.equipamento]) {
      console.log('already geocoded');
      continue;
    }

    try {
      const geocodeResponse = await geocode(vp.endereco.split('-')[0].trim());

      const geocodeData = await geocodeResponse.json();

      if (geocodeData.status !== 'OK') {
        throw new Error(geocodeData.error_message || geocodeData.status);
      }

      const { lat: latitude, lng: longitude } =
        geocodeData.results[0].geometry.location;

      geocodes[vp.equipamento] = {
        endereco: vp.endereco,
        latitude,
        longitude,
      };
    } catch (err) {
      console.log('error!', err);
      geocodes[vp.equipamento] = {
        endereco: vp.endereco,
        ...err,
      };
    }

    fs.writeFileSync(GEOCODES_FILE, JSON.stringify(geocodes, null, 2));
  }
};

go()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
