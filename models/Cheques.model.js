const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("cheques", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    isClosed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    // Table Id
  });
};
