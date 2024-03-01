const Product = require("../../models/Product");
const Order = require("../../models/Orders");

module.exports = async (req, res) => {
    try {
        const newProductData = req.body;
        const newItem = new Product(newProductData);

        if (newProductData.order) {
            const order = await Order.findOne({ id: newProductData.order });
            if (order) {
                order.products.push(newProductData);
                await order.save();
                await newItem.save();
                res.send(newItem);

            } else {
                res.status(404).json({ error: "Order not found" });
            }
        } else {
            await newItem.save();
            res.send(newItem);
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}
