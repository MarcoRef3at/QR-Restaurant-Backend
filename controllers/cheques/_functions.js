const sequelize = require("../../sequelize");
const execludeAttribute = {
  attributes: {
    exclude: ["createdAt", "updatedAt"],
  },
};

const getOrdersTotalPrice = (orderz) => {
  // Get total quanitity of each id
  const lookup = orderz.reduce((a, e) => {
    a[e.itemId] = a[e.itemId] + e.quantity || e.quantity;
    return a;
  }, {});

  // Modify quantity of each id
  let modifiedQuantities = orderz.filter((e) => {
    e.quantity = lookup[e.itemId];
    return lookup[e.itemId];
  });

  // Remove duplicates from array
  let filtered = Object.values(
    modifiedQuantities.reduce(
      (acc, cur) => Object.assign(acc, { [cur.itemId]: cur }),
      {}
    )
  );

  // Adding Total Price to each order
  filtered.forEach(
    (item) => (item.dataValues.totalPrice = item.quantity * item.unitPrice)
  );

  // Get Cheque Total price
  let total = filtered.reduce(
    (acc, curr) => acc.dataValues.totalPrice + curr.dataValues.totalPrice
  );
  let output = { total, filtered };
  return output;
};

module.exports = {
  execludeAttribute,
  getOrdersTotalPrice,
};
