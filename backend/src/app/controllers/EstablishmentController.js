import Establishment from '../models/Establishment';

class EstablishmentController {
  async store(req, res) {
    const establishmentExists = await Establishment.findOne({
      where: { email: req.body.email },
    });

    if (establishmentExists) {
      return res.status(400).json({ error: 'Establishment already exists.' });
    }

    await Establishment.create(req.body);

    return res.json({
      okay: true,
    });
  }

  async update(req, res) {
    const { email, cnpj, oldPassword } = req.body;

    const establishment = await Establishment.findByPk(req.establishmentId);

    if (email !== establishment.email) {
      const establishmentExists = await Establishment.findOne({
        where: { email },
      });

      if (establishmentExists) {
        return res.status(400).json({ errer: 'E-mail already in use.' });
      }
    }

    if (cnpj !== establishment.cnpj) {
      const establishmentExists = await Establishment.findOne({
        where: { cnpj },
      });

      if (establishmentExists) {
        return res.status(400).json({ errer: 'Establishment already exists.' });
      }
    }

    if (oldPassword && !(await establishment.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Old Password does not match.' });
    }

    await establishment.update(req.body);

    const {
      id,
      phone_number,
      establishment_name,
      manager_name,
      manager_lastname,
      cep,
      address_number,
      street,
      complement,
      city,
      state,
      photo,
    } = await Establishment.findByPk(req.establishmentId);

    /*
    {
      include: [
        { model: File, as: 'photo', attributes: ['id', 'path', 'url'] },
      ],
    }
    */

    return res.json({
      id,
      cnpj,
      email,
      phone_number,
      establishment_name,
      manager_name,
      manager_lastname,
      cep,
      address_number,
      street,
      complement,
      city,
      state,
      photo,
    });
  }
}

export default new EstablishmentController();
