module.exports = {
  up: (queryInterface) => {
    return Promise.all([
      queryInterface.removeColumn('establishments', 'cep'),
      queryInterface.removeColumn('establishments', 'address_number'),
      queryInterface.removeColumn('establishments', 'street'),
      queryInterface.removeColumn('establishments', 'complement'),
      queryInterface.removeColumn('establishments', 'city'),
      queryInterface.removeColumn('establishments', 'state'),
    ]);
  },
};
