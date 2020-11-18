import fs from 'fs';
import { resolve } from 'path';

import Avatar from '../models/Avatar';
import Customer from '../models/Customer';

class AvatarController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const avatar = await Avatar.create({
      name,
      path,
    });

    return res.json(avatar);
  }

  async delete(req, res) {
    const avatar_id = req.params.id;
    const customer_id = req.customerId;

    const avatar = await Avatar.findByPk(avatar_id);

    if (!avatar) {
      return res.status(400).json({ error: 'Avatar não existe.' });
    }

    const customer = await Customer.findByPk(customer_id);

    if (!customer)
      return res.status(400).json({ error: 'Cliente não existe.' });

    if (customer.avatar_id !== avatar_id) {
      return res
        .status(401)
        .json({ error: 'Você só pode deletar seu próprio avatar.' });
    }

    fs.unlink(
      resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', avatar.path),
      (err) => {
        if (err) throw err;
      }
    );

    await avatar.destroy();

    return res.status(200).json({ okay: true });
  }
}

export default new AvatarController();
