import { Model } from 'sequelize';

class ItemAdditional extends Model {
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
    this.belongsTo(models.Item, { foreignKey: 'item_id', as: 'item' });
    this.belongsTo(models.Additional, {
      foreignKey: 'additional_id',
      as: 'additional',
    });
  }
}

export default ItemAdditional;
