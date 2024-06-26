const mongoose = require('mongoose');
const {Schema} = mongoose;

const pasteSchema = new Schema({
    hash: {
        type: String,
        required: true,
        unique: true,
    },
    pasteValue: String,
    created: {type: Date, default: Date.now},
});

module.exports = mongoose.model('pasteModel', pasteSchema);