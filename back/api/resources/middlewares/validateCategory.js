const Joi = require('joi');
const fs = require('fs');

const validateCategory = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        image: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        const image = req.body.image;

        if (image) {
            const imagePath = `public/resources/${image}`;
            if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        }

        return res.status(400).json({ status: false, datas: error.details[0].message });
    }
    next();
}
module.exports = { validateCategory }