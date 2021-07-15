module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('homeStories', [{
      id: 1,
      spot: 1,
      ratio: '85:100',
      storyId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      spot: 2,
      ratio: '98:100',
      storyId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 3,
      spot: 3,
      ratio: '85:100',
      storyId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 4,
      spot: 4,
      ratio: '7:10',
      storyId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 5,
      spot: 5,
      ratio: '18:10',
      storyId: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 6,
      spot: 6,
      ratio: '1:1',
      storyId: 6,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 7,
      spot: 7,
      ratio: '1:1',
      storyId: 7,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 8,
      spot: 8,
      ratio: '16:10',
      storyId: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('homeStories', null, {});
  }
};