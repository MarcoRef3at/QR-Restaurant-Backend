const sequelize = require("../../sequelize");
const { cheques } = sequelize.models;
const _CHEQUES = require("../../_data/_cheques.json");

const chequesInit = async () => {
  setTimeout(() => {
    cheques
      .bulkCreate(_CHEQUES, {
        validate: true,
        individualHooks: true
      })
      .then(async () => {
        const count = await cheques.count();
        console.log("cheques created:".bgYellow.black.bold, count);
      })
      .catch(e => {
        console.log("cheques initializing error".red.bold);
      });
  }, 900);
};
module.exports = chequesInit;
