import Establishment from '../models/Establishment';

class EstablishmentController {
  async store(req, res) {
    const establishmentExists = await Establishment.findOne({
      where: { cnpj: req.body.cnpj },
    });

    if (establishmentExists) {
      return res.status(400).json({ error: 'Establishment already exists.' });
    }

    await Establishment.create(req.body);

    return res.json({
      okay: true,
    });
  }
}

export default new EstablishmentController();
