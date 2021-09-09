const categoriesInit = require("./categoriesInit");
const chequesInit = require("./chequesInit");
const itemsInit = require("./itemsInit");
const ordersInit = require("./ordersInit");
const paymentTypesInit = require("./paymentTypesInit");
const tablesInit = require("./tabelsInit");
const vatInit = require("./vatInit");

module.exports = async () => {
  await vatInit();
  await paymentTypesInit();
  await categoriesInit();
  await tablesInit();
  await itemsInit();
  await chequesInit();
  await ordersInit();
};
