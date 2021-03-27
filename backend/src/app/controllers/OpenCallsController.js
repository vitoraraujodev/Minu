import axios from 'axios';

const endPoint = 'http://notifications_service.seuminu.com:5000/open-calls';

class OpenCallsController {
  async index(req, res) {
    const openCallsEndpoint = `${endPoint}/${req.establishmentId}`;

    try {
      const response = await axios.get(openCallsEndpoint);

      return res.status(200).json(response.data);
    } catch (err) {
      return res.status(400).json({
        error:
          'Houve um erro ao recuperar as chamadas. Verifique sua conexão e tente novamente.',
      });
    }
  }
}

export default new OpenCallsController();
