module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('establishments', 'plan_id', {
      type: Sequelize.INTEGER,
      references: { model: 'plans', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('establishments', 'plan_id');
  },
};
