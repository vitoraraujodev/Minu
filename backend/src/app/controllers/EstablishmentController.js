import * as Yup from 'yup';
import fs from 'fs';
import { resolve } from 'path';
import { Op } from 'sequelize';
import { getHours, getDay } from 'date-fns';

import Establishment from '../models/Establishment';
import File from '../models/File';
import Menu from '../models/Menu';
import Item from '../models/Item';
import Additional from '../models/Additional';
import EstablishmentRating from '../models/EstablishmentRating';
import ItemRating from '../models/ItemRating';

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
      ],
      include: [
        {
          model: File,
          as: 'photo',
          required: false,
          attributes: ['id', 'path', 'url'],
        },
        {
          model: EstablishmentRating,
          as: 'ratings',
          required: false,
          attributes: ['id', 'description', 'rating', 'client_name'],
        },
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
          ratings,
          photo,
        } = establishment;

        const raters = ratings.length;

        const rating =
          raters > 0
            ? ratings
                .map((rate) => rate.rating)
                .reduce((acumulator, rate) => acumulator + rate) / raters
            : 0;

        return {
          id,
          establishment_name,
          cep,
          address_number,
          street,
          complement,
          ratings,
          raters,
          rating,
          photo,
          menus: menus.filter((menu) => menu.availability[weekDay] === '1'),
        };
      })
      .then(async (establishment) => {
        if (establishment.menus.length > 0) {
          const establishmentItems = await Item.findAll({
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
            ],
            include: [
              {
                model: File,
                required: false,
                as: 'photo',
                attributes: ['id', 'path', 'url'],
              },
              {
                model: ItemRating,
                as: 'ratings',
                required: false,
                order: [['created_at', 'DESC']],
                attributes: ['id', 'description', 'rating', 'client_name'],
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

          const items = establishmentItems.map((item) => {
            const raters = item.ratings.length;
            const rating =
              raters > 0
                ? item.ratings
                    .map((rate) => rate.rating)
                    .reduce((acumulator, rate) => acumulator + rate) / raters
                : 0;

            const {
              id,
              code,
              title,
              description,
              category,
              preparation_time,
              price,
              available,
              photo,
              additionals,
              ratings,
            } = item;

            return {
              id,
              code,
              title,
              description,
              category,
              preparation_time,
              price,
              available,
              photo,
              additionals,
              ratings,
              raters,
              rating,
            };
          });

          return { ...establishment, items };
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
        'Confirmação de senha incorreta.'
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados inválidos.' });
    }

    const establishmentExists = await Establishment.findOne({
      where: { email: req.body.email },
    });

    if (establishmentExists) {
      return res.status(400).json({ error: 'Esse e-mail já está em uso.' });
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
      return res.status(400).json({ error: 'Dados inválidos.' });
    }

    const { cnpj, oldPassword, photo_id } = req.body;

    const mail = req.body.email;

    const establishment = await Establishment.findByPk(req.establishmentId);

    if (!establishment) {
      return res
        .status(400)
        .json({ error: 'Estabelecimento não está cadastrado' });
    }

    if (mail && mail !== establishment.email) {
      const establishmentExists = await Establishment.findOne({
        where: { mail },
      });

      if (establishmentExists) {
        return res.status(400).json({ error: 'Esse e-mail já está em uso.' });
      }
    }

    if (cnpj && cnpj !== establishment.cnpj) {
      const establishmentExists = await Establishment.findOne({
        where: { cnpj },
      });

      if (establishmentExists) {
        return res
          .status(400)
          .json({ error: 'Estabelecimento já está cadastrado.' });
      }
    }

    if (oldPassword && !(await establishment.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Senha antiga incorreta.' });
    }

    if (
      photo_id &&
      establishment.photo_id &&
      photo_id !== establishment.photo_id
    ) {
      const file = await File.findByPk(establishment.photo_id);
      fs.unlink(
        resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', file.path),
        (err) => {
          if (err) throw err;
        }
      );
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
