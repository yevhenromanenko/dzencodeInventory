import React, {useEffect, useState} from 'react';
import axios from 'axios';
import GetOrdersFromServer from "../../orders-content/get-orders-from-server/GetOrdersFromServer";
import {toast} from "react-toastify";
import {HOST_NAME} from "../../../HOST_NAME";

const AddProductModal = ({ onClose, onUpdateProducts, updatedProducts, userId, setLoading, loading}) => {

    const [orders, setOrders] = useState([]);
    const [formData, setFormData] = useState({
        serialNumber: '',
        isNew: '0',
        status: '0',
        name: '',
        photo: '',
        title: '',
        type: 'monitor',
        specification: '',
        guaranteeStart: '',
        guaranteeEnd: '',
        priceUSD: '',
        order: '1',
    });

    useEffect(() => {
        GetOrdersFromServer(userId, setOrders, setLoading);
    }, [userId, setLoading]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAddProduct = async () => {
        const newProduct = {
            userId: userId,
            id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
            serialNumber: formData.serialNumber,
            isNew: parseInt(formData.isNew, 10),
            status: parseInt(formData.status, 10),
            name: formData.name,
            photo: formData.photo,
            title: formData.title,
            type: formData.type,
            specification: formData.specification,
            guarantee: {
                start: formData.guaranteeStart,
                end: formData.guaranteeEnd,
            },
            price: [
                { value: parseFloat(formData.priceUSD), symbol: 'USD', isDefault: 0 },
                { value: parseFloat(formData.priceUSD) * 38, symbol: 'UAH', isDefault: 1 },
            ],
            order: parseInt(formData.order, 10),
            date: new Date().toISOString(),
        };

        try {
            const response = await axios.post(`${HOST_NAME}/products`,{...newProduct}, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const updated = [...updatedProducts, response.data];
            onUpdateProducts(updated);
            toast.success("Продукт успешно добавлен");
            onClose();
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-md w-[50%] h-[80%] overflow-y-auto">
                <div className="flex justify-between mb-4">
                    <h3 className="text-lg font-semibold">Добавить продукт</h3>
                    <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="space-y-4">
                    <label className="block">
                        <input type="text" name="serialNumber" value={formData.serialNumber} onChange={handleChange} className="w-full mt-1 p-2 border rounded" placeholder={'Serial Number'}/>
                    </label>
                    <label className="block">
                        <select name="isNew" value={formData.isNew} onChange={handleChange} className="w-full mt-1 p-2 border rounded">
                            <option value="0">Б/У</option>
                            <option value="1">Новый</option>
                        </select>
                    </label>
                    <label className="block">
                        <select name="status" value={formData.status} onChange={handleChange} className="w-full mt-1 p-2 border rounded">
                            <option value="0">Свободен</option>
                            <option value="1">В ремонте</option>
                        </select>
                    </label>
                    <label className="block">
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full mt-1 p-2 border rounded" placeholder={'Product name'}/>
                    </label>
                    <label className="block">
                        <input type="text" name="photo" value={formData.photo} onChange={handleChange} className="w-full mt-1 p-2 border rounded" placeholder={'Photo URL, в будущем можно изменить на добавление фото для продукта'}/>
                    </label>
                    <label className="block">
                        <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full mt-1 p-2 border rounded" placeholder={'Title'}/>
                    </label>
                    <label className="block">
                        <select name="type" value={formData.type} onChange={handleChange} className="w-full mt-1 p-2 border rounded">
                            <option value="monitor">Monitor</option>
                            <option value="phone">Phone</option>
                            <option value="laptop">Laptop</option>
                            <option value="computer">Computer</option>
                        </select>
                    </label>
                    <label className="block">
                        <input type="text" name="specification" value={formData.specification} onChange={handleChange} className="w-full mt-1 p-2 border rounded" placeholder={'Specification'}/>
                    </label>
                    <label className="block">
                        Начало гарантии:
                        <input type="date" name="guaranteeStart" value={formData.guaranteeStart} onChange={handleChange} className="w-full mt-1 p-2 border rounded" />
                    </label>
                    <label className="block">
                        Конец гарантии:
                        <input type="date" name="guaranteeEnd" value={formData.guaranteeEnd} onChange={handleChange} className="w-full mt-1 p-2 border rounded" />
                    </label>
                    <label className="block">
                        Цена (USD):
                        <input type="number" name="priceUSD" value={formData.priceUSD} onChange={handleChange} className="w-full mt-1 p-2 border rounded" />
                    </label>
                    <label className="block">
                        Приход:
                        <select name="order" value={formData.order} onChange={handleChange} className="w-full mt-1 p-2 border rounded">
                            {loading ? (
                                <option value="">Загрузка...</option>
                            ) : orders.length > 0 ? (
                                orders.map((order) => (
                                    <option key={order._id} value={order.id}>
                                        {order.title}
                                    </option>
                                ))
                            ) : (
                                <option value="">Приход не найден, добавьте сначала приход, чтоб добавить продукт в него.</option>
                            )}
                        </select>
                    </label>
                </div>
                <button type="button" onClick={handleAddProduct} className="bg-green-500 text-white py-2 px-4 rounded-md mt-4">
                    Добавить продукт
                </button>
            </div>
        </div>
    );
};

export default AddProductModal;
