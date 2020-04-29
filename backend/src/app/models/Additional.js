import Sequelize, { Model } from 'sequelize';

class Additional extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        price: Sequelize.FLOAT,
        available: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Establishment, {
      foreignKey: 'establishment_id',
      as: 'establishment',
    });

    this.belongsToMany(models.Item, {
      through: 'ItemAdditional',
      as: 'items',
      foreignKey: 'additional_id',
      otherKey: 'item_id',
    });
  }
}

export default Additional;
