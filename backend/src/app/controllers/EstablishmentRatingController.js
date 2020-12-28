import * as Yup from 'yup';

import Establishment from '../models/Establishment';
import EstablishmentRating from '../models/EstablishmentRating';

class EstablishmentRatingController {
  async index(req, res) {
    const ratings = await EstablishmentRating.findAll({
      where: { establishment_id: req.params.id },
      order: [['createdAt', 'DESC']],
      attributes: [
        'id',
        'description',
        'client_name',
        'rating',
        'establishment_id',
        'createdAt',
      ],
    });

    return res.json(ratings);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      rating: Yup.number().required(),
      description: Yup.string(),
      client_name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Dados inválidos. Por favor, verifique e tente novamente.',
      });
    }

    const { id } = req.params;

    const establishment = await Establishment.findByPk(id);

    if (!establishment) {
      return res.status(400).json({
        error:
          'Estabelecimento não encontrado. Por favor, verifique e tente novamente.',
      });
    }

    const establishmentRating = await EstablishmentRating.create({
      ...req.body,
      establishment_id: id,
    });

    return res.json(establishmentRating);
  }
}

export default new EstablishmentRatingController();
