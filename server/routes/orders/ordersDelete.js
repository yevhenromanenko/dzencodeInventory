const Order = require("../../models/Orders");

module.exports = async (req, res) => {
    try {
        const { id } = req.query;
        const deletedOrders = await Order.findOneAndDelete({ id: id});

        if (!deletedOrders) {
            return res.status(404).json({ message: 'not found' });
        }

        res.send('Orders deleted');
    } catch (error) {
        res.status(500).send(error);
    }
}


