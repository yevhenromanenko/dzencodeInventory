const Product = require("../../models/Product");
const Order = require("../../models/Orders");

module.exports = async (req, res) => {
    try {
        const { id } = req.query;
        const deletedProduct = await Product.findOneAndDelete({ id: id});

        if (!deletedProduct) {
            return res.status(404).json({ message: 'not found' });
        }

        const orders = await Order.find();

        for (const order of orders) {
            const updatedProducts = order.products.filter(product => product.id !== id);

            if (updatedProducts.length !== order.products.length) {
                order.products = updatedProducts;
                await order.save();
            }
        }

        res.send('deleted');
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


