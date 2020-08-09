import Sequelize, { Model } from 'sequelize';

class Menu extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        availability: Sequelize.STRING,
        start_at: Sequelize.INTEGER,
        end_at: Sequelize.INTEGER,
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
      through: 'MenuItem',
      as: 'items',
      foreignKey: 'menu_id',
      otherKey: 'item_id',
    });
  }
}

export default Menu;
