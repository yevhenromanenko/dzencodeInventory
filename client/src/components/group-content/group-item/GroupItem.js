import React from "react";

import ShowProductsInfo from "../../product-content/show-products-info/ShowProductsInfo";
import getEnding from "../../../functions/get-ending/getEnding";

import './GroupItem.css'

const GroupItem = ({group, index, expandedGroups, setExpandedGroups, updatedGroups, setUpdatedGroups, loadingProduct}) => {
    if (!group) {
        return null;
    }

    const toggleGroup = (type) => {
        setExpandedGroups(prev => (prev === type ? null : type));
    };

    return (
        <>
            <div key={index}
                 className={`group-product-container ${
                     expandedGroups ? "expanded" : "collapsed"
                 }`}
                 style={{ display: 'flex', width: '100%' }}
            >
                <div className="group-container " style={{ width: expandedGroups ? '30%' : '100%', marginRight: expandedGroups ? '5%' : 0 }}>
                    <div className="flex items-center justify-between py-2 cursor-pointer p-6 bg-white shadow-lg rounded-lg my-2" onClick={() => toggleGroup(group.type)}>

                        <div className="flex-none w-12 flex flex-col mr-4">
                            <h4 className="text-gray-700 text-xl font-medium">{group.type}</h4>
                        </div>

                        <div className="flex-none w-24 flex flex-col mr-4">
                            <span className="text-lg font-medium name-product">{group.products.length} {getEnding(group.products.length)}</span>
                        </div>
                        <button className="bg-blue-500 text-white px-2 py-1 rounded-full">
                            {expandedGroups === group.type ? (
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

                {loadingProduct ? (
                        <p>Загрузка...</p>
                    ) : (
                        expandedGroups === group.type && (
                            <ShowProductsInfo
                                order={group}
                                setOrder={(updatedGroup) => {
                                    const index = updatedGroups.findIndex((o) => o.id === group.id);
                                    const newOrders = [...updatedGroups];
                                    newOrders[index] = updatedGroup;
                                    setUpdatedGroups(newOrders);
                                }}
                            />
                ))}

            </div>
        </>
    )
}

export default GroupItem;
