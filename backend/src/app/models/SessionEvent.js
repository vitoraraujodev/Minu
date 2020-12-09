import Sequelize, { Model } from 'sequelize';

class SessionEvent extends Model {
  static init(sequelize) {
    super.init(
      {
        status: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.ServiceSession, {
      foreignKey: 'session_id',
      as: 'session',
    });
  }
}

export default SessionEvent;
