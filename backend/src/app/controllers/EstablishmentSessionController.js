import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import Establishment from '../models/Establishment';
import EstablishmentRating from '../models/EstablishmentRating';
import File from '../models/File';

import authConfig from '../../config/auth';

class EstablishmentSessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Dados inválidos. Por favor, verifique e tente novamente.',
      });
    }

    const { email, password } = req.body;

    const establishment = await Establishment.findOne({
      where: { email },
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
    });

    if (!establishment) {
      return res.status(400).json({ error: 'Estabelecimento não existe.' });
    }

    if (!(await establishment.checkPassword(password))) {
      return res.status(401).json({
        error: 'E-mail ou senha incorretos. Verifique e tente novamente.',
      });
    }

    const { ratings } = establishment;

    const raters = ratings.length;

    const rating =
      raters > 0
        ? ratings
            .map((rate) => rate.rating)
            .reduce((acumulator, rate) => acumulator + rate) / raters
        : 0;

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
    } = establishment;

    return res.json({
      establishment: {
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
      },
      token: jwt.sign({ id, kind: 'establishment' }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new EstablishmentSessionController();
