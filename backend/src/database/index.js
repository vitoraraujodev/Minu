import Sequelize from 'sequelize';

import Establishment from '../app/models/Establishment';
import File from '../app/models/File';
import Menu from '../app/models/Menu';
import Item from '../app/models/Item';
import MenuItem from '../app/models/MenuItem';
import Additional from '../app/models/Additional';
import ItemAdditional from '../app/models/ItemAdditional';
import Order from '../app/models/Order';
import OrderAdditional from '../app/models/OrderAdditional';
import EstablishmentRating from '../app/models/EstablishmentRating';
import ItemRating from '../app/models/ItemRating';
import Customer from '../app/models/Customer';

import prodDatabaseConfig  from '../config/prodDatabase.js' ;
import databaseConfig from '../config/database.js';


const models = [
  Establishment,
  File,
  Menu,
  Item,
  MenuItem,
  Additional,
  ItemAdditional,
  Order,
  OrderAdditional,
  EstablishmentRating,
  ItemRating,
  Customer,
]; // Todos os models a serem carregados

class Database {
  constructor() {
    this.init();
  }

  init() {
    let ENV = process.env.ENVIRONMENT;
    if (ENV != undefined && ENV == "production") {
      this.connection = new Sequelize(prodDatabaseConfig);
    }
    else {
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
