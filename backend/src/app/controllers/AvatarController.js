class AvatarController {
  async store(req, res) {
    if (!req.file) {
      return res.status(400).json({
        error:
          'Houve um erro no armazenamento da imagem. Por favor tente novamente mais tarde.',
      });
    }

    return res.json({ avatar: req.file.location });
  }
}

export default new AvatarController();
