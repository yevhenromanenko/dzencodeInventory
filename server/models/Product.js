const {Schema,  model} = require('mongoose');

const productSchema = new Schema({
    userId: String,
    id: String,
    serialNumber: String,
    isNew: String,
    status: String,
    name: String,
    photo: String,
    title: String,
    type: String,
    specification: String,
    guarantee: {
        start: String,
        end: String
    },
    price: [
        {
            value: String,
            symbol: String,
            isDefault: String
        }
    ],
    order: String,
    date: String
});

const Product = model('productSchema', productSchema);

module.exports = Product;


