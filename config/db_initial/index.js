const categoriesInit = require("./categoriesInit");
const itemsInit = require("./itemsInit");
const tablesInit = require("./tabelsInit");

module.exports = async () => {
  await categoriesInit();
  await tablesInit();
  await itemsInit();
};
