module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('establishments', 'plan', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('establishments', 'plan');
  },
};
