const sequelize = require("../../sequelize");
const { categories, cheques, items, orders, tables } = sequelize.models;
const _ITEMS = require("../../_data/_items.json");

const itemsInit = async () => {
  items
    .bulkCreate(_ITEMS, {
      validate: true,
      individualHooks: true
    })
    .then(async user => {
      const count = await items.count();
      console.log("items created:".bgYellow.black.bold, count);
    })
    .catch(e => {
      console.log("items initializing error".red.bold);
    });
};
module.exports = itemsInit;
