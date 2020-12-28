import * as Yup from 'yup';

import Establishment from '../models/Establishment';

class PinController {
  async store(req, res) {
    const schema = Yup.object().shape({
      admin_pin: Yup.string().required().min(4),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Dados inválidos. Por favor, verifique e tente novamente.',
      });
    }

    const { admin_pin } = req.body; // eslint-disable-line

    const establishment = await Establishment.findByPk(req.establishmentId);

    if (!establishment) {
      return res.status(400).json({
        error:
          'Estabelecimento não encontrado. Por favor, verifique e tente novamente.',
      });
    }

    if (!(await establishment.checkPin(admin_pin))) {
      return res.status(401).json({
        error: 'PIN inválido. Por favor, verifique etente novamente.',
      });
    }

    return res.status(200).json({ okay: true });
  }
}

export default new PinController();
