const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("items", {
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
    wholesalePrice: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    sellingPrice: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    stockQuantity: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    categoryId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    // category id
  });
};
