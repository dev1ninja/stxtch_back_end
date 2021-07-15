const router = require("express").Router();
const middlewares = require("../middlewares/auth");
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const errors = require("../constants/errors");
const mysql = require("mysql2/promise");
const ogs = require("open-graph-scraper");
const Url = require("url");

module.exports = (sequelize, db) => {
  const { Story, User, Group, Media, GroupMedia, StoryMedia } = db;

  const handleServerError = (res, err) => {
    res.status(500).json({ error: err });
  };

  router.get("/stories", async (req, res) => {
    try {
      const { groupId } = req.query
      const stories = await Story.findAll(
        {
          include: [
            { model: User, attributes: ["firstName", "lastName"], as: "user" },
            { model: Group, attributes: ["name"], as: "group" },
            {
              model: Media,
              attributes: ["url"],
              as: "media"
            }
          ],
          where: {
            groupId: {
              [Op.eq]: groupId
            }
          }
        },
      );
      res.status(200).json({ stories });
    } catch (e) {
      console.log("Error fetching stories: " + e);
      handleServerError(res, e);
    }
  })

  router.get("/story/:storyId", async (req, res) => {
    try {
      const { storyId } = req.params
      const stories = await Story.findOne(
        {
          include: [
            { model: User, attributes: ["firstName", "lastName", "email", "socialUrl"], as: "user" },
            { model: Group, attributes: ["name"], as: "group" },
            {
              model: Media,
              attributes: ["url", "type"],
              as: "media"
            }
          ],
          where: {
            id: {
              [Op.eq]: storyId
            }
          }
        },
      );
      res.status(200).json({ stories });
    } catch (e) {
      console.log("Error fetching stories: " + e);
      handleServerError(res, e);
    }
  });

  return router;
};
