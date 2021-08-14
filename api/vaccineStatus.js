const fetch = require('node-fetch');
const geocodes = require('./geocodes.json');

const CACHE_MINUTES = 9;

const vaccineStatus = async (req, res) => {
  try {
    const vaccineStatus = await fetch(process.env.VACCINATION_POINTS_ENDPOINT, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: 'dados=dados',
      method: 'POST',
    });

    const vaccinationPoints = await vaccineStatus.json();

    const result = vaccinationPoints
      .filter((vp) => geocodes[vp.equipamento])
      .map((vp) => {
        const { equipamento, endereco, tipo_posto, status_fila } = vp;
        const { posicao } = geocodes[equipamento];

        return {
          equipamento,
          endereco,
          tipo_posto,
          status_fila,
          posicao,
        };
      });

    res.setHeader('Cache-Control', `s-maxage=${CACHE_MINUTES * 60}`);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

module.exports = vaccineStatus;
