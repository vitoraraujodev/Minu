import Sequelize, { Model } from 'sequelize';

class EstablishmentRating extends Model {
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
    this.belongsTo(models.Establishment, {
      foreignKey: 'establishment_id',
      as: 'establishment',
    });
  }
}

export default EstablishmentRating;
