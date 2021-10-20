// models/Product.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productSchema = new Schema({
    productId: {
        type: String
    },
    name: {
        type: String
    },
    userId: {
        type: String
    },
    userEmail: {
        type: String
    },
    manufacturer: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    }
}, {
    collection: 'products'
})

module.exports = mongoose.model('Product', productSchema)
