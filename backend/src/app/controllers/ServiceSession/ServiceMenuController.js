import { Op } from 'sequelize';
import { getHours, getDay } from 'date-fns';

import Establishment from '../../models/Establishment/Establishment';
import File from '../../models/Establishment/File';
import Menu from '../../models/Establishment/Menu';
import Item from '../../models/Establishment/Item';
import Additional from  '../../models/Establishment/Additional';
import EstablishmentRating from '../../models/Establishment/EstablishmentRating';
import ItemRating from '../../models/Establishment/ItemRating';
import ServiceSession from '../../models/ServiceSession/ServiceSession';
import SessionEvent from '../../models/ServiceSession/SessionEvent';

class ServiceMenuController {
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

    if (
      lastSessionEvent.length === 0 ||
      lastSessionEvent[0].status === 'finished'
    ) {
      return res.status(401).json({
        error:
          'É preciso estar em uma sessão para acessar o cardápio. Por favor, inicie uma sessão e tente novamente.',
      });
    }

    const { session } = lastSessionEvent[0];
    const date = session.createdAt;
    const weekDay = getDay(date);

    await Establishment.findByPk(session.establishment_id, {
      attributes: [
        'id',
        'establishment_name',
        'cep',
        'address_number',
        'street',
        'complement',
        'plan',
      ],
      include: [
        {
          model: EstablishmentRating,
          as: 'ratings',
          required: false,
          attributes: ['id', 'description', 'rating', 'client_name'],
        },
        {
          model: File,
          as: 'photo',
          required: false,
          attributes: ['id', 'path', 'url'],
        },
      ],
    })
      .then(async (establishment) => {
        const {
          id,
          establishment_name,
          cep,
          address_number,
          street,
          complement,
          photo,
          ratings,
          plan,
        } = establishment;

        const raters = ratings.length;

        const rating =
          raters > 0
            ? ratings
                .map((rate) => rate.rating)
                .reduce((acumulator, rate) => acumulator + rate) / raters
            : 0;

        return {
          id,
          establishment_name,
          cep,
          address_number,
          street,
          complement,
          ratings,
          rating,
          raters,
          photo,
          plan,
        };
      })
      .then(async (establishment) => {
        const menus = await Menu.findAll({
          where: {
            establishment_id: establishment.id,
            available: true,
            start_at: { [Op.lte]: getHours(date) },
            end_at: { [Op.gte]: getHours(date) },
          },
          order: [['title', 'ASC']],
          attributes: ['id', 'title', 'availability', 'start_at', 'end_at'],
        });

        const {
          id,
          establishment_name,
          cep,
          address_number,
          street,
          complement,
          ratings,
          rating,
          raters,
          photo,
          plan,
        } = establishment;

        return {
          id,
          establishment_name,
          cep,
          address_number,
          street,
          complement,
          ratings,
          raters,
          rating,
          photo,
          plan,
          menus: menus.filter((menu) => menu.availability[weekDay] === '1'),
        };
      })
      .then(async (establishment) => {
        if (establishment.menus.length > 0) {
          const items = await Item.findAll({
            where: {
              establishment_id: establishment.id,
            },
            order: [
              ['title', 'ASC'],
              [{ model: Additional, as: 'additionals' }, 'title', 'ASC'],
              [{ model: ItemRating, as: 'ratings' }, 'created_at', 'DESC'],
            ],
            attributes: [
              'id',
              'code',
              'title',
              'description',
              'category',
              'preparation_time',
              'price',
              'available',
            ],
            include: [
              {
                model: ItemRating,
                as: 'ratings',
                required: false,
                attributes: ['id', 'description', 'rating', 'client_name'],
              },
              {
                model: Menu,
                where: {
                  id: { [Op.in]: establishment.menus.map((menu) => menu.id) },
                  available: true,
                },
                as: 'menus',
                attributes: [],
              },
              {
                model: Additional,
                required: false,
                as: 'additionals',
                attributes: ['id', 'title', 'price', 'available'],
                through: {
                  attributes: [],
                },
              },
              {
                model: File,
                as: 'photo',
                required: false,
                attributes: ['id', 'path', 'url'],
              },
            ],
          });

          return { ...establishment, items };
        }
        return establishment;
      })
      .then((result) => res.json(result));
  }
}

export default new ServiceMenuController();
