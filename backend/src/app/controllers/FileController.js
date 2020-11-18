import fs from 'fs';
import { resolve } from 'path';

import File from '../models/File';

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const establishment_id = req.establishmentId;

    const file = await File.create({
      name,
      path,
      establishment_id,
    });

    return res.json(file);
  }

  async delete(req, res) {
    const photo_id = req.params.id;
    const establishment_id = req.establishmentId;

    const file = await File.findByPk(photo_id);

    if (!file) {
      return res.status(400).json({ error: 'Arquivo não existe.' });
    }

    if (file.establishment_id !== establishment_id) {
      return res
        .status(401)
        .json({ error: 'Você só pode deletar seu próprio avatar.' });
    }

    fs.unlink(
      resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', file.path),
      (err) => {
        if (err) throw err;
      }
    );

    await file.destroy();

    return res.status(200).json({ okay: true });
  }
}

export default new FileController();
