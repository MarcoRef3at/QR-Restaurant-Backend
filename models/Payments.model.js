const { DataTypes } = require("sequelize");

module.exports = sequelize => {
  sequelize.define("payments", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },

    chequeId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },

    paymentTypeId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },

    totalAmount: {
      allowNull: false,
      type: DataTypes.DOUBLE
    }
  });
};
