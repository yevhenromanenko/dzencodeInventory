import React from 'react';
import calculateTotal from "../../../functions/calculate-total/сalculateTotal";

const DeleteConfirmationModal = ({ onDelete, onCancel, order }) => {
    return (
        <div className="fixed inset-0 z-60 overflow-auto bg-black bg-opacity-60 flex items-center justify-center">
            <div className="bg-white p-8 rounded-md w-[50%] h-[30%] overflow-y-auto">
                <div className="flex justify-between items-center mb-4 border-b-2 border-gray-300 pb-2">
                    <h2 className="text-lg font-semibold">Вы действительно хотите удалить этот приход?</h2>
                    <button className="text-gray-500 hover:text-gray-700" onClick={onCancel}>
                        &times;
                    </button>
                </div>

                <div className={'flex flex-nowrap items-center justify-center text-lg font-semibold border-b-2 border-gray-300 py-2'}>
                    <div className="flex-none w-64 flex flex-col mr-4">
                        <strong>{order.title}</strong>
                        <span className="text-sm text-gray-600">id: {order.id}</span>
                    </div>

                    <div className="flex-none w-32 flex flex-col mr-4">
                        <span className="text-2xl font-bold">{order.products && order.products.length > 0 ? order.products.length : '0'}</span>
                        <span className="text-sm">продуктов</span>
                    </div>

                    <div className="flex-none w-32 flex flex-col mr-4">
                        <span className="text-2xl font-bold">{calculateTotal(order).totalUSD} $</span>
                        <span className="text-sm">{calculateTotal(order).totalUAH} UAH</span>
                    </div>
                </div>


                <div className="flex justify-end mt-4">
                    <button type="button" onClick={onDelete} className="bg-green-500 text-white py-2 px-4 rounded-md ml-2">
                        Удалить
                    </button>
                    <button type="button" onClick={onCancel} className="bg-green-500 text-white py-2 px-4 rounded-md ml-2">
                        Отмена
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
