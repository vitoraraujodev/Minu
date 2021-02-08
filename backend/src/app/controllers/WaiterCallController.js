import axios from 'axios';
// import Establishment from '../models/Establishment';

const headers = {
  'content-type': 'application/json',
  Accept: '*/*',
};

const endPoint = 'http://peripherals.seuminu.com:9000/topics';

class WaiterCallController {
  async store(req, res) {
    const waiterCallInputEndpoint = `${endPoint}/WaiterCallNotificationInput`;

    try {
      axios.post(waiterCallInputEndpoint, JSON.stringify(req.body), {
        headers,
      });

      return res.status(200).json({ okay: true });
    } catch (err) {
      return res.status(400).json({
        error:
          'Houve um erro ao criar a chamada. Verifique e tente novamente.',
      });
    }
  }

  async delete(req, res) {
    console.log(req.body)
    const waiterCallArchiveEndpoint = `${endPoint}/WaiterCallArchiveNotification`;

    try {
      axios.post(waiterCallArchiveEndpoint, JSON.stringify(req.body), {
        headers,
      });

      return res.status(200).json({ okay: true });
    } catch (err) {
      return res.status(400).json({
        error:
          'Houve um erro ao arquivar essa chamada. Verifique e tente novamente.',
      });
    }
  }
}

export default new WaiterCallController();
