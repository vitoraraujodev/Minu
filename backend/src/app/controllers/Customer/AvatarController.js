import Avatar from '../../models/Customer/Avatar';

class AvatarController {
  async store(req, res) {
    if (!req.file) {
      return res.status(400).json({
        error:
          'Houve um erro no armazenamento da imagem. Por favor tente novamente mais tarde.',
      });
    }

    const avatar = await Avatar.create({
      path: req.file.key,
    });

    return res.json(avatar);
  }
}

export default new AvatarController();
