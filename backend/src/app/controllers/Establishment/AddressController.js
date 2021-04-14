import * as Yup from 'yup';

import Address from '../../models/Establishment/Address';

class AddressController {
  async update(req, res) {
    const schema = Yup.object().shape({
      zip: Yup.string(),
      number: Yup.number(),
      street: Yup.string(),
      complement: Yup.string(),
      city: Yup.string(),
      state: Yup.string(),
      country: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Dados inválidos. Por favor, verifique e tente novamente.',
      });
    }

    const addressExists = await Address.findOne({
      where: { establishment_id: req.establishmentId },
    });

    if (!addressExists) {
      return res.status(400).json({
        error:
          'Houve um erro ao encontrar seus dados de endereço. Verifique seus dados ou contate o suporte.',
      });
    }

    const address = await Address.update(req.body);

    return req.status(200).json(address);
  }
}

export default new AddressController();
