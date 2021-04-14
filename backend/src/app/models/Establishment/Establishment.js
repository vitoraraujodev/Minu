import Sequelize, { Model } from 'sequelize';

import bcrypt from 'bcryptjs';

class Establishment extends Model {
  static init(sequelize) {
    super.init(
      {
        cnpj: Sequelize.STRING,
        email: Sequelize.STRING,
        establishment_name: Sequelize.STRING,
        manager_name: Sequelize.STRING,
        manager_lastname: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        admin_pin: Sequelize.VIRTUAL,
        admin_pin_hash: Sequelize.STRING,
        plan: Sequelize.INTEGER,
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
      if (establishment.admin_pin) {
        establishment.admin_pin_hash = await bcrypt.hash(
          establishment.admin_pin,
          8
        );
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'photo_id', as: 'photo' });

    this.hasOne(models.Address, {
      foreignKey: 'establishment_id',
      as: 'address',
    });

    this.hasMany(models.Menu, { foreignKey: 'establishment_id', as: 'menus' });
    this.hasMany(models.Item, { foreignKey: 'establishment_id', as: 'items' });
    this.hasMany(models.Additional, {
      foreignKey: 'establishment_id',
      as: 'additionals',
    });
    this.hasMany(models.EstablishmentRating, {
      foreignKey: 'establishment_id',
      as: 'ratings',
    });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  checkPin(admin_pin) { // eslint-disable-line
    return bcrypt.compare(admin_pin, this.admin_pin_hash);
  }
}

export default Establishment;
