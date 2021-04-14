import * as Yup from 'yup';

import Additional from  '../../models/Establishment/Additional';

class AdditionalController {
  async index(req, res) {
    const additionals = await Additional.findAll({
      where: { establishment_id: req.establishmentId },
      order: [['title', 'ASC']],
      attributes: ['id', 'title', 'price', 'available'],
    });

    return res.json(additionals);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      available: Yup.boolean(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Dados inválidos. Por favor, verifique e tente novamente.',
      });
    }

    const establishment_id = req.establishmentId;

    const additionalExists = await Additional.findOne({
      where: { title: req.body.title, establishment_id },
    });

    if (additionalExists) {
      return res.status(400).json({ error: 'Additional already created.' });
    }

    const additional = await Additional.create({
      ...req.body,
      establishment_id,
    });

    return res.json(additional);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      available: Yup.string(),
      price: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Dados inválidos. Por favor, verifique e tente novamente.',
      });
    }

    const establishment_id = req.establishmentId; // eslint-disable-line

    let additional = await Additional.findByPk(req.params.id);

    if (req.body.title && additional.title !== req.body.title) {
      const additionalExists = await Additional.findOne({
        where: { title: req.body.title, establishment_id },
      });

      if (additionalExists) {
        return res.status(400).json({ error: 'Additional already created.' });
      }
    }

    additional = await additional.update({
      ...req.body,
    });

    return res.json(additional);
  }

  async delete(req, res) {
    const { id } = req.params;

    const additional = await Additional.findByPk(id);

    if (!additional) {
      return res
        .status(400)
        .json('Adicional não existente. Por favor, tente novamente.');
    }

    if (!additional.establishment_id === req.establishmentId) {
      return res
        .status(401)
        .json(
          'Você só pode deletar seus próprios adicionais. Por favor, verifique e tente novamente.'
        );
    }

    await additional.destroy();

    return res.json({ okay: true });
  }
}

export default new AdditionalController();
