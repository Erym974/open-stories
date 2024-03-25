const categoryModel = require("./categories.model");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports = {

  async getAllCategories(req, res) {
    try {
      const categories = await categoryModel.find();
      return res.status(200).json({ status: true, datas: categories });
    } catch (error) {
      return res.status(500).json({ status: false, datas: error });
    }
  },

  async getCategory(req, res) {

    const identifier = req.params.identifier;

    try {
      let category = await categoryModel.findOne({ slug: identifier });
      if(!category && ObjectId.isValid(identifier)) category = await categoryModel.findById(identifier);

      if(!category) return res.status(404).json({ status: false, datas: { message: 'Category not found' } });

      return res.status(200).json({ status: true, datas: category });
    } catch (error) {
      return res.status(500).json({ status: false, datas: error });
    }
  },

  async createCategory(req, res) {

    const { name, image } = req.body;

    try {
      const category = await categoryModel.create({ name, image });
      return res.status(201).json({ status: true, datas: category });
    } catch (error) {
      return res.status(500).json({ status: false, datas: error });
    }
  }

};
