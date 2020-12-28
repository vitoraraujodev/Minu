import Sequelize, { Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            const ENV = process.env.NODE_ENV;
            return ENV && ENV === 'production'
              ? `http://minu-general.s3.us-east-2.amazonaws.com/${this.path}`
              : `http://minu-development.s3.us-east-2.amazonaws.com/${this.path}`;
          },
        },
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

export default File;
