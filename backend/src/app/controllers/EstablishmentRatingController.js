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
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const { id } = req.params;

    const establishment = await Establishment.findByPk(id);

    if (!establishment) {
      return res.status(400).json({ error: "Establishment doesn't exist." });
    }

    const establishmentRating = await EstablishmentRating.create({
      ...req.body,
      establishment_id: id,
    });

    const raters = establishment.raters + 1;
    const rating = (
      (establishment.raters * establishment.rating + req.body.rating) /
      raters
    ).toFixed(1);
    await establishment.update({ raters, rating });

    return res.json(establishmentRating);
  }
}

export default new EstablishmentRatingController();
