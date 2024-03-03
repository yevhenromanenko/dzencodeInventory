import React, {useEffect, useState} from 'react';
import axios from "axios";
import OrderItem from "../order-item/OrderItem";
import AddOrderModal from "../add-order-modal/AddOrderModal";
import GetOrdersFromServer from "../get-orders-from-server/GetOrdersFromServer";
import {HOST_NAME} from "../../../HOST_NAME";

const OrdersPage = ({userId, setLoading, loading, setUpdatedOrders, updatedOrders}) => {
    const [showModal, setShowModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        document.title = "Приход";
    }, []);

    useEffect(() => {
        GetOrdersFromServer(userId, setUpdatedOrders, setLoading);
    }, [userId]);

    const handleDeleteOrder = async (orderId) => {
        try {
            setIsDeleting(true);
            await axios.delete(`${HOST_NAME}/orders?id=${orderId}`);

            const updated = updatedOrders.filter(order => order.id !== orderId);
            setUpdatedOrders(updated);
        } catch (error) {
            console.error("Error handleDeleteOrder:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    const handleAddOrderClick = () => {
        setShowModal(true);
    };

    return (
        <div>
            <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                <div className="container mx-auto px-6 py-8">
                    <h3 className="text-gray-700 text-2xl font-medium">Приход / {updatedOrders.length > 0 ? updatedOrders.length : '0'}</h3>
                    <div className="flex items-center">
                        <button className="text-white bg-green-500 focus:outline-none rounded-full py-1 px-3" onClick={handleAddOrderClick}>
                            <i className="fas fa-plus"></i>
                        </button>
                        <span className="ml-2 text-xs font-bold uppercase">Добавить приход</span>
                    </div>

                    <div>
                        {loading ? (
                            <p>Загрузка...</p>
                        ) : updatedOrders.length > 0 ? (
                            updatedOrders.map(order => (
                                <OrderItem
                                    key={`${order.id}-${order.date}`}
                                    order={order}
                                    onDelete={handleDeleteOrder}
                                    isDeleting={isDeleting}
                                    setIsDeleting={setIsDeleting}
                                    updatedOrders={updatedOrders}
                                    setUpdatedOrders={setUpdatedOrders}
                                />
                            ))
                        ) : (
                            <p>Приход не найден</p>
                        )}
                    </div>

                    {showModal && (
                        <AddOrderModal
                            onClose={() => setShowModal(false)}
                            userId={userId}
                            setUpdatedOrders={setUpdatedOrders}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrdersPage;


