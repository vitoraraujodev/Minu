import Sequelize from 'sequelize';

import Establishment from '../app/models/Establishment/Establishment';
import File from '../app/models/Establishment/File';
import Address from '../app/models/Establishment/Address';
import Menu from '../app/models/Establishment/Menu';
import Item from '../app/models/Establishment/Item';
import MenuItem from '../app/models/Establishment/MenuItem';
import Additional from '../app/models/Establishment/Additional';
import ItemAdditional from '../app/models/Establishment/ItemAdditional';
import EstablishmentRating from '../app/models/Establishment/EstablishmentRating';
import ItemRating from '../app/models/Establishment/ItemRating';

import Customer from '../app/models/Customer/Customer';
import Avatar from '../app/models/Customer/Avatar';

import ServiceSession from '../app/models/ServiceSession/ServiceSession';
import SessionEvent from '../app/models/ServiceSession/SessionEvent';

import prodDatabaseConfig from '../config/prodDatabase';
import databaseConfig from '../config/database';

const models = [
  Establishment,
  File,
  Address,
  Avatar,
  Menu,
  Item,
  MenuItem,
  Additional,
  ItemAdditional,
  EstablishmentRating,
  ItemRating,
  Customer,
  ServiceSession,
  SessionEvent,
]; // Todos os models a serem carregados

class Database {
  constructor() {
    this.init();
  }

  init() {
    const ENV = process.env.NODE_ENV;
    if (ENV && ENV === 'production') {
      this.connection = new Sequelize(prodDatabaseConfig);
    } else {
      this.connection = new Sequelize(databaseConfig);
    }

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
