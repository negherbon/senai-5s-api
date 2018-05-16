const Sequelize = require('sequelize');
const settings = require('config');

var fs = require("fs");
var path = require("path");

const sequelize = new Sequelize(settings.database.name, settings.database.user, settings.database.password, {
  host: settings.database.host,
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