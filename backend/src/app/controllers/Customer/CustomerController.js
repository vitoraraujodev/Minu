import * as Yup from 'yup';
import { Op } from 'sequelize';

import Customer from '../../models/Customer/Customer';
import Avatar from '../../models/Customer/Avatar';
import Establishment from '../../models/Establishment/Establishment';

class CustomerController {
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
      return res.status(400).json({
        error: 'Dados inválidos. Por favor, verifique e tente novamente.',
      });
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

    if (customerExists) {
      if (
        customerExists.phone_number === req.body.phone_number &&
        customerExists.email === req.body.email
      ) {
        return res.status(400).json({
          error: 'E-mail e número de celular já estão em uso.',
        });
      }

      if (customerExists.phone_number === req.body.phone_number) {
        return res
          .status(400)
          .json({ error: 'Esse número de celular já está em uso.' });
      }

      if (customerExists.email === req.body.email) {
        return res.status(400).json({ error: 'Esse e-mail já está em uso.' });
      }
    }

    if (establishmentExists) {
      return res.status(400).json({ error: 'Esse e-mail já está em uso.' });
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
      avatar_id: Yup.number(),
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
      return res.status(400).json({
        error: 'Dados inválidos. Por favor, verifique e tente novamente.',
      });
    }

    const customer = await Customer.findByPk(req.customerId, {
      include: {
        model: Avatar,
        as: 'avatar',
        attributes: ['id', 'path', 'url'],
      },
    });

    if (!customer) {
      return res.status(400).json({ error: 'Cliente não está cadastrado' });
    }

    const { mail, phone, avatar_id } = req.body;

    if (mail && customer.email !== mail) {
      const customerExists = await Customer.findOne({
        where: { mail },
      });

      const establishmentExists = await Establishment.findOne({
        where: { mail },
      });

      if (customerExists || establishmentExists) {
        return res.status(400).json({ error: 'Esse e-mail já está em uso.' });
      }
    }

    if (phone && customer.phone_number !== phone) {
      const customerExists = await Customer.findOne({
        where: { phone },
      });

      if (customerExists) {
        return res.status(400).json({ error: 'Esse número já está em uso.' });
      }
    }

    if (avatar_id) {
      const avatarExists = await Avatar.findByPk(avatar_id);

      if (!avatarExists) {
        return res.status(400).json({
          error: 'Essa foto não foi registrada. Por favor, tente novamente. ',
        });
      }

      if (customer.avatar_id && customer.avatar_id !== avatar_id) {
        await Avatar.destroy({ where: { id: customer.avatar_id } });
      }
    }

    await customer.update(req.body);

    const {
      name,
      lastname,
      email,
      phone_number,
      status,
      avatar,
    } = await Customer.findByPk(req.customerId, {
      include: {
        model: Avatar,
        as: 'avatar',
        required: false,
        attributes: ['id', 'path', 'url'],
      },
    });

    return res.json({ name, lastname, email, status, phone_number, avatar });
  }
}

export default new CustomerController();
