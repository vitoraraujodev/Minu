import Sequelize, { Model } from 'sequelize';

class ItemRating extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
        rating: Sequelize.INTEGER,
        client_name: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Item, {
      foreignKey: 'item_id',
      as: 'item',
    });
  }
}

export default ItemRating;
