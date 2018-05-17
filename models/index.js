const Sequelize = require('sequelize');
const settings = require('config');

var fs = require("fs");
var path = require("path");

console.log('settings', settings)

const sequelize = new Sequelize('d1evnb82teofvd', 'vgbfamcuceluwe', '972b51a8e4eea3ce72642ff0e095d2b6ef6b03765858690be9578086c673fd7c', {
  host: 'ec2-54-243-137-182.compute-1.amazonaws.com',
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  },
  logging: true
});

var db = {};

fs.readdirSync(__dirname).filter(function(file) {
  return (file.indexOf(".") !== 0) && (file !== "index.js");
})
.forEach(function(file) {
  var model = sequelize.import(path.join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  db.sequelize.sync();
}

module.exports = db;