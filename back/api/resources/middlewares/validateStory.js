const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const fs = require('fs');

const validateStory = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        subtitle: Joi.string().required(),
        content: Joi.string().required(),
        category: Joi.objectId().required(),
        thumbnail: Joi.string().required(),
        front: Joi.string().required(),
        back: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {

        const { thumbnail, back, front } = req.body;

        [thumbnail, back, front].forEach(image => {
            const imagePath = `public/resources/${image}`;
            if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        })

        return res.status(400).json({ status: false, datas: error.details[0].message });
    }
    next();
}
module.exports = { validateStory }