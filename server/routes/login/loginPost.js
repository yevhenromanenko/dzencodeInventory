const { validationResult} = require('express-validator')
const bcrypt = require('bcryptjs');
const jwtToken = require('jsonwebtoken')
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
        const { username, password } = req.body;
        const user = await User.findOne({username});
        if (!user) {
            return res.status(400).json('Такого пользователя не существует!')
        }
        const isMatch = bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json('Не правильный пароль!')
        }

        const jwtSecret = 'sjdnfkjnrf4398934knjsfdncksnd';
        const token = jwtToken.sign(
            {userId: user.id},
            jwtSecret,
            {expiresIn: '2h'}
        )

        res.status(200).json({ redirectTo: '/arrival', token, userId: user.id, username: username, password: password, message: 'Login successful' });

    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
}
