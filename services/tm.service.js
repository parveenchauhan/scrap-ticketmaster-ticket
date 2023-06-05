const tmModel = require("../models/tm.model");
const db = require("../models");
const mongoDbClient = db.mongoDbClient;
module.exports = {
  async add(dbname, collectionName, data) {
    try {
      const database = mongoDbClient.db("tm_" + dbname);
      const haiku = database.collection(collectionName);

      console.log("collectionName", collectionName);
      console.log("data", data);
      await haiku.insertOne(data);
    } catch (e) {
      throw new Error(e);
    }
  },
  async getAll() {
    try {
      const response = await tmModel.find();
      return response;
    } catch (e) {
      throw new Error(e);
    }
  },
};
