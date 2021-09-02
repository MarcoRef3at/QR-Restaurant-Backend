const sequelize = require("../../sequelize");
const { orders } = sequelize.models;
const _ORDERS = require("../../_data/_orders.json");

const ordersInit = async () => {
  setTimeout(() => {
    orders
      .bulkCreate(_ORDERS, {
        validate: true,
        individualHooks: true
      })
      .then(async () => {
        const count = await orders.count();
        console.log("orders created:".bgYellow.black.bold, count);
      })
      .catch(e => {
        console.log("orders initializing error".red.bold);
      });
  }, 1000);
};
module.exports = ordersInit;
