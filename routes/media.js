const router = require("express").Router();
const middlewares = require("../middlewares/auth");
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const errors = require("../constants/errors");
const mysql = require("mysql2/promise");
const ogs = require("open-graph-scraper");
const Url = require("url");
const Story = require("../db/models/Story");

module.exports = (sequelize, db) => {
  const { Group, Customer, Story, Tag, GroupMedia, GroupTag, Media, StoryMedia, StoryTag } = db;

  const handleServerError = (res, err) => {
    res.status(500).json({ error: err });
  };

  router.get("/media", async(req, res) => {
    try {
      const media = await Media.findAll({
        where: {
          deletedAt: {
            [ Op.is ] : null
          }
        },
      });
      res.status(200).json({media});
    } catch (e) {
      console.log("Error fetching media: " + e)
      handleServerError(res, e)
    }
  })

  router.get("/media/group/:id", async (req, res) => {
    try {
      const media = await Media.findAll({
        include: Group,
        where: {
          deletedAt: {
            [ Op.is ] : null
          },
          id: {
            [ Op.eq ] : req.params.id
          }
        },
      });
      res.status(200).json( {media} );
    } catch (e) {
      console.log("Error fetching media groups: " + e);
      handleServerError(res, e);
    }
  });

  router.get("/media/story/:id", async (req, res) => {
    try {
      const media = await Media.findAll({
        include: Story,
        where: {
          deletedAt: {
            [Op.is]: null
          },
          id: {
            [Op.eq]: req.params.id 
          },
        },
      });
      res.status(200).json({media});
    } catch (e) {
      console.log("Error fetching media stories: " + e);
      handleServerError(res, e);
    }
  });
  return router;
};
