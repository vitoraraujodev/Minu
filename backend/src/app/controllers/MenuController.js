import * as Yup from 'yup';

import Menu from '../models/Menu';
import MenuItem from '../models/MenuItem';
import File from '../models/File';
import Item from '../models/Item';

class MenuController {
  async index(req, res) {
    const menu = await Menu.findAll({
      where: { establishment_id: req.establishmentId },
      order: [['title', 'ASC']],
      include: [
        {
          model: Item,
          as: 'items',
          order: [['title', 'ASC']],
          attributes: ['id', 'title', 'code', 'price'],
          include: [
            {
              model: File,
              as: 'photo',
              attributes: ['id', 'path', 'url'],
            },
          ],
          through: {
            model: MenuItem,
            as: 'menu-items',
          },
        },
      ],
    });

    return res.json(menu);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      availability: Yup.string().required(),
      start_at: Yup.number().required(),
      end_at: Yup.number().required(),
      available: Yup.boolean(),
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

    const menu = await Menu.create({
      ...req.body,
      establishment_id,
    });

    const { items } = req.body;

    if (items && items.length > 0) {
        items.map(async (item_id) => { // eslint-disable-line
        const item = await Item.findByPk(item_id);

        const ItemAdditionalExists = await MenuItem.findOne({
          where: { item_id, menu_id: menu.id },
        });

        if (ItemAdditionalExists) {
          const error = `${item.title} já é adicional desse produto.`;
          return error;
        }

        if (
          item.establishment_id !== establishment_id || // eslint-disable-line
          menu.establishment_id !== establishment_id    // eslint-disable-line
        ) {
          const error = `${item.title} não é um adicional do seu estabelecimento.`;
          return error;
        }

        const menuItem = await MenuItem.create({
          menu_id: menu.id,
          item_id,
        });

        if (menuItem) return `${item.title} criado com sucesso!`;
      });
    }

    return res.json(menu);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      availability: Yup.string(),
      start_at: Yup.number(),
      end_at: Yup.number(),
      available: Yup.boolean(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }
    const establishment_id = req.establishmentId; // eslint-disable-line

    let menu = await Menu.findByPk(req.params.id);

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

    menu = await menu.update(req.body);

    const { items } = req.body;

    if (items && items.length > 0) {
      menu = await Menu.findByPk(req.params.id, {
        include: [
          {
            model: Item,
            as: 'items',
            order: ['ASC'],
            attributes: ['id'],
            through: {
              model: MenuItem,
              as: 'menu-items',
            },
          },
        ],
      });

      const menuItems = menu.items.map((item) => item.id);

      items.map(async (item_id) => { // eslint-disable-line
        const item = await Item.findByPk(item_id);

        if (
            item.establishment_id !== establishment_id || // eslint-disable-line
            menu.establishment_id !== establishment_id    // eslint-disable-line
        ) {
          const error = `${item.title} não é um adicional do seu estabelecimento.`;
          return error;
        }
        if (!menuItems.includes(item_id)) {
          const menuItem = await MenuItem.create({
            menu_id: menu.id,
            item_id,
          });
          if (menuItem) return `${item.title} criado com sucesso!`;
        }
      });

      menuItems.map(async (item_id) => { // eslint-disable-line
        if (!items.includes(item_id)) {
          const menuItem = await MenuItem.findOne({
            where: { item_id, menu_id: menu.id },
          });

          await menuItem.destroy();
        }
      });
      menu = await Menu.findByPk(req.params.id);
      return res.json(menu);
    }

    return res.json(menu);
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
