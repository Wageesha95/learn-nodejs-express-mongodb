const mongoose = require('mongoose');
const schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);



const leaderSchema = new schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    abbr: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true

});


var Leaders = mongoose.model('Leader', leaderSchema);

module.exports = Leaders

