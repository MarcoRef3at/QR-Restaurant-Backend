const categoriesInit = require("./categoriesInit");
const chequesInit = require("./chequesInit");
const itemsInit = require("./itemsInit");
const tablesInit = require("./tabelsInit");

module.exports = async () => {
  await categoriesInit();
  await tablesInit();
  await itemsInit();
  await chequesInit();
};
