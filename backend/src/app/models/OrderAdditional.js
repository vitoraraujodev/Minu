import { Model } from 'sequelize';

class OrderAdditional extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Order, { foreignKey: 'order_id', as: 'order' });
    this.belongsTo(models.Additional, {
      foreignKey: 'additional_id',
      as: 'additional',
    });
  }
}

export default OrderAdditional;
