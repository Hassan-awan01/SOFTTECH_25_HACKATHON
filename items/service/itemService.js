const { itemRepository } = require("../database");
const imageService = require("./imageService");

class ItemService {
  async createItem(userId, itemData, files) {
    try {
      const imageUrls = [];

      if (files && files.length > 0) {
        const imagesToProcess = files.slice(0, 3);

        for (const file of imagesToProcess) {
          imageUrls.push(file.path);
        }
      }

      const timestamp = new Date().getTime();
      const itemId = `${userId}_${timestamp}`;

      const newItemData = {
        _id: itemId,
        ...itemData,
        images: imageUrls,
      };

      return await itemRepository.create(newItemData);
    } catch (error) {
      throw error;
    }
  }

  async updateItem(id, itemData) {
    try {
      if (itemData.images) {
        // Get the existing item to check current images
        const existingItem = await itemRepository.findById(id);
        if (!existingItem) {
          throw new Error("Item not found");
        }

        // // Extract user ID from the item ID
        // const userId = id.split("_")[0];

        // const newImageUrls = [];
        // const imagesToProcess = itemData.images.slice(0, 3);

        // for (const imageData of imagesToProcess) {
        //   // If it's already a Cloudinary URL, keep it
        //   if (imageData.startsWith("https://res.cloudinary.com/")) {
        //     newImageUrls.push(imageData);
        //   } else {
        //     // If it's a base64 image, upload it to Cloudinary
        //     const imageUrl = await imageService.uploadImage(imageData, userId);
        //     newImageUrls.push(imageUrl);
        //   }
        // }

        // // Delete any old images that aren't in the new set
        // for (const oldUrl of existingItem.images) {
        //   if (!newImageUrls.includes(oldUrl)) {
        //     await imageService.deleteImage(oldUrl);
        //   }
        // }

        itemData.images = newImageUrls;
      }

      // Update the item in the database
      const item = await itemRepository.update(id, itemData);
      if (!item) {
        throw new Error("Item not found");
      }
      return item;
    } catch (error) {
      throw error;
    }
  }

  async deleteItem(id) {
    try {
      // Get the item to delete its images
      const item = await itemRepository.findById(id);
      if (!item) {
        throw new Error("Item not found");
      }

      // Delete all images associated with the item
      if (item.images && item.images.length > 0) {
        for (const imageUrl of item.images) {
          await imageService.deleteImage(imageUrl);
        }
      }

      // Delete the item from the database
      await itemRepository.delete(id);
      return { message: "Item deleted successfully" };
    } catch (error) {
      throw error;
    }
  }

  // Other methods remain the same...
  async getItemById(id) {
    try {
      const item = await itemRepository.findById(id);
      if (!item) {
        throw new Error("Item not found");
      }
      return item;
    } catch (error) {
      throw error;
    }
  }

  async getAllItems() {
    try {
      return await itemRepository.findAll();
    } catch (error) {
      throw error;
    }
  }

  async getItemsByCategory(category) {
    try {
      return await itemRepository.findByCategory(category);
    } catch (error) {
      throw error;
    }
  }

  async getItemsByLocation(location) {
    try {
      return await itemRepository.findByLocation(location);
    } catch (error) {
      throw error;
    }
  }

  async getItemsByUser(userId) {
    try {
      return await itemRepository.findByUser(userId);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ItemService();
