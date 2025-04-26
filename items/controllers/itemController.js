// src/controllers/itemController.js
const itemService = require("../service/itemService");

class ItemController {
  async createItem(req, res) {
    try {
      console.log(req.user);
      const userId = req.user.id;
      const itemData = req.body;
      const images = req.files;

      const newItem = await itemService.createItem(userId, itemData, images);
      res.status(201).json({ success: true, data: newItem });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getItem(req, res) {
    try {
      const item = await itemService.getItemById(req.params.id);
      return res.status(200).json({
        success: true,
        data: item,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        error: error.message,
      });
    }
  }

  async getItemsByCategory(req, res) {
    try {
      const item = await itemService.getItemsByCategory(req.params.category);
      return res.status(200).json({
        success: true,
        data: item,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        error: error.message,
      });
    }
  }

  async getItemsByLocation(req, res) {
    try {
      const item = await itemService.getItemsByLocation(req.params.location);
      return res.status(200).json({
        success: true,
        data: item,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        error: error.message,
      });
    }
  }

  async getAllItems(req, res) {
    try {
      // const { category, availability } = req.query;
      // const filter = {};

      // if (category) filter.category = category;
      // if (availability !== undefined)
      //   filter.availability = availability === "true";

      const items = await itemService.getAllItems();
      return res.status(200).json({
        success: true,
        count: items.length,
        data: items,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }

  async updateItem(req, res) {
    try {
      const item = await itemService.updateItem(req.params.id, req.body);
      return res.status(200).json({
        success: true,
        data: item,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  async deleteItem(req, res) {
    try {
      const result = await itemService.deleteItem(req.params.id);
      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  async getItemsByUser(req, res) {
    try {
      const userId = req.params.userId;
      const items = await itemService.getItemsByUser(userId);

      return res.status(200).json({
        success: true,
        count: items.length,
        data: items,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
}

module.exports = new ItemController();
