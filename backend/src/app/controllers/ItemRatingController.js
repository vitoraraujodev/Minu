import * as Yup from 'yup';

import Item from '../models/Item';
import ItemRating from '../models/ItemRating';

class ItemRatingController {
  async index(req, res) {
    const ratings = await ItemRating.findAll({
      where: { item_id: req.params.id },
      order: [['createdAt', 'DESC']],
      attributes: [
        'id',
        'description',
        'client_name',
        'rating',
        'item_id',
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

    const item = await Item.findByPk(id);

    if (!item) {
      return res.status(400).json({ error: "Item doesn't exist." });
    }

    const itemRating = await ItemRating.create({
      ...req.body,
      item_id: id,
    });

    const raters = item.raters + 1;
    const rating = (item.raters * item.rating + req.body.rating) / raters;
    await item.update({ raters, rating });

    return res.json(itemRating);
  }
}

export default new ItemRatingController();
