const userModel = require("./users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

module.exports = {

  async signUp(req, res) {
    const { password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    req.body.password = hash;
    try {
      const user = await userModel.create({...req.body, premium: false, statistics: { game_played: 0, game_won: 0, game_lost: 0 }});
      return res.status(201).json({ status: true, data: user });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({
          status: false,
          data: "Email already exists",
        });
      }
      return res.status(500).json({ status: false, data: error });
    }
  },

  async getAllUsers(req, res) {
    try {
      const users = await userModel.find();
      return res.status(200).json({ status: true, data: users });
    } catch (error) {
      return res.status(500).json({ status: false, data: error });
    }
  },

  async logIn(req, res) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      remember: Joi.boolean()
    });

    const { error } = schema.validate(req.body);
    if (error)
      return res.status(400).send({ status: false, data: error.details[0].message });
    let user = await userModel.findOne({ email: req.body.email });

    if (!user)
      return res.status(400).send({
        status: false,
        data: "Invalid email",
      });

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch)
      return res.status(400).send({ status: false, data: "Invalid password" });

    if (req.body.remember) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "14d",
      });
      return res.json({ status: true, data: { token, user } });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return res.json({ status: true, data: { token, user } });
    }
  },

  async deleteUser(req, res) {
    const { id } = req.user;
    try {
      await userModel.findByIdAndDelete(id);
      return res.status(200).json({ status: true, data: "User deleted" });
    } catch (error) {
      return res.status(500).json({ status: false, data: error });
    }
  },

  async getUser(req, res) {
    const { id } = req.user;
    try {
      const user = await userModel.findById(id);
      return res.status(200).json({ status: true, data: user });
    } catch (error) {
      return res.status(500).json({ status: false, data: error });
    }
  },

  async updateUser(req, res) {
    const { id } = req.user;
    const { password } = req.body;

    if (password) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      req.body.password = hash;
    }
    try {
      const user = await userModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      return res.status(200).json({ status: true, data: user });
    } catch (error) {
      return res.status(500).json({ status: false, data: error });
    }
  }
};
