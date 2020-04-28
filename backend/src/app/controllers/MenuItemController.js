import * as Yup from 'yup';

import Item from '../models/Item';
import Menu from '../models/Menu';
import MenuItem from '../models/MenuItem';

class MenuItemController {
  async store(req, res) {
    const schema = Yup.object().shape({
      menu_id: Yup.number().required(),
      item_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const establishment_id = req.establishmentId; // eslint-disable-line
    const { menu_id, item_id } = req.body; // eslint-disable-line

    const menu = await Menu.findByPk(menu_id);
    const item = await Item.findByPk(item_id);

    if (
      menu.establishment_id !== establishment_id && // eslint-disable-line
      item.establishment_id !== establishment_id    // eslint-disable-line
    ) {
      res.status(401).json({ error: 'You can only register your owns.' });
    }

    const menuItem = await MenuItem.create(req.body);

    return res.json(menuItem);
  }

  async delete(req, res) {
    const { id } = req.params;

    const menuItem = await MenuItem.findOne({ where: { id } });

    if (!menuItem) {
      return res.status(400).json('Menu-Item relation does not exist.');
    }

    if (!menuItem.establishment_id === req.establishmentId) {
      return res.status(401).json('You can only delete your owns.');
    }

    await menuItem.destroy();

    return res.json({ okay: true });
  }
}

export default new MenuItemController();
