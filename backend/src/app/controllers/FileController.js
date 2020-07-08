import fs from 'fs';
import { resolve } from 'path';

import File from '../models/File';

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const establishment_id = req.establishmentId; // eslint-disable-line

    const file = await File.create({
      name,
      path,
      establishment_id,
    });

    return res.json(file);
  }

  async delete(req, res) {
    const photo_id = req.params.id; // eslint-disable-line
    const establishment_id = req.establishmentId; // eslint-disable-line

    const file = await File.findByPk(photo_id);

    if (!file) {
      return res.status(400).json({ error: 'File does not exist.' });
    }

    if (file.establishment_id !== establishment_id) { // eslint-disable-line
      return res
        .status(401)
        .json({ error: 'You can only delete your own photos.' });
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
