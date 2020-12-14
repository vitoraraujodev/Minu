import aws from 'aws-sdk';
import * as Yup from 'yup';
import fs from 'fs';
import { resolve } from 'path';
import { Op } from 'sequelize';

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

    aws.config.update({ region: 'us-east-2' });
    const s3 = new aws.S3({ apiVersion: '2006-03-01' });

    const itemsWithPhoto = await Promise.all(
      items.map(async (item) => {
        const params = {
          Bucket: 'minu-general',
          Prefix: `establishments/products/photo/${item.id}`,
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

        return {
          id: item.id,
          code: item.code,
          title: item.title,
          description: item.description,
          category: item.category,
          preparation_time: item.preparation_time,
          price: item.price,
          available: item.available,
          additionals: item.additionals,
          photo,
        };
      })
    );

    return res.json(itemsWithPhoto);
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
      additionals: Yup.array().of(Yup.number()),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
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
            ],
          })
        )
        .then((item) => res.json(item));
    } catch (err) {
      return res
        .status(400)
        .json({ error: 'Houve um erro na requisão. Verifique os dados' });
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
      return res.status(400).json({ error: 'Validation failed.' });
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
      return res.status(400).json({ error: 'Item does not exist.' });
    }

    const { photo_id } = req.body;

    if (photo_id && item.photo_id && photo_id !== item.photo_id) {
      const file = await File.findByPk(item.photo_id);
      fs.unlink(
        resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', file.path),
        (err) => {
          if (err) throw err;
        }
      );
      await file.destroy();
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
