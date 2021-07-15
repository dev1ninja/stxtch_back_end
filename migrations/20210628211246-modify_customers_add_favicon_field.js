'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return [
      queryInterface.addColumn(
      'customers',
      'favicon',
      {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn(
      'customers',
      'email',
      {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn(
      'customers',
      'facebookUrl',
      {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn(
      'customers',
      'instagramUrl',
      {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn(
      'customers',
      'twitterUrl',
      {
        type: Sequelize.STRING,
      }),
    ];
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     return [
       queryInterface.removeColumn('customers', 'favicon'),
       queryInterface.removeColumn('customers', 'email'),
       queryInterface.removeColumn('customers', 'facebookUrl'),
       queryInterface.removeColumn('customers', 'instagramUrl'),
       queryInterface.removeColumn('customers', 'twitterUrl'),
      ]
  }
};
