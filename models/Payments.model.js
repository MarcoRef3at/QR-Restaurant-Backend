const { DataTypes } = require("sequelize");
const { getOrdersTotalPrice } = require("../controllers/cheques/_functions");

module.exports = (sequelize) => {
  sequelize.define(
    "payments",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      chequeId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },

      paymentTypeId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      costAmount: {
        allowNull: false,
        type: DataTypes.DOUBLE,
      },
      dueAmount: {
        allowNull: false,
        type: DataTypes.DOUBLE,
      },

      VAT: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      discount: {
        allowNull: true,
        type: DataTypes.FLOAT,
      },

      totalDueAmount: {
        allowNull: false,
        type: DataTypes.DOUBLE,
      },
      amountRecieved: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      amountChange: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },

      tenderedById: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      casheirId: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      customerId: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      paymentStatus: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
      },
      totalEarnings: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      location: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      isVoid: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      hooks: {
        beforeValidate: async (data) => {
          // Total Due Amount Calculator
          let orderz = await sequelize.models.orders.findAll({
            where: { chequeId: data.chequeId },
          });

          data.totalDueAmount = getOrdersTotalPrice(orderz);

          // Amount Change Calculator
          data.amountChange = data.amountRecieved - data.totalDueAmount;
        },
      },
    }
  );
};
