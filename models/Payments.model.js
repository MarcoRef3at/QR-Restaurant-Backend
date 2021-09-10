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
          // Validate Cheque is open
          let cheque = await sequelize.models.cheques.findByPk(data.chequeId);
          if (!cheque) throw new Error("No Cheque with the requested ID");
          if (cheque.isClosed || cheque.isvoid)
            throw new Error("Cannot Make Transaction on a closed cheque");

          let orderz = await sequelize.models.orders.findAll({
            where: { chequeId: data.chequeId },
          });
          // If No Orders Found
          if (orderz.length == 0) {
            throw new Error("No Orders for this cheque");
          }
          //  costAmount calculator
          let costs = orderz.map(
            ({ unitWholesalePrice, quantity }) => unitWholesalePrice * quantity
          );
          data.costAmount = costs.reduce(
            (partial_sum, a) => partial_sum + a,
            0
          );

          // Due Amount Calculator
          data.dueAmount = getOrdersTotalPrice(orderz).total;
          // Total Due Amount Calculator
          let vat = (await sequelize.models.vat.findAll()).map(
            ({ rate }) => rate
          );
          totalVat = vat.reduce((partial_sum, a) => partial_sum + a, 0);

          data.discount =
            data.discount > 1 ? data.discount / 100 : data.discount;

          // totaldueamount = dueamount + vat - discount
          data.totalDueAmount =
            data.dueAmount +
            totalVat * data.dueAmount -
            data.dueAmount * data.discount;

          // Amount Change Calculator
          data.amountChange = data.amountRecieved - data.totalDueAmount;
        },
      },
    }
  );
};
