module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('item_ratings', {
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
      item_id: {
        type: Sequelize.INTEGER,
        references: { model: 'items', key: 'id' },
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
    return queryInterface.dropTable('item_ratings');
  },
};
