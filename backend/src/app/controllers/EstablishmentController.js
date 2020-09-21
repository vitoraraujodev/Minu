import * as Yup from 'yup';

import Establishment from '../models/Establishment';
import File from '../models/File';
import Menu from '../models/Menu';
import Item from '../models/Item';
import Additional from '../models/Additional';

class EstablishmentController {
  async index(req, res) {
    await Establishment.findByPk(req.params.id, {
      attributes: [
        'id',
        'establishment_name',
        'cep',
        'address_number',
        'street',
        'complement',
        'rating',
        'raters',
      ],
      include: [
        { model: File, as: 'photo', attributes: ['id', 'path', 'url'] },
        {
          model: Menu,
          as: 'menus',
          where: { available: true },
          attributes: ['id', 'title', 'availability', 'start_at', 'end_at'],
          include: [
            {
              model: Item,
              where: { available: true },
              order: [['title', 'ASC']],
              as: 'items',
              attributes: [
                'id',
                'code',
                'title',
                'description',
                'category',
                'preparation_time',
                'price',
                'available',
                'rating',
                'raters',
              ],
              include: [
                { model: File, as: 'photo', attributes: ['id', 'path', 'url'] },
                {
                  model: Additional,
                  as: 'additionals',
                  where: { available: true },
                  order: [['title', 'ASC']],
                  attributes: ['id', 'title', 'price'],
                },
              ],
            },
          ],
        },
      ],
    }).then((result) => res.json(result));
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      cnpj: Yup.string(),
      email: Yup.string().email().required(),
      establishment_name: Yup.string().required(),
      manager_name: Yup.string().required(),
      manager_lastname: Yup.string().required(),
      cep: Yup.string().required(),
      address_number: Yup.number().required(),
      street: Yup.string().required(),
      complement: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      admin_pin: Yup.string().length(4).required(),
      password: Yup.string().min(6).required(),
      confirm_password: Yup.string().oneOf(
        [Yup.ref('password'), null],
        'Passwords must match.'
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const establishmentExists = await Establishment.findOne({
      where: { email: req.body.email },
    });

    if (establishmentExists) {
      return res.status(400).json({ error: 'E-mail already in use.' });
    }

    await Establishment.create(req.body);

    return res.json({ okay: true });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      cnpj: Yup.string(),
      email: Yup.string().email(),
      establishment_name: Yup.string(),
      manager_name: Yup.string(),
      manager_lastname: Yup.string(),
      cep: Yup.string(),
      address_number: Yup.number(),
      street: Yup.string(),
      complement: Yup.string(),
      city: Yup.string(),
      state: Yup.string(),
      admin_pin: Yup.string().length(4),
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

    const { cnpj, oldPassword, photo_id } = req.body; // eslint-disable-line

    const mail = req.body.email;

    const establishment = await Establishment.findByPk(req.establishmentId);

    if (mail && mail !== establishment.email) {
      const establishmentExists = await Establishment.findOne({
        where: { mail },
      });

      if (establishmentExists) {
        return res.status(400).json({ error: 'E-mail already in use.' });
      }
    }

    if (cnpj && cnpj !== establishment.cnpj) {
      const establishmentExists = await Establishment.findOne({
        where: { cnpj },
      });

      if (establishmentExists) {
        return res.status(400).json({ error: 'Establishment already exists.' });
      }
    }

    if (oldPassword && !(await establishment.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Old Password does not match.' });
    }

    if (photo_id && establishment.photo_id && photo_id !== establishment.photo_id) { // eslint-disable-line
      const file = await File.findByPk(establishment.photo_id);
      await file.destroy();
    }

    await establishment.update(req.body);

    const {
      id,
      establishment_name, //eslint-disable-line
      email,
      manager_name, //eslint-disable-line
      manager_lastname, //eslint-disable-line
      cep,
      address_number, //eslint-disable-line
      street,
      complement,
      city,
      state,
      photo,
      rating,
      raters,
    } = await Establishment.findByPk(req.establishmentId, {
      include: [
        { model: File, as: 'photo', attributes: ['id', 'path', 'url'] },
        {
          model: Menu,
          as: 'menus',
          attributes: ['id', 'title', 'availability', 'start_at', 'end_at'],
        },
      ],
    });

    return res.json({
      id,
      cnpj,
      email,
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
      rating,
      raters,
    });
  }
}

export default new EstablishmentController();
