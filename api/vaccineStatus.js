const fetch = require('node-fetch');

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

    const result = {
      data: vaccinationPoints.map((vp) => {
        const { equipamento, endereco, tipo_posto, status_fila } = vp;

        return { equipamento, endereco, tipo_posto, status_fila };
      }),
    };

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

module.exports = vaccineStatus;