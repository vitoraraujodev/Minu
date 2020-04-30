import Sequelize, { Model } from 'sequelize';

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        client_name: Sequelize.STRING,
        table_number: Sequelize.INTEGER,
        status: Sequelize.INTEGER,
        specification: Sequelize.STRING,
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
  }
}

export default Order;
