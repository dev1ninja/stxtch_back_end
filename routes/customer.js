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
  const { Group, Customer, Story } = db;

  const handleServerError = (res, err) => {
    res.status(500).json({ error: err });
  };

  router.get("/customer", async (req, res) => {
    try {
      console.log("This is customer domain", req.query.hostname)
      const customers = await Customer.findAll({
        attributes: ["id", "name", "summary", "description", "updatedAt", "whiteLabelLogo", "favicon", "email", "facebookUrl", "instagramUrl", "twitterUrl", "tagline", [Sequelize.fn("COUNT", Sequelize.col("groups.stories.id")), "count"]],
        include: [
          {
            model: Group,
            attributes: ["id"],
            as: "groups",
            include: [
              {
                model: Story,
                attributes: ["id"],
                as: "stories"
              }
            ]
          }
        ],
        where: {
          deletedAt: {
            [ Op.is ] : null
          },
          domain: {
            [ Op.substring ] : req.query.hostname
          }
        },
        group: "customers.id",
      });
      res.status(200).json( customers[0] );
    } catch (e) {
      console.log("Error fetching groups: " + e);
      handleServerError(res, e);
    }
  });

  return router;
};
