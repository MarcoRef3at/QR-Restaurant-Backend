const { DataTypes } = require("sequelize");

module.exports = sequelize => {
  sequelize.define(
    "orders",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      itemId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      unitPrice: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 1
      },
      chequeId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      isDone: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      hooks: {
        beforeBulkDestroy: async order => {
          let ordersIds = order.where.id;
          if (typeof ordersIds == "object") {
            let validIds = await ordersIds.forEach(id => {
              if (id == 1) {
                return true;
              } else {
                return false;
              }
            });
            console.log("validIds:", validIds);
          }
          // Validate cheque is open
          // let orderz = await sequelize.models.orders.findAll({
          //   where: { id: req.body.ids },
          //   include: [
          //     {
          //       model: cheques,
          //       attributes: ["id", "isClosed", "isVoid"]
          //     }
          //   ]
          // });
          // console.log("orderz:", orderz);

          throw new Error("Cannot delete order of a closed cheque!");
        },
        beforeValidate: async order => {
          // Validates ItemId and stock available quantity
          let sellingPrice = await getCurrentSellingPrice(
            order.itemId,
            order.quantity
          );
          await validateChequeId(order, sellingPrice);

          // TODO: subtract quantity on order close
        }
      }
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
        return item.sellingPrice;
      }
    }
  };

  const validateChequeId = async (order, sellingPrice) => {
    // Save Current Selling Price to orders table
    order.unitPrice = sellingPrice;

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
