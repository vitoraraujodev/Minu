import * as Yup from 'yup';
import { Op } from 'sequelize';

import Customer from '../models/Customer';
import Establishment from '../models/Establishment';

class EstablishmentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      lastname: Yup.string().required(),
      email: Yup.string().email().required(),
      status: Yup.string(),
      phone_number: Yup.string().required(),
      password: Yup.string().min(6).required(),
      confirm_password: Yup.string().oneOf(
        [Yup.ref('password'), null],
        'Confirmação de senha incorreta.'
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados inválidos.' });
    }

    const customerExists = await Customer.findOne({
      where: {
        [Op.or]: [
          { email: req.body.email },
          { phone_number: req.body.phone_number },
        ],
      },
    });

    const establishmentExists = await Establishment.findOne({
      where: { email: req.body.email },
    });

    if (
      (customerExists && customerExists.email === req.body.email) ||
      establishmentExists
    ) {
      if (customerExists.phone_number === req.body.phone_number) {
        return res.status(400).json({
          error: 'E-mail e número de celular já estão em uso.',
        });
      }
      return res.status(400).json({ error: 'Esse e-mail já está em uso.' });
    }

    if (
      customerExists &&
      customerExists.phone_number === req.body.phone_number
    ) {
      return res
        .status(400)
        .json({ error: 'Esse número de celular já está em uso.' });
    }

    const customer = await Customer.create(req.body);

    return res.json(customer);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      lastname: Yup.string(),
      email: Yup.string().email(),
      status: Yup.string(),
      phone_number: Yup.string(),
      old_password: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirm_password: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados inválidos.' });
    }

    const customerExists = await Customer.findByPk(req.customerId);

    if (!customerExists) {
      return res.status(400).json({ error: 'Cliente não está cadastrado' });
    }

    const customer = await Customer.findOne({
      where: {
        [Op.or]: [
          { email: req.body.email },
          { phone_number: req.body.phone_number },
        ],
      },
    });

    const establishmentExists = await Establishment.findOne({
      where: { email: req.body.email },
    });

    if (
      (customer && customer.email === req.body.email) ||
      establishmentExists
    ) {
      if (customer.phone_number === req.body.phone_number) {
        return res.status(400).json({
          error: 'E-mail e número do celular já estão em uso.',
        });
      }
      return res.status(400).json({ error: 'Esse e-mail já está em uso.' });
    }

    if (customer.phone_number === req.body.phone_number) {
      return res
        .status(400)
        .json({ error: 'Esse número de celular já está em uso.' });
    }

    const {
      name,
      lastname,
      email,
      status,
      phone_number,
    } = await Customer.update(req.body);

    return res.json({ name, lastname, email, status, phone_number });
  }
}

export default new EstablishmentController();
