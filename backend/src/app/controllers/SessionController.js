import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import Establishment from '../models/Establishment';
import File from '../models/File';
import Menu from '../models/Menu';

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
          model: Menu,
          as: 'menus',
          attributes: [
            'id',
            'title',
            'description',
            'availability',
            'start_at',
            'end_at',
          ],
        },
      ],
    });

    if (!establishment) {
      return res.status(400).json({ error: "Establishment doesn't exist." });
    }

    if (!(await establishment.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match.' });
    }

    const {
      id,
      cnpj,
      phone_number, //eslint-disable-line
      establishment_name, //eslint-disable-line
      manager_name, //eslint-disable-line
      manager_lastname, //eslint-disable-line
      cep,
      address_number, //eslint-disable-line
      street,
      complement,
      city,
      state,
      photo,
      menus,
    } = establishment;

    return res.json({
      establishment: {
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
        menus,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
