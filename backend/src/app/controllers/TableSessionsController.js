import * as Yup from 'yup';
import axios from 'axios';

const openPostEndpoint = 'https://sessions.seuminu.com/sessionOpen';
const closePostEndpoint = 'https://sessions.seuminu.com/sessionClose';
const getEndpoint =
  'http://notifications_service.seuminu.com:5000/open-table-sessions';

const headers = {
  'content-type': 'application/json',
};

class TableSessionsController {
  async index(req, res) {
    const openTableSessionsEndpoint = `${getEndpoint}/${req.establishmentId}`;

    try {
      const response = await axios.get(openTableSessionsEndpoint);

      return res.status(200).json(response.data);
    } catch (err) {
      return res.status(400).json({
        error:
          'Houve um erro ao recuperar as sessões abertas. Verifique sua conexão e tente novamente.',
      });
    }
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      tableNumber: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Dados inválidos. Por favor, verifique e tente novamente.',
      });
    }

    const payload = { ...req.body, establishmentId: req.establishmentId };

    try {
      const response = await axios.post(
        openPostEndpoint,
        JSON.stringify(payload),
        { headers }
      );

      return res.status(200).json(response.data);
    } catch (err) {
      return res.status(400).json({
        error:
          'Houve um erro ao criar a sessão. Verifique sua conexão e tente novamente.',
      });
    }
  }

  async delete(req, res) {
    const schema = Yup.object().shape({
      tableNumber: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Dados inválidos. Por favor, verifique e tente novamente.',
      });
    }

    const payload = { ...req.body, establishmentId: req.establishmentId };
    try {
      await axios.post(closePostEndpoint, JSON.stringify(payload), { headers });
      return res.status(200).json({ okay: true });
    } catch (err) {
      return res.status(400).json({
        error:
          'Houve um erro ao fechar a sessão. Verifique sua conexão e tente novamente.',
      });
    }
  }
}

export default new TableSessionsController();
