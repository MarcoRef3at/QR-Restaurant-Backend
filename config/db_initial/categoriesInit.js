const sequelize = require("../../sequelize");
const { categories, cheques, items, orders, tables } = sequelize.models;
const _Categories = require("../../_data/_categories.json");

const categoriesInit = async () => {
  categories
    .bulkCreate(_Categories, {
      validate: true,
      individualHooks: true,
    })
    .then(async (user) => {
      const count = await categories.count();
      console.log("categories created:".bgYellow.black.bold, count);
    })
    .catch((e) => {
      console.log("categories initializing error".red.bold);
    });
};
module.exports = categoriesInit;
