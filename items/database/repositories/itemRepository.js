// src/repositories/itemRepository.js
const Item = require("../Models/items");

class ItemRepository {
  async create(itemData) {
    try {
      const item = new Item(itemData);
      return await item.save();
    } catch (error) {
      throw error;
    }
  }

  async findById(id) {
    try {
      return await Item.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async findAll(filter = {}) {
    try {
      return await Item.find(filter);
    } catch (error) {
      throw error;
    }
  }

  async update(id, itemData) {
    try {
      return await Item.findByIdAndUpdate(id, itemData, {
        new: true,
        runValidators: true,
      });
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      return await Item.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }

  async findByCategory(category) {
    try {
      return await Item.find({ category });
    } catch (error) {
      throw error;
    }
  }
  async findByLocation(location) {
    try {
      return await Item.find({ location });
    } catch (error) {
      throw error;
    }
  }

  async findByUser(userId) {
    try {
      return await Item.find({ _id: { $regex: new RegExp(`^${userId}`) } });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ItemRepository();
