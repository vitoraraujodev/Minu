import * as Yup from 'yup';
import { Op } from 'sequelize';

import Item from '../models/Item';
import File from '../models/File';
import Additional from '../models/Additional';
import ItemAdditional from '../models/ItemAdditional';

class ItemController {
  async index(req, res) {
    const items = await Item.findAll({
      where: { establishment_id: req.establishmentId },
      order: [['title', 'ASC']],
      include: [
        {
          model: Additional,
          as: 'additionals',
          order: [['title', 'ASC']],
          attributes: ['id', 'title', 'price', 'available'],
          through: {
            attributes: [],
          },
        },
        {
          model: File,
          as: 'photo',
          required: false,
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json(items);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      code: Yup.string(),
      description: Yup.string().required(),
      category: Yup.string().required(),
      available: Yup.boolean(),
      price: Yup.number().required(),
      preparation_time: Yup.number().required(),
      additionals: Yup.array().of(Yup.number()),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Dados inválidos. Por favor, verifique e tente novamente.',
      });
    }

    const { additionals } = req.body;

    try {
      await Item.create({
        ...req.body,
        establishment_id: req.establishmentId,
      })
        .then(async (item) => {
          // Creates all Additional relations
          if (additionals.length > 0) {
            const itemAdditionals = additionals.map((add) => ({
              item_id: item.id,
              additional_id: add,
            }));

            await ItemAdditional.bulkCreate(itemAdditionals);
          }
          return item;
        })
        .then(async (item) =>
          Item.findByPk(item.id, {
            order: [['title', 'ASC']],
            attributes: [
              'id',
              'code',
              'title',
              'description',
              'category',
              'preparation_time',
              'price',
              'available',
            ],
            include: [
              {
                model: Additional,
                required: false,
                as: 'additionals',
                order: [['title', 'ASC']],
                attributes: ['id', 'title', 'price', 'available'],
                through: {
                  attributes: [],
                },
              },
              {
                model: File,
                as: 'photo',
                required: false,
                attributes: ['id', 'path', 'url'],
              },
            ],
          })
        )
        .then((item) => res.json(item));
    } catch (err) {
      return res.status(400).json({
        error:
          'Houve um erro na requisão. Por favor, tente novamente mais tarde.',
      });
    }
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
      additionals: Yup.array().of(Yup.number()),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Dados inválidos. Por favor, verifique e tente novamente.',
      });
    }

    const item = await Item.findByPk(req.params.id, {
      include: {
        model: Additional,
        as: 'additionals',
        attributes: ['id'],
        through: {
          attributes: [],
        },
      },
    });

    if (!item) {
      return res.status(400).json({
        error:
          'Produto não encontrado. Verifique seus dados e tente novamente.',
      });
    }

    const { photo_id } = req.body;

    if (photo_id) {
      const file = await File.findByPk(photo_id);

      if (!file) {
        return res.status(400).json({
          error:
            'Parece que essa imagem não foi registrada. Por favor, tente novamente mais tarde.',
        });
      }

      if (item.photo_id && item.photo_id !== photo_id) {
        await File.destroy({ where: { id: item.photo_id } });
      }
    }

    const itemAdditionals = item.additionals.map((add) => add.id);
    const { additionals } = req.body || {};

    try {
      await Item.update(
        {
          ...req.body,
        },
        { where: { id: item.id } }
      )
        .then(async (result) => {
          // Creates all new Additionals relations
          if (additionals && additionals.length > 0) {
            const newAdditionals = additionals
              .filter((additional) => !itemAdditionals.includes(additional))
              .map((add) => ({
                item_id: item.id,
                additional_id: add,
              }));

            if (newAdditionals.length > 0)
              await ItemAdditional.bulkCreate(newAdditionals);
          }

          return result;
        })
        .then(async (result) => {
          // Delete Item's Additionals
          if (additionals) {
            const deleteAdditionals = itemAdditionals.filter(
              (itemAdditional) => !additionals.includes(itemAdditional)
            );

            if (deleteAdditionals.length > 0) {
              await ItemAdditional.destroy({
                where: {
                  item_id: item.id,
                  additional_id: {
                    [Op.in]: deleteAdditionals,
                  },
                },
              });
            }
          }
          return result;
        })
        .then(async () =>
          Item.findByPk(item.id, {
            order: [['title', 'ASC']],
            attributes: [
              'id',
              'code',
              'title',
              'description',
              'category',
              'preparation_time',
              'price',
              'available',
            ],
            include: [
              {
                model: Additional,
                required: false,
                as: 'additionals',
                order: [['title', 'ASC']],
                attributes: ['id', 'title', 'price', 'available'],
                through: {
                  attributes: [],
                },
              },
              {
                model: File,
                as: 'photo',
                required: false,
                attributes: ['id', 'path', 'url'],
              },
            ],
          })
        )
        .then((result) => res.json(result));
    } catch (err) {
      return res
        .status(400)
        .json({ error: 'Houve um erro na requisão. Verifique os dados' });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    const item = await Item.findByPk(id);

    if (!item) {
      return res
        .status(400)
        .json(
          'Produto não encontrado. Verifique seus dados e tente novamente.'
        );
    }

    if (!item.establishment_id === req.establishmentId) {
      return res
        .status(401)
        .json(
          'Você só pode deletar seus próprios produtos. Verifique e tente novamente.'
        );
    }

    await item.destroy();

    return res.json({ okay: true });
  }
}

export default new ItemController();
