import Sequelize, { Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            const ENV = process.env.NODE_ENV;
            return ENV && ENV === 'production'
              ? `http://ec2-3-23-231-99.us-east-2.compute.amazonaws.com:3333/files/${this.path}`
              : `http://192.168.0.2:3333/files/${this.path}`;
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
