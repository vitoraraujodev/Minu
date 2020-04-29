import * as Yup from 'yup';

import Item from '../models/Item';
import Additional from '../models/Additional';
import ItemAdditional from '../models/ItemAdditional';

class ItemAdditionalController {
  async store(req, res) {
    const schema = Yup.object().shape({
      item_id: Yup.number().required(),
      additional_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const establishment_id = req.establishmentId; // eslint-disable-line
    const { additional_id, item_id } = req.body; // eslint-disable-line

    const additional = await Additional.findByPk(additional_id);
    const item = await Item.findByPk(item_id);

    const ItemAdditionalExists = await ItemAdditional.findOne({
      where: { additional_id, item_id },
    });

    if (ItemAdditionalExists) {
      return res
        .status(400)
        .json({ error: 'Item-Additional relation already exists.' });
    }

    if (
      additional.establishment_id !== establishment_id || // eslint-disable-line
      item.establishment_id !== establishment_id    // eslint-disable-line
    ) {
      res.status(401).json({ error: 'You can only register your owns.' });
    }

    const itemAdditional = await ItemAdditional.create(req.body);

    return res.json(itemAdditional);
  }

  async delete(req, res) {
    const { id } = req.params;

    const itemAdditional = await ItemAdditional.findOne({ where: { id } });

    if (!itemAdditional) {
      return res.status(400).json('Item-Additional relation does not exist.');
    }

    if (!itemAdditional.establishment_id === req.establishmentId) {
      return res.status(401).json('You can only delete your owns.');
    }

    await itemAdditional.destroy();

    return res.json({ okay: true });
  }
}

export default new ItemAdditionalController();
