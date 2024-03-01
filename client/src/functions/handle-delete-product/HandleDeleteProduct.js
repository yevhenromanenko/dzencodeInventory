import axios from "axios";
import {HOST_NAME} from "../../HOST_NAME";
const HandleDeleteProduct = async (productId, order, setIsDeletingProduct, setOrder) => {

    try {
        setIsDeletingProduct(true);

        const updatedOrder = { ...order };
        updatedOrder.products = order.products.filter((product) => product.id !== productId);
        setOrder(updatedOrder);

        await axios.delete(`${HOST_NAME}/products?id=${productId}`);
    } catch (error) {
        console.error("Error deleting product:", error);
    } finally {
        setIsDeletingProduct(false);
    }
};

export default HandleDeleteProduct;
