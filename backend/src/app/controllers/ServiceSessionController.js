import * as Yup from 'yup';

import ServiceSession from '../models/ServiceSession';
import SessionEvent from '../models/SessionEvent';
import Establishment from '../models/Establishment';

class ServiceSessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      table_number: Yup.number().required(),
      establishment_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados inválidos.' });
    }

    const establishment = await Establishment.findByPk(
      req.body.establishment_id
    );

    if (!establishment) {
      return res.status(400).json({
        error:
          'Estabelecimento não encontrado. Por favor, tente novamente mais tarde.',
      });
    }

    if (req.body.table_number <= 0)
      return res.status(400).json({
        error: 'O restaurante não possui essa mesa.',
      });

    const lastSessionEvent = await SessionEvent.findAll({
      limit: 1,
      order: [['created_at', 'DESC']],
      include: {
        model: ServiceSession,
        required: true,
        where: { customer_id: req.customerId },
        as: 'session',
      },
    });

    if (
      lastSessionEvent.length > 0 &&
      lastSessionEvent[0].status !== 'finished'
    )
      return res.status(401).json({
        error: 'Você ainda está em uma sessão. Encerre-a e tente novamente.',
      });

    // Verifica número máximo de mesas do restaurante e table_number

    // Futuramente verifica se usuário está banido

    // Futuramente verifica se o usuário está em uma mesa
    // Futuramente verifica se tem usuário na mesa

    // Futuramente envia pro kafka e retorna sucesso

    const session = await ServiceSession.create({
      ...req.body,
      customer_id: req.customerId,
    });

    await SessionEvent.create({
      session_id: session.id,
      status: 'started',
    });

    return res.status(200).json(session);
  }

  async delete(req, res) {
    const lastSessionEvent = await SessionEvent.findAll({
      limit: 1,
      order: [['created_at', 'DESC']],
      include: {
        model: ServiceSession,
        required: true,
        where: { customer_id: req.customerId },
        as: 'session',
        attributes: [],
      },
    });

    if (
      lastSessionEvent.length === 0 ||
      lastSessionEvent[0].status === 'finished'
    ) {
      return res.status(401).json({
        error: 'Você não se encontra em uma sessão.',
      });
    }

    await SessionEvent.create({
      session_id: lastSessionEvent[0].session_id,
      status: 'finished',
    });

    return res.status(200).json({ okay: true });
  }
}

export default new ServiceSessionController();
