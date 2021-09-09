const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "orders",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      itemId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      unitPrice: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      unitWholesalePrice: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      chequeId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      isDone: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      hooks: {
        // Validate Cheque is open before deleting order
        beforeBulkDestroy: async (order) => {
          // Get Orders Ids
          let ordersIds = order.where.id;
          let invalidIds = [];

          // Get the order's associated cheque
          let orders = await sequelize.models.orders.findAll({
            where: { id: ordersIds },
            include: [
              {
                model: sequelize.models.cheques,
                attributes: ["id", "isClosed", "isVoid"],
              },
            ],
          });

          // If orders were in an array
          if (typeof orders == "object") {
            await Promise.all(
              // Loop over the orders to find their cheque status
              orders.map(async (order) => {
                // Validate cheque is open and not void
                let { isClosed, isVoid } = order.cheque;
                let { isDone } = order;
                if (isClosed || isVoid || isDone) {
                  // If Cheque status is closed add the order id to invalidIds Array
                  return invalidIds.push(order.id);
                }
              })
            );
          }

          // Finally, If there is Invalid order Ids inside the array
          if (invalidIds.length > 0) {
            // Get The other Valid order Ids
            let validIds = ordersIds.filter((x) => !invalidIds.includes(x));
            // Remove the Valid ones
            return sequelize.models.orders
              .destroy({
                where: { id: validIds },
              })
              .then(() => {
                // Throw Error with what was deleted and what wasn't
                throw new Error(
                  `${
                    validIds.length > 0
                      ? `Orders [${validIds}] Were deleted Successfully but`
                      : ""
                  } Couldn't delete orders [${invalidIds}] as they are Done or associated to closed cheques!`
                );
              });
          }
        },

        beforeValidate: async (order) => {
          // Validates ItemId and stock available quantity
          let { sellingPrice, wholeSalePrice } = await getCurrentSellingPrice(
            order.itemId,
            order.quantity
          );
          await validateChequeId(order, sellingPrice, wholeSalePrice);

          // TODO: subtract quantity on order close
        },
      },
    }
  );

  const getCurrentSellingPrice = async (itemId, quantity) => {
    // Get Current Selling Price of the item to add it to orders table
    let item = await sequelize.models.items.findByPk(itemId);

    // Validate item existance
    if (item == null) {
      throw new Error("ItemId is not available!");
    } else {
      // IF Item Found
      if (item.stockQuantity < quantity) {
        throw new Error(`Stock Quantity is only ${item.stockQuantity}!`);
      } else {
        // If Item Found and Quantity is available
        return {
          sellingPrice: item.sellingPrice,
          wholeSalePrice: item.wholesalePrice,
        };
      }
    }
  };

  const validateChequeId = async (order, sellingPrice, wholeSalePrice) => {
    // Save Current Selling Price to orders table
    order.unitPrice = sellingPrice;
    order.unitWholesalePrice = wholeSalePrice;

    if (!order.chequeId) {
      throw new Error("ChequeId is Required!");
    } else {
      let cheque = await sequelize.models.cheques.findByPk(order.chequeId);
      // If Check Id is not found in DB
      if (cheque == null) {
        throw new Error("ChequeId is Not Available!");
      } else {
        // If Cheque Found
        // Check if it's closed or void
        if (cheque.isVoid || cheque.isClosed) {
          throw new Error("Cheque is Closed!");
        }
      }
    }
  };
};
