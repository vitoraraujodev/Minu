import * as Yup from 'yup';

import Item from '../models/Item';
import Additional from '../models/Additional';
import ItemAdditional from '../models/ItemAdditional';
import File from '../models/File';

class ItemController {
  async index(req, res) {
    const items = await Item.findAll({
      where: { establishment_id: req.establishmentId },
      attributes: [
        'id',
        'title',
        'code',
        'description',
        'price',
        'available',
        'preparation_time',
        'establishment_id',
        'rating',
        'raters',
      ],
      order: [['title', 'ASC']],
      include: [
        { model: File, as: 'photo', attributes: ['id', 'path', 'url'] },
        {
          model: Additional,
          as: 'additionals',
          order: [['title', 'ASC']],
          attributes: ['id', 'title', 'price', 'available'],
          through: {
            model: ItemAdditional,
            as: 'item-additionals',
          },
        },
      ],
    });

    return res.json(items);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      code: Yup.string(),
      description: Yup.string(),
      available: Yup.string(),
      price: Yup.number().required(),
      preparation_time: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const establishment_id = req.establishmentId; // eslint-disable-line

    const itemExists = await Item.findOne({
      where: { title: req.body.title, establishment_id },
    });

    if (itemExists) {
      return res.status(400).json({ error: 'Item title already in use.' });
    }

    const item = await Item.create({
      ...req.body,
      establishment_id,
    });

    return res.json(item);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      code: Yup.string(),
      description: Yup.string(),
      available: Yup.string(),
      price: Yup.number(),
      preparation_time: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const establishment_id = req.establishmentId; // eslint-disable-line

    let item = await Item.findByPk(req.params.id);

    if (!item) {
      return res.status(400).json({ error: 'Item does not exist.' });
    }

    if (req.body.title && item.title !== req.body.title) {
      const itemExists = await Item.findOne({
        where: { title: req.body.title, establishment_id },
      });

      if (itemExists) {
        return res.status(400).json({ error: 'Item title already in use.' });
      }
    }

    const { photo_id } = req.body; // eslint-disable-line

    if (photo_id && item.photo_id && photo_id !== item.photo_id) { // eslint-disable-line
      const file = await File.findByPk(item.photo_id);
      await file.destroy();
    }

    item = await item.update({
      ...req.body,
    });

    return res.json(item);
  }

  async delete(req, res) {
    const { id } = req.params;

    const item = await Item.findByPk(id);

    if (!item) {
      return res.status(400).json('Item does not exist.');
    }

    if (!item.establishment_id === req.establishmentId) {
      return res.status(401).json('You can only delete your own items.');
    }

    const file = await File.findByPk(item.photo_id);

    if (file) {
      await file.destroy();
    }
    await item.destroy();

    return res.json({ okay: true });
  }
}

export default new ItemController();
