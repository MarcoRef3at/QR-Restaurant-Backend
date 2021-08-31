const categoriesInit = require("./categoriesInit");
const itemsInit = require("./itemsInit");
const tablesInit = require("./tabelsInit");

module.exports = async () => {
  await tablesInit();
  await categoriesInit();
  await itemsInit();
};
