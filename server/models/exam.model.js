const mongoose = require( 'mongoose' );
const PetSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: [ true, "Pet needs a name." ],
        minlength: [ 3, "Pet name needs to be 2 or more characters long." ]
    },
    type: {
        type: String,
        required: [ true, "Pet needs a type." ],
            minlength: [ 3, "Pet type needs to be 2 or more characters long." ]
    },
    description: {
        type: String,
            required: [ true, "Pet needs a description." ],
            minlength: [ 3, "Pet description needs to be 3 or more characters long." ]
    },
    skills: {
        type: Array,
        maxlength: [3, "Animals can't have more than 3 skills"]
    }
}, {
    timestamps: true
} );
module.exports.Pet = mongoose.model( 'Pet', PetSchema );