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

  router.get("/tag", async(req, res) => {
    try{
      const tags = await Tag.findAll({
        where: {
          deletedAt: {
            [ Op.is ] : null
          }
        },
      });
      res.status(200).json({tags});
    } catch (e) {
      console.log("Error fetching tags: " + e);
      handleServerError(res, e);
    }
  })

  router.get("/tag/group/:id", async (req, res) => {
    try {
      const tags = await Tag.findAll({
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
      res.status(200).json( {tags} );
    } catch (e) {
      console.log("Error fetching tag groups: " + e);
      handleServerError(res, e);
    }
    
  });

  router.get("/tag/story/:id", async (req, res) => {
    try {
      const tags = await Tag.findAll({
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
      res.status(200).json({tags});
    } catch (e) {
      console.log("Error fetching tag stories: " + e);
      handleServerError(res, e);
    }
    
  });
  return router;
};
