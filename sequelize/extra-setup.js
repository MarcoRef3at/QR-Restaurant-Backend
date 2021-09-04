function applyExtraSetup(sequelize) {
  const { categories, cheques, items, orders, tables, payments, paymentTypes } =
    sequelize.models;
  items.belongsTo(categories);
  categories.hasMany(items);

  orders.belongsTo(items);

  orders.belongsTo(cheques);
  cheques.hasMany(orders);

  cheques.belongsTo(tables);
  tables.hasMany(cheques);

  payments.belongsTo(cheques);
  payments.belongsTo(paymentTypes);
  cheques.hasOne(payments);
  paymentTypes.hasMany(payments);
}

module.exports = { applyExtraSetup };
