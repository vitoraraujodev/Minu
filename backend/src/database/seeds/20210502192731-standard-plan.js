module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('plans', [
      {
        title: 'standard',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
};
