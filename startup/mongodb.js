const config = require("../config/mongoConfig.json");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const client = new MongoClient(config.dbUrl, { useUnifiedTopology: true });

module.exports = function() {
  client
    .connect()
    .then(console.log("Connected successfully to server"))
    .catch(err => assert.equal(null, err));

  const db = client.db(config.dbName);
  return db;
};
