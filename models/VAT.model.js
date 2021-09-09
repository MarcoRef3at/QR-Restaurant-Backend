const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("vat", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    rate: {
      allowNull: false,
      type: DataTypes.FLOAT,
      validate: {
        max: 1,
        min: 0,
      },
    },
  });
};
