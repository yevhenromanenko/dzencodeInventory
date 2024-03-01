const { validationResult} = require('express-validator')
const bcrypt = require('bcryptjs');

const User = require("../../models/User");

module.exports = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при регистрации!'
            })

        }

        const { id, username, password } = req.body;

        const isUsed = await User.findOne({ username: username })

        if (isUsed) {
            return res.status(300).json({message: 'Данный Username занят, попробуйте другой!'})
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = new User({
            id: id,
            username: username,
            password: hashedPassword
        });

        await user.save()

        res.status(201).json({message: 'Пользователь создан!'})

    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
}
