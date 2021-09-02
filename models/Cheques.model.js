const { DataTypes } = require("sequelize");
const { Op } = require("sequelize");

module.exports = sequelize => {
  sequelize.define(
    "cheques",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      isClosed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      isVoid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {}
      }
      // Table Id
    },
    {
      hooks: {
        beforeCreate: async cheque => {
          if (cheque.tableId) {
            let found = await sequelize.models.cheques.findAll({
              where: {
                [Op.and]: [
                  { tableId: cheque.tableId },
                  { isClosed: false },
                  { isVoid: false }
                ]
              }
            });

            if (found.length > 0) {
              throw new Error("Selected Table already has an open cheque");
            }
          }
        }
      }
    }
  );
};
