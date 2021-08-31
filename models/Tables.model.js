const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("tables", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    number: {
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: true,
    },
    capacity: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 4,
    },
  });
};
