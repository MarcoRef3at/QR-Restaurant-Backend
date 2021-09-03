const asyncHandler = require("../../middleware/async");
const sequelize = require("../../sequelize");
const ErrorResponse = require("../../utils/errorResponse");
const { execludeAttribute, includeDevices } = require("./_functions");
const { orders, cheques, tables } = sequelize.models;
const { Op } = require("sequelize");

// Get All Orders & Get Singlie Order
exports.getOrder = asyncHandler(async (req, res, next) => {
  let order;
  let count = 0;

  // if 0 get all orders
  if (req.params.id == 0) {
    order = await orders.findAll({
      ...execludeAttribute,
    });
    // Count Retrieved Devices
    count = await orders.count();
  } else {
    order = await orders.findByPk(req.params.id, {
      ...execludeAttribute,
    });
    count = order ? 1 : 0;
  }
  res.status(200).json({ success: true, count, data: order });
});

// /cheque/:id
exports.getOrderByChequeId = asyncHandler(async (req, res, next) => {
  let availableOrders = await orders.findAll(
    { where: { chequeId: req.params.id } },
    {
      ...execludeAttribute,
    }
  );

  // If no orders
  if (availableOrders.length == 0) {
    // Validate Cheque ID
    let cheque = await cheques.findByPk(req.params.id);
    // IF No Cheque Found
    if (cheque == null) {
      return next(
        new ErrorResponse("There is no Cheque with the provided Id", 400)
      );
    }
  } else {
    // IF Found Orders
    res.status(200).json({ success: true, data: availableOrders });
  }
});

// /table/:id
exports.getOrderByTableId = asyncHandler(async (req, res, next) => {
  let tableId = req.params.id;

  // Get Opened Cheques of the requested table id
  let availableCheque = await cheques.findOne({
    where: {
      [Op.and]: [{ tableId }, { isClosed: false }, { isVoid: false }],
    },
  });

  // IF No Open Cheque
  if (availableCheque == null) {
    // Validate table id
    let table = await tables.findByPk(tableId);
    if (table == null) {
      return next(
        new ErrorResponse("There is no Table with the requested id", 400)
      );
    }
    return next(
      new ErrorResponse("There is no Open Cheque for the requested Table", 400)
    );
  } else {
    // if found cheques get it's orders
    let availableOrders = await orders.findAll(
      { where: { chequeId: availableCheque.id } },
      {
        ...execludeAttribute,
      }
    );

    res.status(200).json({ success: true, data: availableOrders });
  }
});
