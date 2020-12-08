import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import Customer from '../models/Customer';
import Avatar from '../models/Avatar';

import authConfig from '../../config/auth';

class CustomerSessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      phone_number: Yup.string().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados inválidos.' });
    }

    const { phone_number } = req.body;

    const customer = await Customer.findOne({
      where: { phone_number },
      include: [
        { model: Avatar, as: 'avatar', attributes: ['id', 'path', 'url'] },
      ],
    });

    if (!customer) {
      return res.status(400).json({ error: 'Cliente não registrado.' });
    }

    return res.json({
      customer,
      token: jwt.sign(
        { id: customer.id, kind: 'customer' },
        authConfig.secret,
        {
          expiresIn: authConfig.expiresIn,
        }
      ),
    });
  }
}

export default new CustomerSessionController();
