import Sequelize from 'sequelize';

import Establishment from '../app/models/Establishment';
import File from '../app/models/File';
import Menu from '../app/models/Menu';
import Item from '../app/models/Item';
import MenuItem from '../app/models/MenuItem';
import Additional from '../app/models/Additional';
import ItemAdditional from '../app/models/ItemAdditional';
import Order from '../app/models/Order';

import databaseConfig from '../config/database';

const models = [
  Establishment,
  File,
  Menu,
  Item,
  MenuItem,
  Additional,
  ItemAdditional,
  Order,
]; // Todos os models a serem carregados

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
