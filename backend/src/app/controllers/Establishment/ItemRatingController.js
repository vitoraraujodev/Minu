import * as Yup from 'yup';

import Item from '../../models/Establishment/Item';
import ItemRating from '../../models/Establishment/ItemRating';

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
      return res.status(400).json({
        error: 'Dados inválidos. Por favor, verifique e tente novamente.',
      });
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

    return res.json(itemRating);
  }
}

export default new ItemRatingController();
