import React, {useState} from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {HOST_NAME} from "../../../HOST_NAME";

const AddOrderModal = ({onClose, userId, setUpdatedOrders}) => {
    const [file, setFile] = useState(null);
    const [orderName, setOrderName] = useState('');
    const [orderDescription, setOrderDescription] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleAddOrder = async () => {
        if (!file) {
            toast.error("Please select a file");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("userId", userId);

            const response = await axios.post(`${HOST_NAME}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            let orderId;

            const newProducts = response.data.products.map((product) => ({
                userId: product.userId,
                id: product.id,
                serialNumber: product.serialNumber,
                isNew: product.isNew,
                status: product.status,
                name: product.name,
                photo: product.photo,
                title: product.title,
                type: product.type,
                specification: product.specification,
                guarantee: {
                    start: product.guarantee.start,
                    end: product.guarantee.end,
                },
                price: [
                    { value: product.price[0].value, symbol: 'USD', isDefault: 0 },
                    { value: product.price[1].value, symbol: 'UAH', isDefault: 1 },
                ],
                order: orderId = product.order,
                date: product.date,
            }));

            const newOrder = {
                userId: userId,
                id: orderId,
                title: orderName || `Order ${response.data.orderCount + 1}`,
                date: new Date().toISOString(),
                description: orderDescription,
                products: newProducts,
            };

            const res = await axios.post(`${HOST_NAME}/orders`, newOrder, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setUpdatedOrders(prevOrders => [...prevOrders, res.data]);
            toast.success("Приход успешно добавлен");
            onClose();
        } catch (error) {
            console.error("Error uploading file:", error);
            toast.error("Error uploading file");
        }
    };


    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-md w-[50%] h-[80%] overflow-y-auto">
                <div className="flex justify-between mb-4">
                    <h3 className="text-lg font-semibold">Добавить приход</h3>
                    <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
                        &times;
                    </button>
                </div>

                <label className="block">
                    <input className="w-full mt-1 p-2 border rounded"  type="text" placeholder="Название прихода" value={orderName} onChange={(e) => setOrderName(e.target.value)} /><br/>
                </label>
                <label className="block">
                    <textarea className="w-full mt-1 p-2 border rounded" placeholder="Описание прихода" value={orderDescription} onChange={(e) => setOrderDescription(e.target.value)} ></textarea><br/>
                </label>
                <label className="block">
                    <input className="w-full mt-1 p-2 border rounded" type="file" onChange={handleFileChange} accept=".xls, .xlsx" /><br/>
                </label>

                <button type="button" onClick={handleAddOrder} className="bg-green-500 text-white py-2 px-4 rounded-md mt-4">
                    Добавить приход
                </button>
            </div>
        </div>
    );
}

export default AddOrderModal;
