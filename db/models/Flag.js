const Sequelize = require("sequelize");

module.exports = (sequelize, {FlagReason, User, Story}) => {
  const Flag = sequelize.define(
    "flags",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      handle: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: User,
          key: "id",
        },
      },
      storyId: {
        type: Sequelize.INTEGER,
        references: {
          model: Story,
          key: "id",
        },
      },
      reasonId: {
        type: Sequelize.INTEGER,
        references: {
          model: FlagReason,
          key: "id",
        },
      },
      comments: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    },
    {
      timestamps: true,
    }
  );

  return Flag
};
