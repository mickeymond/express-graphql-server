const mongoose = require('mongoose');
const uniqueValidator  = require('mongoose-unique-validator');

const PostSchema = mongoose.Schema({
    title: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

PostSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Post', PostSchema);