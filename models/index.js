require("dotenv").config();
const config = require("../config/db.config");
const { Sequelize, Op } = require("sequelize");

const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
mongoose.set("strictQuery", false);

const dbObj = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,
  port: process.env.DB_PORT,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const mongoDbClient = new MongoClient(config.MONGODBHOST);
mongoose.connect(config.MONGODBHOST);

const db = {};

db.Sequelize = Sequelize;
db.dbObj = dbObj;
db.Op = Op;
db.mongoDbClient = mongoDbClient;

module.exports = db;
