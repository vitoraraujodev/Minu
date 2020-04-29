import Sequelize, { Model } from 'sequelize';

class Item extends Model {
  static init(sequelize) {
    super.init(
      {
        code: Sequelize.STRING,
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        preparetion_time: Sequelize.STRING,
        price: Sequelize.FLOAT,
        available: Sequelize.BOOLEAN,
        rating: Sequelize.FLOAT,
        raters: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'photo_id', as: 'photo' });

    this.belongsTo(models.Establishment, {
      foreignKey: 'establishment_id',
      as: 'establishment',
    });

    this.belongsToMany(models.Menu, {
      through: 'MenuItem',
      as: 'menus',
      foreignKey: 'item_id',
      otherKey: 'menu_id',
    });

    this.belongsToMany(models.Additional, {
      through: 'ItemAdditional',
      as: 'additionals',
      foreignKey: 'item_id',
      otherKey: 'additional_id',
    });
  }
}

export default Item;
