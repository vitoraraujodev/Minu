import axios from 'axios';

const headers = {
  'content-type': 'application/json',
  Accept: '*/*',
};

const endPoint = 'http://peripherals.seuminu.com:9000/topics';

class BillCallController {
  async store(req, res) {
    const billCallInputEndpoint = `${endPoint}/BillCallNotificationInput`;

    try {
      await axios.post(billCallInputEndpoint, JSON.stringify(req.body), {
        headers,
      });
      return res.status(200).json({ okay: true });
    } catch (err) {
      return res.status(400).json({
        error:
          'Houve um erro ao pedir conta. Verifique sua conexão e tente novamente.',
      });
    }
  }

  async delete(req, res) {
    const billCallArchiveEndpoint = `${endPoint}/BillCallArchiveNotification`;

    try {
      axios.post(billCallArchiveEndpoint, JSON.stringify(req.body), {
        headers,
      });

      return res.status(200).json({ okay: true });
    } catch (err) {
      return res.status(400).json({
        error:
          'Houve um erro ao arquivar esse pedido de conta. Verifique sua conexão e tente novamente.',
      });
    }
  }
}

export default new BillCallController();
