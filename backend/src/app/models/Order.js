import Sequelize, { Model } from 'sequelize';

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        client_name: Sequelize.STRING,
        table_number: Sequelize.INTEGER,
        status: Sequelize.INTEGER,
        specification: Sequelize.STRING,
        price: Sequelize.FLOAT,
        amount: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Item, { as: 'item', foreignKey: 'item_id' });

    this.belongsTo(models.Establishment, {
      foreignKey: 'establishment_id',
      as: 'establishment',
    });

    this.belongsToMany(models.Additional, {
      through: 'OrderAdditional',
      as: 'additionals',
      foreignKey: 'order_id',
      otherKey: 'additional_id',
    });
  }
}

export default Order;
