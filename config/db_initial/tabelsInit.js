const sequelize = require("../../sequelize");
const { cheques, items, orders, tables } = sequelize.models;
const _TABLES = require("../../_data/_tables.json");

const tablesInit = async () => {
  tables
    .bulkCreate(_TABLES, {
      validate: true,
      individualHooks: true,
    })
    .then(async (user) => {
      const count = await tables.count();
      console.log("tables created:".bgYellow.black.bold, count);
    })
    .catch((e) => {
      console.log("tables initializing error".red.bold);
    });
};
module.exports = tablesInit;
