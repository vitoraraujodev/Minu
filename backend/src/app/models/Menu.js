import Sequelize, { Model } from 'sequelize';

class Menu extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.STRING,
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
  }
}

export default Menu;
