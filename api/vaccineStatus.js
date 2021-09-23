const fetch = require('node-fetch');
const geocodes = require('./geocodes.json');

const CACHE_DURATION = parseFloat(process.env.CACHE_DURATION ?? '5');

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
        const {
          equipamento,
          endereco,
          tipo_posto,
          status_fila,
          coronavac,
          pfizer,
          astrazeneca,
          intercambialidade,
        } = vp;
        const { posicao } = geocodes[equipamento];
        const vacinas = {
          coronavac,
          pfizer,
          astrazeneca,
          intercambialidade,
        };

        return {
          equipamento,
          endereco,
          tipo_posto,
          status_fila,
          posicao,
          vacinas: Object.keys(vacinas).filter((v) => vacinas[v] === '1'),
        };
      });

    res.setHeader('Cache-Control', `s-maxage=${CACHE_DURATION * 60}`);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

module.exports = vaccineStatus;
