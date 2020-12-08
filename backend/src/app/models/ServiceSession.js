import Sequelize, { Model } from 'sequelize';

class ServiceSession extends Model {
  static init(sequelize) {
    super.init(
      {
        table_number: Sequelize.INTEGER,
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
    this.belongsTo(models.Customer, {
      foreignKey: 'customer_id',
      as: 'customer',
    });
    this.hasMany(models.SessionEvent, {
      foreignKey: 'session_id',
      as: 'events',
    });
  }
}

export default ServiceSession;
