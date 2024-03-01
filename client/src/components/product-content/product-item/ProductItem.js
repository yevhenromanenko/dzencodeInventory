import React from "react";
import './ProductItem.css'
import DeleteProduct from "../delete-product/DeleteProduct";
import formatDate from "../../../functions/format-date/formatDate";
import getStatusDotColor from "../../../functions/get-status-dot-color/getStatusDotColor";

const ProductItem = ({ product, onUpdateProducts, isDeleting, setIsDeleting, updatedProducts, orders }) => {

    if (!product) {
        return null;
    }

    return (
        <div className="flex items-center p-6 bg-white shadow-lg rounded-lg my-2 overflow-x-auto">
            <div className="flex-none w-6 flex flex-col mr-4 items-center">
                <div
                    className={`w-4 h-4 rounded-full mr-4 ${
                        product.status === '1' ? "bg-green-500" : "bg-red-500"
                    }`}
                ></div>
            </div>

            <div className="flex-none w-14 flex flex-col mr-4">
                <img
                    src={product.photo}
                    alt={product.title}
                    className="w-12 h-12 object-cover rounded-full"
                />
            </div>

            <div className="flex-none w-46 flex flex-col mr-4">
                <span className="text-lg font-medium name-product">{product.name}</span>
                <span className="text-sm text-gray-600">{product.serialNumber}</span>
            </div>

            <div className="flex-none w-18 flex flex-col mr-5 ml-5">
                <span style={{color: `${getStatusDotColor(product)}`}} className={`text-sm text-gray-600`}>{product.status === '1' ? "Свободен" : "В ремонте"}</span>
            </div>

            <div className="flex-none w-24 flex flex-col mr-5 ml-5">
                <div>
                    <span className="text-sm text-gray-600">с </span><span className="text-sm font-medium">{formatDate(product.guarantee.start)}</span>
                </div>
                <div>
                    <span className="text-sm text-gray-600">по </span><span className="text-sm font-medium">{formatDate(product.guarantee.end)}</span>
                </div>
            </div>

            <div className="flex-none w-18 flex flex-col mr-5 ml-5">
                <span className="text-sm text-gray-600">{product.isNew === '1' ? "Новый" : "Б/У"}</span>
            </div>

            <div className="flex-none w-18 flex flex-col mr-5 ml-5">
                <div>
                    <span className="text-sm text-gray-600">{product.price[0].value} {product.price[0].symbol}</span>
                </div>
                <div>
                    <span className="text-sm font-medium">{product.price[1].value} {product.price[1].symbol}</span>
                </div>
            </div>

            <div className="flex-none w-18 flex flex-col mr-5 ml-5">
                <span className="text-sm text-gray-600">{product.type}</span>
            </div>
            <div className="flex-none w-18 flex flex-col mr-5 ml-5">
                <span className="text-sm text-gray-600">{product.customerName && product.customerName.length > 0 ? product.customerName : '\t—'}</span>
            </div>

            <div className="flex-none w-18 flex flex-col mr-5 ml-5">
                   <span className="text-sm text-gray-600">
                        {orders.find((order) => order.id === product.order)?.title}
                   </span>
            </div>
            <div className="flex-none w-18 flex flex-col mr-5 ml-5">
                <span className="text-sm text-gray-600">{formatDate(product.date)}</span>
            </div>

            <div className="flex-none w-16 flex flex-col items-center">
                <button
                    className={`text-gray-600 focus:outline-none ${isDeleting ? "cursor-not-allowed" : ""}`}
                    onClick={() => DeleteProduct(product, setIsDeleting, onUpdateProducts, updatedProducts)}
                    disabled={isDeleting}
                >
                    <i className="fas fa-trash"></i>
                </button>
            </div>
        </div>
    );
};

export default ProductItem;
