import axios from "axios";
import {HOST_NAME} from "../../HOST_NAME";

const GetProductsFromServer = async (userId, setUpdatedProducts, setLoadingProduct) => {
    try {
        setLoadingProduct(true);
        const response = await axios.get(`${HOST_NAME}/products?userId=${userId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        })

        setUpdatedProducts(response.data);
    } catch (error) {
        console.error("Error fetching orders:", error);
        setUpdatedProducts([]);
    } finally {
        setLoadingProduct(false);
    }
}

export default GetProductsFromServer;
