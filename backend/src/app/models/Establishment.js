import Sequelize, { Model } from 'sequelize';

import bcrypt from 'bcryptjs';

class Establishment extends Model {
  static init(sequelize) {
    super.init(
      {
        cnpj: Sequelize.STRING,
        email: Sequelize.STRING,
        phone_number: Sequelize.STRING,
        establishment_name: Sequelize.STRING,
        manager_name: Sequelize.STRING,
        manager_lastname: Sequelize.STRING,
        cep: Sequelize.STRING,
        address_number: Sequelize.NUMBER,
        street: Sequelize.STRING,
        complement: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        rating: Sequelize.NUMBER,
        raters: Sequelize.NUMBER,
      },
      {
        sequelize,
      }
    );
    // Before saving, encrypts password and saves as password_hash
    this.addHook('beforeSave', async (establishment) => {
      if (establishment.password) {
        establishment.password_hash = await bcrypt.hash(
          establishment.password,
          8
        );
      }
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'photo_id', as: 'photo' });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default Establishment;
