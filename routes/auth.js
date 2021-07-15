const jwt = require("jsonwebtoken");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
// const randomString = require("random-string");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const middlewares = require("../middlewares/auth");
const { v4: uuid } = require("uuid");
const errors = require("../constants/errors");

module.exports = (sequelize, db) => {
  const { AUTH_SECRET, SALT_ROUNDS } = process.env;
  const { User } = db;

  const handleServerError = (res, err) => {
    res.status(500).json({ error: err });
  };

  return router;
};
