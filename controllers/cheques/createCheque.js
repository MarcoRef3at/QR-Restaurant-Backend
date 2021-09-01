const asyncHandler = require("../../middleware/async");
const sequelize = require("../../sequelize");
const ErrorResponse = require("../../utils/errorResponse");
const { execludeAttribute } = require("./_functions");
const { cheques } = sequelize.models;

exports.createCheque = asyncHandler(async (req, res, next) => {
  // Create Zone in Databaase
  try {
    const cheque = await cheques.create(req.body);
    res.status(201).json({ success: true, data: cheque });
  } catch (error) {
    return next(new ErrorResponse(error, 400));
  }
});
