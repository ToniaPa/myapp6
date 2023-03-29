const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const validateEmail = (email)=>{
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ //regular expression για email
    return re.test(email); //ελέγχει τα regex (η JS το κάνει)
}

let addressSchema = new Schema({
    area: {type: String},
    road: {type: String}
}, {_id: false});

let phoneSchema = new Schema({
    type: {type: String},
    number: {type: String}
}, {_id: false});

let productSchema = new Schema({
    product: {type: String},
    cost: {type: Number},
    quantity: {type: Number},
    date: {type: Date, default: Date.now}
}, {_id: false});

let userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required field'],
        max: 100,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is required field'],
        max: 100
    },
    name: {
        type: String,
        max: 100
    },
    surname: {
        type: String,
        max: 100
    },
    email: {
        type: String,
        required: [true, 'Email is required field'],
        max: 100,
        unique: true,
        trim: true,
        lowercase: true,
        // validate:[validateEmail, 'Email address is not valid'] //ή το παρακάτω, ένα από τα δύο διαλέγω
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,  //regular expression για τα email
                'Email address is not valid']
    },
    address: addressSchema,
    phone: {type: [phoneSchema], null: true},
    products: {type: [productSchema], null: true}
}, {
    collection: 'users',
    timestamps: true
})

userSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', userSchema);