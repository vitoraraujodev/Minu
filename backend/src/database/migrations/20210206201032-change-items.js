module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('items', 'description', {
      allowNull: true,
      type: Sequelize.STRING,
    });
  },
};
