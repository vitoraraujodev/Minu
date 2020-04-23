import Sequelize from 'sequelize';

import Establishment from '../app/models/Establishment';

import databaseConfig from '../config/database';

const models = [Establishment]; // Todos os models a serem carregados

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
