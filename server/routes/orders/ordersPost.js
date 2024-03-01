const Order = require("../../models/Orders");

module.exports = async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.send(newOrder);
    } catch (error) {
        console.error('Error adding order:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}


