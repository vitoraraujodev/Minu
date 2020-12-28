module.exports = {
  up: (queryInterface) => {
    return queryInterface.removeColumn('files', 'name');
  },
};
