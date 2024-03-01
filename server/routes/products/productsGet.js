const Product = require("../../models/Product");

module.exports = async (req, res) => {
    try {
        const userId = req.query.userId;
        const products = await Product.find({userId: userId});
        res.send(products);
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка сервера');
    }
}
