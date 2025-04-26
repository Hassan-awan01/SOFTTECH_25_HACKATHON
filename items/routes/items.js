const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const checkAuth = require("../middlewares/checkAuth");
const { validateItemInput } = require("../middlewares/validation");
const { parser } = require("../service/imageService");

router.get("/", itemController.getAllItems);
router.get("/:id", checkAuth, itemController.getItem);
router.get("/user/:userId", checkAuth, itemController.getItemsByUser);
router.get("/category/:category", checkAuth, itemController.getItemsByCategory);
router.get("/location/:location", checkAuth, itemController.getItemsByLocation);

router.post(
  "/",
  checkAuth,
  (req, res, next) => {
    parser.array("images", 3)(req, res, (err) => {
      if (err) {
        console.error("Multer error:", err.message);
        return res.status(400).json({ error: err.message });
      }

      console.log("Files received:", req.files);
      next();
    });
  },
  validateItemInput,
  itemController.createItem
);
router.put("/:id", checkAuth, itemController.updateItem);
router.delete("/:id", checkAuth, itemController.deleteItem);

module.exports = router;
