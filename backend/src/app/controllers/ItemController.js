import * as Yup from 'yup';

import Item from '../models/Item';
import Additional from '../models/Additional';
import ItemAdditional from '../models/ItemAdditional';
import File from '../models/File';

class ItemController {
  async index(req, res) {
    const items = await Item.findAll({
      where: { establishment_id: req.establishmentId },
      order: [['title', 'ASC']],
      include: [
        { model: File, as: 'photo', attributes: ['id', 'path', 'url'] },
        {
          model: Additional,
          as: 'additionals',
          order: [['title', 'ASC']],
          attributes: ['id', 'title', 'price', 'available'],
          through: {
            attributes: [],
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
      category: Yup.string().required(),
      available: Yup.boolean(),
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

    const { additionals } = req.body;

    if (additionals && additionals.length > 0) {
        additionals.map(async (additional_id) => { // eslint-disable-line
        const additional = await Additional.findByPk(additional_id);

        const ItemAdditionalExists = await ItemAdditional.findOne({
          where: { additional_id, item_id: item.id },
        });

        if (ItemAdditionalExists) {
          const error = `${additional.title} já é adicional desse produto.`;
          return error;
        }

        if (
          additional.establishment_id !== establishment_id || // eslint-disable-line
          item.establishment_id !== establishment_id    // eslint-disable-line
        ) {
          const error = `${additional.title} não é um adicional do seu estabelecimento.`;
          return error;
        }

        const itemAdditional = await ItemAdditional.create({
          item_id: item.id,
          additional_id,
        });

        if (itemAdditional) return `${additional.title} criado com sucesso!`;
      });
    }

    return res.json(item);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      code: Yup.string(),
      category: Yup.string(),
      description: Yup.string(),
      available: Yup.boolean(),
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

    const { additionals } = req.body;

    if (additionals && additionals.length > 0) {
      item = await Item.findByPk(req.params.id, {
        include: [
          {
            model: Additional,
            as: 'additionals',
            order: ['ASC'],
            attributes: ['id'],
            through: {
              model: ItemAdditional,
              as: 'item-additionals',
            },
          },
        ],
      });

      const itemAdditionals = item.additionals.map((add) => add.id);

      additionals.map(async (additional_id) => { // eslint-disable-line
        const additional = await Additional.findByPk(additional_id);

        if (
            additional.establishment_id !== establishment_id || // eslint-disable-line
            item.establishment_id !== establishment_id    // eslint-disable-line
        ) {
          const error = `${additional.title} não é um adicional do seu estabelecimento.`;
          return error;
        }
        if (!itemAdditionals.includes(additional_id)) {
          const itemAdditional = await ItemAdditional.create({
            item_id: item.id,
            additional_id,
          });
          if (itemAdditional) return `${additional.title} criado com sucesso!`;
        }
      });

      itemAdditionals.map(async (additional_id) => { // eslint-disable-line
        if (!additionals.includes(additional_id)) {
          const itemAdditional = await ItemAdditional.findOne({
            where: { additional_id, item_id: item.id },
          });

          await itemAdditional.destroy();
        }
      });
      item = await Item.findByPk(req.params.id);
      return res.json(item);
    }

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
