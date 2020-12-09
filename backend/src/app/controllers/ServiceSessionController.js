import * as Yup from 'yup';

import ServiceSession from '../models/ServiceSession';
import SessionEvent from '../models/SessionEvent';
import Establishment from '../models/Establishment';

class ServiceSessionController {
  async index(req, res) {
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

    const event = lastSessionEvent.length > 0 ? lastSessionEvent[0] : null;

    // Checks if there is session and it's not finished
    if (event && event.status !== 'finished') {
      return res.status(200).json({ signed: true });
    }

    return res.status(200).json({ signed: false });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      table_number: Yup.number().required(),
      establishment_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados inválidos.' });
    }

    const { establishment_id, table_number } = req.body;

    const establishment = await Establishment.findByPk(establishment_id);

    if (!establishment) {
      return res.status(400).json({
        error:
          'Estabelecimento não encontrado. Por favor, verifique o código e tente novamente.',
      });
    }

    if (table_number <= 0)
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

    const event = lastSessionEvent.length > 0 ? lastSessionEvent[0] : null;

    if (event && event.status !== 'finished') {
      if (
        event.session.establishment_id === establishment_id &&
        event.session.table_number === table_number
      ) {
        return res.status(200).json({ okay: true });
      }

      return res.status(401).json({
        error: 'Você ainda está em uma sessão. Encerre-a e tente novamente.',
      });
    }

    // Verifica número máximo de mesas do restaurante e table_number

    // Futuramente verifica se usuário está banido

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

    const event = lastSessionEvent.length > 0 ? lastSessionEvent[0] : null;

    if (!event || event.status === 'finished') {
      return res.status(401).json({
        error: 'Você não se encontra em uma sessão.',
      });
    }

    await SessionEvent.create({
      session_id: event.session_id,
      status: 'finished',
    });

    return res.status(200).json({ okay: true });
  }
}

export default new ServiceSessionController();
