const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const Customer = sequelize.define(
    "customers",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      domain: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      favicon: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      facebookUrl: {
        type: Sequelize.STRING,
      },
      instagramUrl: {
        type: Sequelize.STRING,
      },
      twitterUrl: {
        type: Sequelize.STRING,
      },
      whiteLabelLogo: {
        type: Sequelize.STRING,
      },
      tagline: {
        type: Sequelize.STRING,
      },
      summary: {
        type: Sequelize.TEXT,
      },
      description: {
        type: Sequelize.TEXT,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    },
    {
      timestamps: true,
    }
  );

  return Customer;
};
