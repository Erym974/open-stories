const mongoose = require('mongoose');

module.exports = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
        console.log('Connected to DB');
    } catch (error) {
        console.log(error);
    }
};