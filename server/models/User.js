const {Schema,  model} = require('mongoose');

const userSchema = new Schema({
    id: String,
    username: String,
    password: String,
    isActive: Boolean,
});

const User = model('userSchema', userSchema);

module.exports = User;
