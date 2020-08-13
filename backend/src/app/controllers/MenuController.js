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
          attributes: ['id', 'title', 'code'],
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

    await menu.update(req.body);

    menu = await Menu.findByPk(req.params.id, {
      include: [
        {
          model: Item,
          as: 'items',
          attributes: ['id', 'title', 'code'],
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
