const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    content: String,
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    images: {
        thumbnail: String,
        front: String,
        back: String,
    },
});

const Story = mongoose.model('Story', storySchema);
module.exports = Story;
