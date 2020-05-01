module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('establishment_ratings', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      description: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      client_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      rating: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      establishment_id: {
        type: Sequelize.INTEGER,
        references: { model: 'establishments', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('establishment_ratings');
  },
};
