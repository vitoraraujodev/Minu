import * as Yup from 'yup';

import Establishment from '../models/Establishment';

class EstablishmentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      cnpj: Yup.string().required(),
      email: Yup.string().email().required(),
      phone_number: Yup.string().required(),
      establishment_name: Yup.string().required(),
      manager_name: Yup.string().required(),
      manager_lastname: Yup.string().required(),
      cep: Yup.string().required(),
      address_number: Yup.number().required(),
      street: Yup.string().required(),
      complement: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      password: Yup.string().min(6),
      confirm_password: Yup.string().when('password', (password, field) =>
        field.required().oneOf([Yup.ref('password')])
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const establishmentExists = await Establishment.findOne({
      where: { email: req.body.email },
    });

    if (establishmentExists) {
      return res.status(400).json({ error: 'Establishment already exists.' });
    }

    await Establishment.create(req.body);

    return res.json({
      okay: true,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      cnpj: Yup.string(),
      email: Yup.string().email(),
      phone_number: Yup.string(),
      establishment_name: Yup.string(),
      manager_name: Yup.string(),
      manager_lastname: Yup.string(),
      cep: Yup.string(),
      address_number: Yup.number(),
      street: Yup.string(),
      complement: Yup.string(),
      city: Yup.string(),
      state: Yup.string(),
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
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { email, cnpj, oldPassword } = req.body;

    const establishment = await Establishment.findByPk(req.establishmentId);

    if (email !== establishment.email) {
      const establishmentExists = await Establishment.findOne({
        where: { email },
      });

      if (establishmentExists) {
        return res.status(400).json({ errer: 'E-mail already in use.' });
      }
    }

    if (cnpj !== establishment.cnpj) {
      const establishmentExists = await Establishment.findOne({
        where: { cnpj },
      });

      if (establishmentExists) {
        return res.status(400).json({ errer: 'Establishment already exists.' });
      }
    }

    if (oldPassword && !(await establishment.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Old Password does not match.' });
    }

    await establishment.update(req.body);

    const {
      id,
      phone_number,
      establishment_name,
      manager_name,
      manager_lastname,
      cep,
      address_number,
      street,
      complement,
      city,
      state,
      photo,
    } = await Establishment.findByPk(req.establishmentId);

    /*
    {
      include: [
        { model: File, as: 'photo', attributes: ['id', 'path', 'url'] },
      ],
    }
    */

    return res.json({
      id,
      cnpj,
      email,
      phone_number,
      establishment_name,
      manager_name,
      manager_lastname,
      cep,
      address_number,
      street,
      complement,
      city,
      state,
      photo,
    });
  }
}

export default new EstablishmentController();
