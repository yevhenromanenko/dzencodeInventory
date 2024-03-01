const Order = require("../../models/Orders");

module.exports = async (req, res) => {
    try {
        const userId = req.query.userId;
        const orders = await Order.find({userId: userId});
        res.send(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}


