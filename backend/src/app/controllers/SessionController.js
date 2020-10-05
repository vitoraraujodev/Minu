import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import Establishment from '../models/Establishment';
import File from '../models/File';
import EstablishmentRating from '../models/EstablishmentRating';

import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const { email, password } = req.body;

    const establishment = await Establishment.findOne({
      where: { email },
      include: [
        { model: File, as: 'photo', attributes: ['id', 'path', 'url'] },
        {
          model: EstablishmentRating,
          as: 'ratings',
          required: false,
          attributes: ['id', 'description', 'rating', 'client_name'],
        },
      ],
    });

    if (!establishment) {
      return res.status(400).json({ error: "Establishment doesn't exist." });
    }

    if (!(await establishment.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match.' });
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
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
