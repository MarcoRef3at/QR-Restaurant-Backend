const sequelize = require("../../sequelize");
const { paymentTypes } = sequelize.models;
const _PAYMENT_TYPES = require("../../_data/_paymentTypes.json");

const paymentTypesInit = async () => {
  paymentTypes
    .bulkCreate(_PAYMENT_TYPES, {
      validate: true,
      individualHooks: true
    })
    .then(async () => {
      const count = await paymentTypes.count();
      console.log("paymentTypes created:".bgYellow.black.bold, count);
    })
    .catch(e => {
      console.log(
        `paymentTypes initializing error : ${e.original.sqlMessage}`.red.bold
      );
    });
};
module.exports = paymentTypesInit;
