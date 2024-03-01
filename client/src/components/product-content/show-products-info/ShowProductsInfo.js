import React, {useState} from "react";
import getStatusDotColor from "../../../functions/get-status-dot-color/getStatusDotColor";
import HandleDeleteProduct from "../../../functions/handle-delete-product/HandleDeleteProduct";

const ShowProductsInfo = ({order, setOrder}) => {
    const [isDeletingProduct, setIsDeletingProduct] = useState(false);

    return (
        <>
            <div className="product-container" style={{ width: '85%', marginLeft: 'auto' }}>
                <div>
                    {order.products.map((product, index) => (
                            <div key={index} className="flex items-center p-6 bg-white shadow-lg rounded-lg my-2 overflow-x-auto">
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

                                <div className="flex-none w-32 flex flex-col mr-5 ml-5  items-center">
                                    <span style={{color: `${getStatusDotColor(product)}`}} className={`text-sm text-gray-600`}>{product.status === '1' ? "Свободен" : "В ремонте"}</span>
                                </div>

                                <div className="flex-none w-24 flex flex-col mr-5 ml-5">
                                    <span className="text-sm text-gray-600">{product.isNew === '1' ? "Новый" : "Б/У"}</span>
                                </div>

                                <div className="flex-none w-16 flex flex-col items-center ml-auto">
                                    <button
                                        className="text-gray-600 focus:outline-none"
                                        onClick={() => HandleDeleteProduct(product.id, order, setIsDeletingProduct, setOrder)}
                                        disabled={isDeletingProduct}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    )
}

export default ShowProductsInfo;
