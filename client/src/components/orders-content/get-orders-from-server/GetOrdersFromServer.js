import axios from "axios";
import {HOST_NAME} from "../../../HOST_NAME";

const GetOrdersFromServer = async (userId, setUpdatedOrders, setLoading) => {
    try {
        setLoading(true);
        const response = await axios.get(`${HOST_NAME}/orders?userId=${userId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        setUpdatedOrders(response.data);
    } catch (error) {
        console.error("Error setUpdatedOrders:", error);
        setUpdatedOrders([]);
    } finally {
        setLoading(false);
    }
};

export default GetOrdersFromServer;
