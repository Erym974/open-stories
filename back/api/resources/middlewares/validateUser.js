const Joi = require('joi');

const validateUser = (req, res, next) => {
    const schema = Joi.object({
        avatar: Joi.string(),
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().regex(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~!@#$%^&*()_+{}|:\"<>?/]).{8,}$')).required(),
        
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ status: false, data: error.details[0].message });
    }
    next();
}

module.exports = { validateUser }