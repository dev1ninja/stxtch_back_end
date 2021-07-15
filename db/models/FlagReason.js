const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const FlagReason = sequelize.define(
    "flagreasons",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      reason: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    },
    {
      timestamps: true,
    }
  );

  return FlagReason
};
