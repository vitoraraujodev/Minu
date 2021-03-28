module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('product_order_additionals', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      product_order_id: {
        type: Sequelize.INTEGER,
        references: { model: 'product_orders', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      additional_id: {
        type: Sequelize.INTEGER,
        references: { model: 'additionals', key: 'id' },
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
    return queryInterface.dropTable('product_order_additionals');
  },
};
