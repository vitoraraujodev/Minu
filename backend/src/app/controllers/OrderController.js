import * as Yup from 'yup';
import { isBefore, subMinutes } from 'date-fns';

import Order from '../models/Order';
import Item from '../models/Item';

class OrderController {
  async index(req, res) {
    const orders = await Order.findAll({
      where: { establishment_id: req.establishmentId },
      attributes: [
        'id',
        'client_name',
        'table_number',
        'specification',
        'status',
        'establishment_id',
        'createdAt',
      ],
      include: [
        { model: Item, as: 'item', attributes: ['id', 'title', 'price'] },
      ],
    });

    return res.json(orders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      client_name: Yup.string().required(),
      table_number: Yup.number().required(),
      specification: Yup.string(),
      item_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const establishment_id = req.establishmentId; // eslint-disable-line

    const item = await Item.findByPk(req.body.item_id);

    if (!item) {
      return res.status(400).json({ error: 'Item does not exist.' });
    }

    if (item.establishment_id !== establishment_id) { // eslint-disable-line
      return res
        .status(400)
        .json({ error: 'This item does not belong to this establishment.' });
    }

    const {
      id,
      client_name, // eslint-disable-line
      table_number, // eslint-disable-line
      specification,
      status,
      createdAt,
    } = await Order.create({
      ...req.body,
      establishment_id,
    });

    return res.json({
      id,
      client_name,
      table_number,
      specification,
      status,
      establishment_id,
      createdAt,
      item,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    let order = await Order.findByPk(id);

    if (!order) {
      return res.status(400).json('Order does not exist.');
    }

    if (order.status === 4) {
      return res.status(400).json('Order already canceled.');
    }

    if (
      order.table_number !== req.body.table_number &&
      order.client_name !== req.body.client_name
    ) {
      return res.status(401).json('You can only delete your own orders.');
    }

    const dateWithSub = subMinutes(order.createdAt, 2);

    if (isBefore(dateWithSub, new Date())) {
      return res
        .status(400)
        .json(
          'Orders can only be canceled before 2 minute after being created .'
        );
    }

    await order.update({ status: 4 });

    order = await Order.findByPk(id, {
      attributes: [
        'id',
        'client_name',
        'table_number',
        'specification',
        'status',
        'establishment_id',
        'createdAt',
      ],
      include: [
        { model: Item, as: 'item', attributes: ['id', 'title', 'price'] },
      ],
    });

    return res.status(200).json(order);
  }
}

export default new OrderController();
