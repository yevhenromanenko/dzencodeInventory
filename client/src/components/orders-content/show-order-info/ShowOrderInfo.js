import React from "react";
import calculateTotal from "../../../functions/calculate-total/сalculateTotal";
import truncateDescription from "../../../functions/truncate-description/truncateDescription";

const ShowOrderInfo = ({toggleProducts, order, isOpenProducts}) => {

    return (
        <>
            <div onClick={toggleProducts} className="product-container" style={{ width: '95%', marginLeft: 'auto'}}>
                <div className="flex items-center p-6 bg-white shadow-lg rounded-lg my-2 overflow-x-auto">

                    <div className="flex-none w-64 flex flex-col mr-4">
                        <p>{order.title}</p>
                    </div>

                    <div className="flex-none w-64 flex flex-col mr-4">
                        <span
                            className={`text-sm text-gray-600 focus:outline-none ${order.description.length > 35 ? 'cursor-pointer text-description' : ''}`}
                            title={order.description}>
                            {truncateDescription(order.description, 35)}
                        </span>
                    </div>

                    <div className="flex-none w-56 flex flex-col mr-4 items-center">
                        <span className="text-lg font-medium name-product">{new Date(order.date).toLocaleDateString()}</span>
                        <span className="text-sm text-gray-600">{new Date(order.date).toLocaleDateString()}</span>
                    </div>

                    <div className="flex-none w-56 flex flex-col mr-4 items-center">
                        <span className="text-lg font-medium name-product">{calculateTotal(order).totalUSD} USD</span>
                        <span className="text-sm text-gray-600">{calculateTotal(order).totalUAH} UAH</span>
                    </div>

                    <div className="flex-none w-46 flex flex-col mr-4 items-center ml-auto">
                        <button className="bg-blue-500 w-46 text-white px-2 py-1 rounded-full ">
                            {isOpenProducts ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 w-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 w-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            )}
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ShowOrderInfo;
