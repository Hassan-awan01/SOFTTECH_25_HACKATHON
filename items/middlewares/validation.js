exports.validateItemInput = (req, res, next) => {
  const {
    title,
    exchangeFor,
    description,
    category,
    condition,
    availability,
    location,
    postedBy,
    contact,
    tradeType,
  } = req.body;

  const errors = [];

  // Required string fields
  if (!title || typeof title !== "string" || !title.trim())
    errors.push("Title is required and must be a non-empty string");

  if (!description || typeof description !== "string")
    errors.push("Description is required");

  if (!category || typeof category !== "string")
    errors.push("Category is required");

  if (!condition || typeof condition !== "string")
    errors.push("Condition is required");

  if (!availability || typeof availability !== "string")
    errors.push("Availability is required");

  if (!location || typeof location !== "string")
    errors.push("Location is required");

  if (!postedBy || typeof postedBy !== "string")
    errors.push("PostedBy is required");

  if (!contact || typeof contact !== "string")
    errors.push("Contact is required");

  // Optional field
  if (exchangeFor && typeof exchangeFor !== "string")
    errors.push("ExchangeFor must be a string");

  // tradeType enum validation
  const validTradeTypes = ["Exchange", "Borrow", "Request"];
  if (tradeType && !validTradeTypes.includes(tradeType)) {
    errors.push("TradeType must be one of: Exchange, Borrow, Request");
  }

  // Image file checks
  if (!req.files || !Array.isArray(req.files)) {
    errors.push("Images must be uploaded as multipart/form-data");
  } else if (req.files.length < 1) {
    errors.push("At least 1 image is required");
  } else if (req.files.length > 3) {
    errors.push("Maximum 3 images are allowed");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }

  next();
};
