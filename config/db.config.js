require("dotenv").config();
const username = encodeURIComponent("parveen_kumar");
const password = encodeURIComponent("KxfGSwNK1qRnBmly");
module.exports = {
  MONGODBHOST: `mongodb+srv://${username}:${password}@lawns-smallvenues.qjokq.mongodb.net/?retryWrites=true&w=majority`,
};
