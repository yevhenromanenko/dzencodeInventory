
function GroupProductsByType(products, setUpdatedGroups) {
    if (products.length > 0) {
        const groupedProducts = {};

        products.forEach((product) => {
            if (!groupedProducts[product.type]) {
                groupedProducts[product.type] = [];
            }
            groupedProducts[product.type].push(product);
        });

        const updated = Object.entries(groupedProducts).map(([type, products]) => ({
            type,
            products,
        }));
        setUpdatedGroups(updated);
    } else {
        setUpdatedGroups([]);
    }
}

export default GroupProductsByType;
