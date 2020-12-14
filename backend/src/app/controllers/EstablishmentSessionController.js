import aws from 'aws-sdk';
import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import Establishment from '../models/Establishment';
import EstablishmentRating from '../models/EstablishmentRating';

import authConfig from '../../config/auth';

class EstablishmentSessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados inválidos.' });
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

    aws.config.update({ region: 'us-east-2' });
    const s3 = new aws.S3({ apiVersion: '2006-03-01' });

    const params = {
      Bucket: 'minu-general',
      Prefix: `establishments/photo/${establishment.id}`,
    };

    const imageKey = await new Promise((accept) => {
      s3.listObjects(params, (err, data) => {
        // This function can return many different file extensions, so we order by lastModified
        if (data.Contents.length > 0) {
          const orderedContents = data.Contents.sort((actual, next) => {
            if (actual.LastModified > next.LastModified) {
              return -1;
            }
            return 1;
          });
          accept(orderedContents[0].Key);
        } else {
          accept(null);
        }
      });
    });

    const photo = imageKey
      ? `https://minu-general.s3.us-east-2.amazonaws.com/${imageKey}`
      : null;

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
      token: jwt.sign({ id, kind: 'establishment' }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new EstablishmentSessionController();
