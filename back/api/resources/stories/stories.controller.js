const storyModel = require("./stories.model");
const categoryModel = require("./../categories/categories.model");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports = {

  async getAllStories(req, res) {
    try {
      const stories = await storyModel.find();
      return res.status(200).json({ status: true, datas: stories });
    } catch (error) {
      return res.status(500).json({ status: false, datas: error });
    }
  },

  async searchStories(req, res, next) {
    let { s: search, q: query } = req.query;

    if(!search || !query) return next();
    if(!['category', 'search'].includes(search)) return next();

    search = search.toLowerCase();
    query = query.toLowerCase();

    let stories = [];

    switch(search) {
      case 'category':
        if(ObjectId.isValid(query)) {
          stories = await storyModel.find({ category: query }).lean()
        } else {
          category = await categoryModel.findOne({ name: { $regex: query, $options: 'i' } })
          if(category) stories = await storyModel.find({ category: category?._id })
        }
        break;
      case 'search':

        const or = [
          { title: { $regex: query, $options: 'i' } },
          { subtitle: { $regex: query, $options: 'i' } },
        ]

        if(ObjectId.isValid(query)) {
          or.push({ _id: query })
        }

        stories = await storyModel.find({ 
          $or: or
        }).lean()
        break;
    }

    return res.status(200).json({ status: true, datas: stories });
  },

  async newestStories(req, res, next) {
    let { a: action, l: limit } = req.query;

    if(!action || !limit) return next();
    if(action != "newest") return next();

    limit = parseInt(limit);

    let stories = [];

    stories = await storyModel.find().sort({ createdAt: -1 }).limit(limit).lean()

    return res.status(200).json({ status: true, datas: stories });
  },

  async likestStories(req, res, next) {
    let { a: action, l: limit } = req.query;

    if(!action || !limit) return next();
    if(action != "likest") return next();

    limit = parseInt(limit);

    let stories = [];

    stories = await storyModel.find().sort({ likes: -1 }).sort({ createdAt: -1 }).limit(limit).lean()

    return res.status(200).json({ status: true, datas: stories });
  },

  async toggleLike(req, res) {

    const identifier = req.params.identifier;

    try {
      let story = await storyModel.findOne({ slug: identifier });
      if(!story && ObjectId.isValid(identifier)) story = await storyModel.findById(identifier);
      if(!story) return res.status(404).json({ status: false, datas: { message: 'Story not found' } });

      const { like } = req.body;

      if(like) {
        if(!story.likes.includes(like)) story.likes.push(like);
        else story.likes = story.likes.filter(like => like != like);

        await story.save();
      }

      return res.status(200).json({ status: true, datas: story });
    } catch (error) {
      return res.status(500).json({ status: false, datas: error });
    }
  },

  async getStory(req, res) {

    const identifier = req.params.identifier;

    try {
      let story = await storyModel.findOne({ slug: identifier });
      if(!story && ObjectId.isValid(identifier)) story = await storyModel.findById(identifier);

      if(!story) return res.status(404).json({ status: false, datas: { message: 'Story not found' } });

      return res.status(200).json({ status: true, datas: story });
    } catch (error) {
      return res.status(500).json({ status: false, datas: error });
    }
  },

  async createStory(req, res) {

    const { title, subtitle, content, category, thumbnail, front, back } = req.body;

    try {
      const story = await storyModel.create({ title, subtitle, content, category, images: { thumbnail, back, front } });
      return res.status(201).json({ status: true, datas: story });
    } catch (error) {
      return res.status(500).json({ status: false, datas: error });
    }
  }

};
