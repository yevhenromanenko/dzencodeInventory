const calculateTotal = (order) => {
    if (order.products && Array.isArray(order.products) && order.products.length > 0) {
        const totalUSD = order.products.reduce((acc, product) => {
            const usdPrice = product.price.find(p => p.symbol === 'USD');
            return acc + (usdPrice ? parseFloat(usdPrice.value) : 0);
        }, 0);

        const totalUAH = order.products.reduce((acc, product) => {
            const uahPrice = product.price.find(p => p.symbol === 'UAH');
            return acc + (uahPrice ? parseFloat(uahPrice.value) : 0);
        }, 0);

        return { totalUSD, totalUAH };
    }

    return { totalUSD: 0, totalUAH: 0 };
};

export default calculateTotal;
