import * as Yup from 'yup';
import { Op } from 'sequelize';
import { getHours, getDay } from 'date-fns';

import Establishment from '../models/Establishment';
import File from '../models/File';
import Menu from '../models/Menu';
import Item from '../models/Item';
import Additional from '../models/Additional';

class EstablishmentController {
  async index(req, res) {
    const date = new Date();
    const weekDay = getDay(date);

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
      ],
    })
      .then(async (establishment) => {
        const menus = await Menu.findAll({
          where: {
            establishment_id: establishment.id,
            available: true,
            start_at: { [Op.lte]: getHours(date) },
            end_at: { [Op.gt]: getHours(date) },
          },
          order: [['title', 'ASC']],
          attributes: ['id', 'title', 'availability', 'start_at', 'end_at'],
        });

        const {
          id,
          establishment_name,
          cep,
          address_number,
          street,
          complement,
          rating,
          raters,
          photo,
        } = establishment;

        return {
          id,
          establishment_name,
          cep,
          address_number,
          street,
          complement,
          rating,
          raters,
          photo,
          menus: menus.filter((menu) => menu.availability[weekDay] === '1'),
        };
      })
      .then(async (establishment) => {
        if (establishment.menus.length > 0) {
          const items = await Item.findAll({
            where: {
              establishment_id: establishment.id,
            },
            order: [['title', 'ASC']],
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
              {
                model: File,
                required: false,
                as: 'photo',
                attributes: ['id', 'path', 'url'],
              },
              {
                model: Menu,
                where: {
                  id: { [Op.in]: establishment.menus.map((menu) => menu.id) },
                  available: true,
                },
                as: 'menus',
                attributes: [],
              },
              {
                model: Additional,
                required: false,
                as: 'additionals',
                order: [['title', 'ASC']],
                attributes: ['id', 'title', 'price', 'available'],
                through: {
                  attributes: [],
                },
              },
            ],
          });

          return { ...establishment, items };
        }
        return establishment;
      })
      .then((establishment) => {
        if (establishment.items && establishment.items.length > 0) {
          const starters = establishment.items.filter(
            (item) => item.category === 'Entradas'
          );

          const mains = establishment.items.filter(
            (item) => item.category === 'Pratos principais'
          );

          const desserts = establishment.items.filter(
            (item) => item.category === 'Sobremesas'
          );

          const drinks = establishment.items.filter(
            (item) => item.category === 'Bebidas'
          );

          const alcoholics = establishment.items.filter(
            (item) => item.category === 'Bebidas alcoólicas'
          );

          const {
            id,
            establishment_name,
            cep,
            address_number,
            street,
            complement,
            rating,
            raters,
            photo,
          } = establishment;

          return {
            id,
            establishment_name,
            cep,
            address_number,
            street,
            complement,
            rating,
            raters,
            photo,
            starters,
            mains,
            desserts,
            drinks,
            alcoholics,
          };
        }
        return establishment;
      })
      .then((result) => res.json(result));
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
      establishment_name,
      email,
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
