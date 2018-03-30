var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");

var sequelize = new Sequelize('senai_5s', 'root', 'root',{
  host: 'localhost',    
  dialect: 'mysql',
  define: {
      timestamps: false
  }
});

var db = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
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
  db.sequelize.sync().then(function () { });
}

module.exports = db;