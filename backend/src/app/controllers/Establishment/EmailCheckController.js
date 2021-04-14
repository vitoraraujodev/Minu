import * as Yup from 'yup';

import Establishment from '../../models/Establishment/Establishment';
import Customer from '../../models/Customer/Customer';

class EmailCheckController {
  async index(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Dados inválidos. Por favor, verifique e tente novamente.',
      });
    }

    const establishmentExists = await Establishment.findOne({
      where: { email: req.body.email },
    });

    const customerExists = await Customer.findOne({
      where: { email: req.body.email },
    });

    if (establishmentExists || customerExists) {
      return res.status(400).json({ error: 'Esse e-mail já está em uso.' });
    }

    return res.status(200).json({ okay: true });
  }
}

export default new EmailCheckController();
