require("dotenv").config();
const config = require("../config/db.config");
const { Sequelize, Op } = require("sequelize");

const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
mongoose.set("strictQuery", false);

const mongoDbClient = new MongoClient(config.MONGODBHOST);
mongoose.connect(config.MONGODBHOST);

const db = {};

db.mongoDbClient = mongoDbClient;

module.exports = db;
