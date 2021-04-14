import Sequelize, { Model } from 'sequelize';

class Address extends Model {
  static init(sequelize) {
    super.init(
      {
        zip: Sequelize.STRING,
        number: Sequelize.INTEGER,
        street: Sequelize.STRING,
        complement: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
        country: Sequelize.STRING,
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

export default Address;
