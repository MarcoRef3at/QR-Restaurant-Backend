function applyExtraSetup(sequelize) {
  const { categories, cheques, items, orders, tables } = sequelize.models;
  items.belongsTo(categories);
  categories.hasMany(items);

  orders.belongsTo(items);

  orders.belongsTo(cheques);
  cheques.hasMany(orders);

  cheques.belongsTo(tables);
  tables.hasMany(cheques);
}

module.exports = { applyExtraSetup };
