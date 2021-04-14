import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';

import Establishment from '../models/Establishment';
import File from '../models/File';
import Menu from '../models/Menu';
import Item from '../models/Item';
import Additional from '../models/Additional';
import EstablishmentRating from '../models/EstablishmentRating';
import ItemRating from '../models/ItemRating';
import Customer from '../models/Customer';

import authConfig from '../../config/auth';

import { handleActiveMenus } from '../../utils';

class EstablishmentController {
  async index(req, res) {
    const date = new Date();

    await Establishment.findByPk(req.params.id, {
      attributes: [
        'id',
        'establishment_name',
        'cep',
        'address_number',
        'street',
        'complement',
        'plan',
      ],
      include: [
        {
          model: EstablishmentRating,
          as: 'ratings',
          required: false,
          attributes: ['id', 'description', 'rating', 'client_name'],
        },
        {
          model: File,
          as: 'photo',
          required: false,
          attributes: ['id', 'path', 'url'],
        },
      ],
    })
      .then(async (establishment) => {
        if (!establishment) {
          return res.status(400).json({
            error:
              'Restaurante não encontrado. Verifique o código e tente novamente.',
          });
        }

        const {
          id,
          establishment_name,
          cep,
          address_number,
          street,
          complement,
          photo,
          ratings,
          plan,
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
          rating,
          raters,
          photo,
          plan,
        };
      })
      .then(async (establishment) => {
        if (establishment && establishment.id) {
          const menus = await Menu.findAll({
            where: {
              establishment_id: establishment.id,
              available: true,
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
            rating,
            raters,
            photo,
            plan,
          } = establishment;

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
            plan,
            menus: handleActiveMenus(menus, date),
          };
        }
      })
      .then(async (establishment) => {
        if (
          establishment &&
          establishment.id &&
          establishment.menus.length > 0
        ) {
          const items = await Item.findAll({
            where: {
              establishment_id: establishment.id,
            },
            order: [
              ['title', 'ASC'],
              [{ model: Additional, as: 'additionals' }, 'title', 'ASC'],
              [{ model: ItemRating, as: 'ratings' }, 'created_at', 'DESC'],
            ],

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
                model: ItemRating,
                as: 'ratings',
                required: false,
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
                attributes: ['id', 'title', 'price', 'available'],
                through: {
                  attributes: [],
                },
              },
              {
                model: File,
                as: 'photo',
                required: false,
                attributes: ['id', 'path', 'url'],
              },
            ],
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
      complement: Yup.string(),
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
      return res.status(400).json({
        error: 'Dados inválidos. Verifique e tente novamente.',
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

    const {
      id,
      cnpj,
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
      plan,
    } = await Establishment.create(req.body);

    const establishment = {
      id,
      cnpj,
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
      plan,
    };

    return res.json({
      establishment,
      token: jwt.sign(
        { id: establishment.id, kind: 'establishment' },
        authConfig.secret,
        {
          expiresIn: authConfig.expiresIn,
        }
      ),
    });
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
      return res.status(400).json({
        error: 'Dados inválidos. Verifique e tente novamente.',
      });
    }

    const { cnpj, oldPassword, photo_id } = req.body;

    const mail = req.body.email;

    const establishment = await Establishment.findByPk(req.establishmentId);

    if (!establishment) {
      return res.status(400).json({
        error:
          'Estabelecimento não está cadastrado. Verifique seus dados e tente novamente.',
      });
    }

    if (mail && mail !== establishment.email) {
      const establishmentExists = await Establishment.findOne({
        where: { mail },
      });

      const customerExists = await Customer.findOne({
        where: { email: req.body.email },
      });

      if (establishmentExists || customerExists) {
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
          .json({ error: 'Estabelecimento com este CNPJ já está cadastrado.' });
      }
    }

    if (oldPassword && !(await establishment.checkPassword(oldPassword))) {
      return res.status(401).json({
        error:
          'Senha antiga incorreta. Verifique seus dados e tente novamente.',
      });
    }

    if (photo_id) {
      const file = await File.findByPk(photo_id);

      if (!file) {
        return res.status(400).json({
          error:
            'Parece que essa imagem não foi registrada. Por favor, tente novamente.',
        });
      }

      if (establishment.photo_id && establishment.photo_id !== photo_id) {
        await File.destroy({ where: { id: establishment.photo_id } });
      }
    }

    await establishment.update(req.body);

    const {
      id,
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
      ratings,
      plan,
    } = await Establishment.findByPk(req.establishmentId, {
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
    });

    const raters = ratings.length;

    const rating =
      raters > 0
        ? ratings
            .map((rate) => rate.rating)
            .reduce((acumulator, rate) => acumulator + rate) / raters
        : 0;

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
      ratings,
      rating,
      raters,
      plan,
    });
  }
}

export default new EstablishmentController();
