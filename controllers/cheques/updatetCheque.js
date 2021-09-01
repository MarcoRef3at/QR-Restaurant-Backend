const asyncHandler = require("../../middleware/async");
const ErrorResponse = require("../../utils/errorResponse");
const sequelize = require("../../sequelize");
const { cheques } = sequelize.models;

exports.updateCheque = asyncHandler(async (req, res, next) => {
  try {
    await cheques.update(req.body, { where: { id: req.params.id } });

    let cheque = await cheques.findByPk(req.params.id);

    if (!cheque) {
      return next(
        new ErrorResponse(`Record with ID ${req.params.id} not found`, 404)
      );
    } else {
      res.status(200).json({ success: true, data: cheque });
    }
  } catch (error) {
    return next(new ErrorResponse(error.message, 404));
  }
});
