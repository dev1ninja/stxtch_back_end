const Sequelize = require("sequelize");
//const FlagReason = require("./models/FlagReason");
const env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../config/config.json')[env];

let sequelize;

sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  { host: config.host, dialect: config.dialect }
);

const User = require("./models/User")(sequelize, Sequelize.DataTypes);
const Story = require("./models/Story")(sequelize, Sequelize.DataTypes);
const HomeStory = require("./models/HomeStory")(sequelize, Sequelize.DataTypes);
const Group = require("./models/Group")(sequelize, Sequelize.DataTypes);
const Customer = require("./models/Customer")(sequelize, Sequelize.DataTypes);
const Tag = require("./models/Tag")(sequelize, Sequelize.DataTypes);
const GroupTag = require("./models/GroupTag")(sequelize, {Tag, Group});
const StoryTag = require("./models/StoryTag")(sequelize, {Tag, Story});
const Media = require("./models/Media")(sequelize, Sequelize.DataTypes);
const GroupMedia = require("./models/GroupMedia")(sequelize, {Media, Group});
const StoryMedia = require("./models/StoryMedia")(sequelize, {Media, Story});

const FlagReason = require("./models/FlagReason")(sequelize, Sequelize.DataTypes);
const Flag = require("./models/Flag")(sequelize, {Story, User, FlagReason});//

const db = {
  User,
  Story,
  HomeStory,
  Group,
  Customer,
  Tag,
  GroupTag,
  GroupMedia,
  StoryTag,
  StoryMedia,
  Media,
  Flag,
  FlagReason,
};



Customer.hasMany(User, {
  foreignKey: { name: "customerId", allowNull: false },
  as: "userCustomer",
});
Customer.hasMany(Group, {
  foreignKey: { name: "customerId", allowNull: false },
  as: "groups"
})
User.hasMany(Story, {
  foreignKey: { name: "userId", allowNull: false },
  as: "storyUser",
});
Group.hasMany(Story, {
  foreignKey: { name: "groupId", allowNull: false },
  as: "stories",
});

User.hasMany(Flag, {
  foreignKey: { name: "userId", allowNull:  true},
  as: "flagUser",
});
Story.hasMany(Flag, {
  foreignKey: { name: "storyId", allowNull: false },
  as: "flagStory",
});
FlagReason.hasMany(Flag, {
  foreignKey: { name: "reasonId", allowNull: true },
  as: "flagReason"
});

Tag.belongsToMany(Group, {as: 'group', through: GroupTag})
Group.belongsToMany(Tag, {as: 'tag', through: GroupTag})
Tag.belongsToMany(Story, {as: 'story', through: StoryTag})
Story.belongsToMany(Tag, {as: 'tag', through: StoryTag})

Media.belongsToMany(Group, {as: 'group', through: GroupMedia})
Group.belongsToMany(Media, {as: 'media', through: GroupMedia})
Media.belongsToMany(Story, {as: 'story', through: StoryMedia})
Story.belongsToMany(Media, {as: 'media', through: StoryMedia})
Story.belongsTo(User, { as: "user" })
Story.belongsTo(Group, { as: "group" })
Group.belongsTo(Customer, { as: "customer" })
Flag.belongsTo(User, { as: "user" })
Flag.belongsTo(Story, { as: "story" })
Flag.belongsTo(FlagReason, { as: "flagreason" })
Story.hasOne(HomeStory, {
  foreignKey: { name: "storyId", allowNull: true },
})
HomeStory.belongsTo(Story, {as: "story"})

module.exports = { db, sequelize };
