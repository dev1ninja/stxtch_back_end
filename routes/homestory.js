const router = require("express").Router();
const Sequelize = require("sequelize");
const Media = require("../db/models/Media");
const media = require("./media");
const Op = Sequelize.Op;

module.exports = (sequelize, db) => {
  const { Story, User, Group, HomeStory, Media, StoryMedia } = db;

  const handleServerError = (res, err) => {
    res.status(500).json({ error: err });
  };

  router.get("/homeStories", async (req, res) => {
    try {
      const homeStories = await HomeStory.findAll(
        { 
          include: [{ 
            model: Story, 
            attributes: ["id"],
            as: "story",
            include: [
              {
                model: Group,
                attributes: ["name"],
                as: "group"
              },
              {
                model: Media,
                attributes: ["url"],
                as: "media"
              }
            ],
          }],
        },
      );
      res.status(200).json(homeStories);
    } catch (e) {
      console.log("Error fetching stories: " + e);
      handleServerError(res, e);
    }
  })
  
  return router;
};
