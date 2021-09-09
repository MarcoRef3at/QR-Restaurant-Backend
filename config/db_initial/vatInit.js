const sequelize = require("../../sequelize");
const { vat } = sequelize.models;
const _VAT = require("../../_data/_vat.json");

const vatInit = async () => {
  vat
    .bulkCreate(_VAT, {
      validate: true,
      individualHooks: true,
    })
    .then(async (user) => {
      const count = await vat.count();
      console.log("vat created:".bgYellow.black.bold, count);
    })
    .catch((e) => {
      console.log("vat initializing error".red.bold, e);
    });
};
module.exports = vatInit;
