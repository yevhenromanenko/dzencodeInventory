import axios from "axios";
import {HOST_NAME} from "../../../HOST_NAME";

const DeleteProduct = async (product, setIsDeleting, onUpdateProducts, updatedProducts) => {
    try {
        setIsDeleting(true);
        await axios.delete(`${HOST_NAME}/products?id=${product.id}`);

        const updated = updatedProducts.filter(item => item.id !== product.id);
        onUpdateProducts(updated);

    } catch (error) {
        console.error("Error deleting product:", error);
    } finally {
        setIsDeleting(false);
    }
};

export default DeleteProduct;
