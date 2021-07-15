const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();
const server = express();
server.use(cors());

const { sequelize, db } = require("./db/connect");

// WARNING!!! : force:true will purge all tables in database
sequelize.sync({ force: false }).then(async () => {

  console.log("THIS IS THE DB: ", db);
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json());

  const authRoutes = require("./routes/auth")(sequelize, db);
  server.use(authRoutes);

  const groupRoutes = require("./routes/group")(sequelize, db);
  server.use(groupRoutes);

  const customerRoutes = require("./routes/customer")(sequelize, db);
  server.use(customerRoutes);

  const storyRoutes = require("./routes/story")(sequelize, db);
  server.use(storyRoutes);

  const homeStoryRoutes = require("./routes/homestory")(sequelize, db);
  server.use(homeStoryRoutes);

  const tagRoutes = require("./routes/tag")(sequelize, db);
  server.use(tagRoutes);

  const mediaRoutes = require("./routes/media")(sequelize, db);
  server.use(mediaRoutes);

  server.listen(8080, () => {
    console.log("SERVER LISTENING on 8080");
  });
});
