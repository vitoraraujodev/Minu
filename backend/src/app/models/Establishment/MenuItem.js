import { Model } from 'sequelize';

class MenuItem extends Model {
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
    this.belongsTo(models.Menu, { foreignKey: 'menu_id', as: 'menu' });
    this.belongsTo(models.Item, { foreignKey: 'item_id', as: 'item' });
  }
}

export default MenuItem;
