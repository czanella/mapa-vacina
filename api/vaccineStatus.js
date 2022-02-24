const fetch = require('node-fetch');
const geocodes = require('./geocodes.json');

const CACHE_DURATION = parseFloat(process.env.CACHE_DURATION ?? '5');
const DATE_REGEX = /^(\d+)-(\d+)-(\d+)\s+(\d+):(\d+):(\d+)(\.\d+)?$/;

const parseDate = (dateString) => {
  const match = dateString.match(DATE_REGEX);

  if (!match) {
    return new Date(0);
  }

  const [, year, month, day, hours, minutes, seconds, milisseconds] = match;

  return new Date(year, month - 1, day, hours, minutes, seconds, milisseconds);
};

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
          data_hora,
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

        if (!data_hora) {
          return null;
        }

        return {
          equipamento,
          endereco,
          tipo_posto,
          status_fila,
          data_hora: parseDate(data_hora).getTime(),
          posicao,
          vacinas: Object.keys(vacinas).filter((v) => vacinas[v] === '1'),
        };
      }).filter(Boolean);

    res.setHeader('Cache-Control', `s-maxage=${CACHE_DURATION * 60}`);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

module.exports = vaccineStatus;
