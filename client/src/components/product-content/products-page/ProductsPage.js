import React, {useEffect, useState} from "react";
import ProductItem from "../product-item/ProductItem";
import AddProductModal from "../add-product/AddProductModal";
import GetProductsFromServer from "../../../functions/get-products-from-server/GetProductsFromServer";

function ProductsPage({userId, setLoading, loading, setLoadingProduct, loadingProduct, orders}) {

    const [showModal, setShowModal] = useState(false);
    const [updatedProducts, setUpdatedProducts] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const [typeFilter, setTypeFilter] = useState("");
    const [isNewFilter, setIsNewFilter] = useState("");

    useEffect(() => {
        GetProductsFromServer(userId, setUpdatedProducts, setLoadingProduct);
    }, [userId]);

    useEffect(() => {
        document.title = "Продукты";
    }, []);

    const handleUpdateProducts = (newProducts) => {
        setUpdatedProducts(newProducts);
        setShowModal(false);
    };

    const handleAddProductClick = () => {
        setShowModal(true);
    };

    const filteredProducts = updatedProducts.filter((product) => {
        const typeMatch = !typeFilter || product.type === typeFilter;
        const isNewMatch = !isNewFilter || (product.isNew === "1" && isNewFilter === "Новый") || (product.isNew === "0" && isNewFilter === "Б/У");

        return typeMatch && isNewMatch;
    });

    return (

        <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
            <div className="container mx-auto px-6 py-8">
                <h3 className="text-gray-700 text-2xl font-medium">Продукты / {filteredProducts.length > 0 ? filteredProducts.length : '0'}</h3>

                <div className="flex items-center">
                    <button className="text-white bg-green-500 focus:outline-none rounded-full py-1 px-3" onClick={handleAddProductClick}>
                        <i className="fas fa-plus"></i>
                    </button>
                    <span className="ml-2 text-xs font-bold uppercase">Добавить продукт</span>
                </div>

                <div className="mt-4">
                    <label className="text-gray-600 mr-2">Тип:</label>
                    <select className="border p-1" onChange={(e) => setTypeFilter(e.target.value)}>
                        <option value="">Все</option>
                        <option value="monitor">Монитор</option>
                        <option value="phone">Телефон</option>
                        <option value="laptop">Ноутбук</option>
                        <option value="computer">Компьютер</option>
                    </select>

                    <label className="text-gray-600 ml-4 mr-2">Состояние:</label>
                    <select className="border p-1" onChange={(e) => setIsNewFilter(e.target.value)}>
                        <option value="">Все</option>
                        <option value="Новый">Новый</option>
                        <option value="Б/У">Б/У</option>
                    </select>
                </div>

                <div>
                    {loadingProduct ? (
                        <p>Загрузка продуктов...</p>
                    ) : filteredProducts.length > 0 ? (
                        filteredProducts.map((product, index) => (
                            <ProductItem
                                key={index}
                                product={product}
                                onUpdateProducts={handleUpdateProducts}
                                isDeleting={isDeleting}
                                setIsDeleting={setIsDeleting}
                                updatedProducts={updatedProducts}
                                orders={orders}
                            />
                        ))
                    ) : (
                        <p>Продукты не найден</p>
                    )}
                </div>

                {showModal && (
                    <AddProductModal
                        onClose={() => setShowModal(false)}
                        onUpdateProducts={handleUpdateProducts}
                        updatedProducts={updatedProducts}
                        userId={userId}
                        setLoading={setLoading}
                        loading={loading}
                    />
                )}
            </div>
        </div>
    );
}

export default ProductsPage;
