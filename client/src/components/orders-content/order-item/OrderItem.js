import React, {useState} from "react";
import ShowOrderInfo from "../show-order-info/ShowOrderInfo";
import ShowProductsInfo from "../../product-content/show-products-info/ShowProductsInfo";
import DeleteConfirmationModal from "../delete-confirmation-modal/DeleteConfirmationModal";
import calculateTotal from "../../../functions/calculate-total/сalculateTotal";

const OrderItem = ({ order, onDelete, isDeleting, updatedOrders, setUpdatedOrders }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenProducts, setIsOpenProducts] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const toggleInfo = () => {
        setIsOpen(!isOpen);
    };

    const toggleProducts = () => {
        setIsOpenProducts(!isOpenProducts);
    };

    const handleDeleteClick = () => {
        setShowDeleteModal(true);
    };

    const handleDeleteConfirmation = async () => {
        setShowDeleteModal(false);
        await onDelete(order.id);
    };

    const handleDeleteCancel = () => {
        setShowDeleteModal(false);
    };

    return (
        <div>
            <div className="flex items-center p-6 bg-white shadow-lg rounded-lg my-2 overflow-x-auto">
                <div onClick={toggleInfo}  className="flex flex-nowrap items-center justify-center">
                    <div className="flex-none w-96 flex flex-col mr-4">
                        <strong>{order.title}</strong>
                        <span className="text-sm text-gray-600">id: {order.id}</span>
                    </div>

                    <div className="flex-none w-48 flex flex-col mr-4">
                        <span className="text-2xl font-bold">{order.products && order.products.length > 0 ? order.products.length : '0'}</span>
                        <span className="text-sm">продуктов</span>
                    </div>

                    <div className="flex-none w-48 flex flex-col mr-4">
                        <span className="text-sm">{new Date(order.date).toLocaleDateString()}</span>
                    </div>

                    <div className="flex-none w-32 flex flex-col mr-4">
                        <span className="text-2xl font-bold">{calculateTotal(order).totalUSD} $</span>
                        <span className="text-sm">{calculateTotal(order).totalUAH} UAH</span>
                    </div>

                    <div className="flex-none w-48 flex flex-col items-center">
                        <button
                            className={`text-gray-600 focus:outline-none ${isDeleting ? "cursor-not-allowed" : ""}`}
                            onClick={handleDeleteClick}
                            disabled={isDeleting}
                        >
                            <i className="fas fa-trash"></i>
                        </button>
                    </div>

                </div>
            </div>

            {isOpen && !showDeleteModal && (
                <ShowOrderInfo
                    toggleProducts={toggleProducts}
                    order={order}
                    isOpenProducts={isOpenProducts}
                />
            )}

            {isOpen && isOpenProducts && (
              <ShowProductsInfo
                  order={order}
                  setOrder={(updatedOrder) => {
                      const index = updatedOrders.findIndex((o) => o.id === order.id);
                      const newOrders = [...updatedOrders];
                      newOrders[index] = updatedOrder;
                      setUpdatedOrders(newOrders);
                  }}
              />
            )}

            {showDeleteModal && (
                <DeleteConfirmationModal
                    onDelete={handleDeleteConfirmation}
                    onCancel={handleDeleteCancel}
                    order={order}
                />
            )}

        </div>
    );
};

export default OrderItem;
