import axios from 'axios';

const headers = {
  'content-type': 'application/json',
  Accept: '*/*',
};

const endPoint = 'http://peripherals.seuminu.com:9000/topics';

class WaiterCallController {
  async store(req, res) {
    const waiterCallInputEndpoint = `${endPoint}/WaiterCall`;

    try {
      await axios.post(waiterCallInputEndpoint, JSON.stringify(req.body), {
        headers,
      });

      return res.status(200).json({ okay: true });
    } catch (err) {
      return res.status(400).json({
        error:
          'Houve um erro ao chamar o garçom. Verifique sua conexão e tente novamente.',
      });
    }
  }

  async delete(req, res) {
    const waiterCallArchiveEndpoint = `${endPoint}/WaiterCall`;

    try {
      axios.post(waiterCallArchiveEndpoint, JSON.stringify(req.body), {
        headers,
      });

      return res.status(200).json({ okay: true });
    } catch (err) {
      return res.status(400).json({
        error:
          'Houve um erro ao arquivar essa chamada. Verifique sua conexão e tente novamente.',
      });
    }
  }
}

export default new WaiterCallController();
