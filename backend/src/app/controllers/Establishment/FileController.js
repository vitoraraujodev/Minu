import File from '../../models/Establishment/File';

class FileController {
  async store(req, res) {
    if (!req.file) {
      return res.status(400).json({
        error:
          'Houve um erro no armazenamento da imagem. Por favor tente novamente mais tarde.',
      });
    }

    const file = await File.create({
      path: req.file.key,
      establishment_id: req.establishmentId,
    });

    return res.json(file);
  }
}

export default new FileController();
