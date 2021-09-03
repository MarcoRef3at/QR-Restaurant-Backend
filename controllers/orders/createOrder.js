const asyncHandler = require("../../middleware/async");
const sequelize = require("../../sequelize");
const ErrorResponse = require("../../utils/errorResponse");
const { execludeAttribute } = require("./_functions");
const { orders, tables, cheques } = sequelize.models;
const { Op } = require("sequelize");

// @des         **Create order by cheque id**
// @route       POST /order
// @access      Private
exports.createOrderByChequeId = asyncHandler(async (req, res, next) => {
  req.body.chequeId = req.params.id;
  try {
    const order = await orders.create(req.body);
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    return next(new ErrorResponse(error, 400));
  }
});

// @des         **Create order by table id**
// @route       POST /order/table/id
// @access      public
exports.createOrderByTableId = asyncHandler(async (req, res, next) => {
  let tableId = req.params.id;

  // Get Opened Cheques of the requested table id
  let availableCheque = await cheques.findOne({
    where: {
      [Op.and]: [{ tableId }, { isClosed: false }, { isVoid: false }],
    },
  });
  // IF No Open Cheque
  if (availableCheque == null) {
    // validate tableid
    let table = await tables.findByPk(tableId);
    if (table == null) {
      return next(
        new ErrorResponse("There is no table with the provided id", 400)
      );
    }
    // Create New Cheque
    availableCheque = await cheques.create({ tableId });
  }

  // Add the cheque id to the request body
  req.body.chequeId = availableCheque.id;

  // Create order on this cheque
  try {
    const order = await orders.create(req.body);
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    return next(new ErrorResponse(error, 400));
  }
});
