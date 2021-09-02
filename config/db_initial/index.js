const categoriesInit = require("./categoriesInit");
const chequesInit = require("./chequesInit");
const itemsInit = require("./itemsInit");
const ordersInit = require("./ordersInit");
const tablesInit = require("./tabelsInit");

module.exports = async () => {
  await categoriesInit();
  await tablesInit();
  await itemsInit();
  await chequesInit();
  await ordersInit();
};
