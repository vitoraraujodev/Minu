module.exports = {
  up: (queryInterface) => {
    return queryInterface.removeColumn('avatars', 'name');
  },
};
