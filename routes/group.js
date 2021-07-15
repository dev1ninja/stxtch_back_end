const router = require("express").Router();
const middlewares = require("../middlewares/auth");
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const errors = require("../constants/errors");
const mysql = require("mysql2/promise");
const ogs = require("open-graph-scraper");
const Url = require("url");
const Media = require("../db/models/Media");
const customer = require("./customer");

module.exports = (sequelize, db) => {
  const { Group, Story, Media, GroupMedia, Customer } = db;

  const handleServerError = (res, err) => {
    res.status(500).json({ error: err });
  };

  router.get("/group", async (req, res) => {
    try {
      //, [Sequelize.fn("COUNT", Sequelize.col("stories.id")), "count"]
      const groups = await Group.findAll({
        attributes: ["id", "name", "description", "customerId", "headline", "updatedAt"],
        include: [
          {
            model: Story,
            as: "stories",
          },
          {
            model: Media,
            // attributes: ["url"],
            as: "media",
          },
          {
            model: Customer,
            attribtes: ["domain"],
            as: "customer",
            where: {
              "domain": {
                [Op.substring]: req.query.hostname
              }
            }
          }
        ],
        where: {
          deletedAt: {
            [Op.is]: null
          }
        },
        // group: "groups.id",
      });
      res.status(200).json({ groups });
    } catch (e) {
      console.log("Error fetching groups: " + e);
      handleServerError(res, e);
    }
  });

  return router;
};
