// import * as Yup from 'yup';
import axios from 'axios';
// import Establishment from '../models/Establishment';

class WaiterCallController {
  async delete(req, res) {
    const orderArchiveEndpoint =
      'http://peripherals.seuminu.com:9000/topics/WaiterCallArchiveNotification';

    const headers = {
      'content-type': 'application/json',
      Accept: '*/*',
    };

    try {
      axios.post(orderArchiveEndpoint, JSON.stringify(req.body), { headers });

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
