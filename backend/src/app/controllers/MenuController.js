import * as Yup from 'yup';
import { Op } from 'sequelize';

import Menu from '../models/Menu';
import MenuItem from '../models/MenuItem';
import File from '../models/File';
import Item from '../models/Item';

class MenuController {
  async index(req, res) {
    const menus = await Menu.findAll({
      where: { establishment_id: req.establishmentId },
      order: [['title', 'ASC']],
      include: [
        {
          model: Item,
          as: 'items',
          required: false,
          order: [['title', 'ASC']],
          attributes: ['id', 'title', 'code', 'price'],
          include: [
            {
              model: File,
              as: 'photo',
              required: false,
              attributes: ['id', 'path', 'url'],
            },
          ],
          through: {
            include: [],
          },
        },
      ],
    });

    return res.json(menus);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      availability: Yup.string().required(),
      start_at: Yup.number().required(),
      end_at: Yup.number().required(),
      available: Yup.boolean(),
      items: Yup.array().of(Yup.number()),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const establishment_id = req.establishmentId; // eslint-disable-line

    const menuExists = await Menu.findOne({
      where: { title: req.body.title, establishment_id },
    });

    if (menuExists) {
      return res.status(400).json({ error: 'Menu title already in use.' });
    }

    const { items } = req.body;

    await Menu.create({
      ...req.body,
      establishment_id: req.establishmentId,
    })
      .then(async (menu) => {
        // Creates all Additional relations
        if (items && items.length > 0) {
          const menuItems = items.map((item) => ({
            menu_id: menu.id,
            item_id: item,
          }));

          await MenuItem.bulkCreate(menuItems);
        }
        return menu;
      })
      .then(async (menu) =>
        Menu.findByPk(menu.id, {
          order: [['title', 'ASC']],
          include: [
            {
              model: Item,
              required: false,
              as: 'items',
              order: [['title', 'ASC']],
              attributes: ['id', 'title', 'price', 'available'],
              through: {
                attributes: [],
              },
            },
          ],
        })
      )
      .then((menu) => res.json(menu));
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      availability: Yup.string(),
      start_at: Yup.number(),
      end_at: Yup.number(),
      available: Yup.boolean(),
      items: Yup.array().of(Yup.number()),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }
    const establishment_id = req.establishmentId; // eslint-disable-line

    const menu = await Menu.findByPk(req.params.id, {
      include: {
        model: Item,
        as: 'items',
        attributes: ['id'],
        through: {
          attributes: [],
        },
      },
    });

    if (!menu) {
      return res.status(400).json({ error: 'Menu does not exist.' });
    }

    if (req.body.title && req.body.title !== menu.title) {
      const menuExists = await Menu.findOne({
        where: { title: req.body.title, establishment_id },
      });

      if (menuExists) {
        return res.status(400).json({ error: 'Menu title already in use.' });
      }
    }

    const menuItems = menu.items.map((item) => item.id);
    const { items } = req.body;

    try {
      await Menu.update(
        { ...req.body },
        {
          where: { id: menu.id },
        }
      )
        .then(async (result) => {
          // Creates all new Items relations
          if (items && items.length > 0) {
            const newItems = items
              .filter((item) => !menuItems.includes(item))
              .map((item) => ({
                menu_id: menu.id,
                item_id: item,
              }));

            if (newItems.length > 0) await MenuItem.bulkCreate(newItems);
          }

          return result;
        })
        .then(async (result) => {
          // Delete Menu's Items
          if (items) {
            const deleteItems = menuItems.filter(
              (menuItem) => !items.includes(menuItem)
            );

            if (deleteItems.length > 0) {
              await MenuItem.destroy({
                where: {
                  menu_id: menu.id,
                  item_id: {
                    [Op.in]: deleteItems,
                  },
                },
              });
            }
          }

          return result;
        })
        .then(async () =>
          Menu.findByPk(menu.id, {
            order: [['title', 'ASC']],
            attributes: [
              'id',
              'title',
              'availability',
              'start_at',
              'end_at',
              'available',
            ],
            include: [
              {
                model: Item,
                required: false,
                as: 'items',
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

    const menu = await Menu.findByPk(id);

    if (!menu) {
      return res.status(400).json('Menu does not exist.');
    }

    if (!menu.establishment_id === req.establishmentId) {
      return res.status(401).json('You can only delete your own menu.');
    }

    await menu.destroy();

    return res.json({ okay: true });
  }
}

export default new MenuController();
