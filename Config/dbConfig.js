const mongodb = require('mongodb');
const dbName = "b38wet";
const dbUrl = `mongodb+srv://dnshvenkat:Ipad10.2@simplewebapp.5znthda.mongodb.net/${dbName}`;
const Mongoclient = mongodb.MongoClient; 
module.exports = {mongodb, dbName, dbUrl, Mongoclient}