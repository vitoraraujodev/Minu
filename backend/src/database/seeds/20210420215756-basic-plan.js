module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('plans', [
      {
        title: 'basic',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
};
