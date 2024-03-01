import React, {useEffect, useState} from "react";
import ProductItem from "../product-item/ProductItem";
import AddProductModal from "../add-product/AddProductModal";
import GetProductsFromServer from "../../../functions/get-products-from-server/GetProductsFromServer";

function ProductsPage({userId, setLoading, loading, setLoadingProduct, loadingProduct, orders}) {

    const [showModal, setShowModal] = useState(false);
    const [updatedProducts, setUpdatedProducts] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        GetProductsFromServer(userId, setUpdatedProducts, setLoadingProduct);
    }, [userId]);

    const handleUpdateProducts = (newProducts) => {
        setUpdatedProducts(newProducts);
        setShowModal(false);
    };

    const handleAddProductClick = () => {
        setShowModal(true);
    };

    return (

        <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
            <div className="container mx-auto px-6 py-8">
                <h3 className="text-gray-700 text-2xl font-medium">Продукты / {updatedProducts.length > 0 ? updatedProducts.length : '0'}</h3>

                <div className="flex items-center">
                    <button className="text-white bg-green-500 focus:outline-none rounded-full py-1 px-3" onClick={handleAddProductClick}>
                        <i className="fas fa-plus"></i>
                    </button>
                    <span className="ml-2 text-xs font-bold uppercase">Добавить продукт</span>
                </div>

                <div>
                    {loadingProduct ? (
                        <p>Загрузка продуктов...</p>
                    ) : updatedProducts.length > 0 ? (
                        updatedProducts.map((product, index) => (
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
            <script>
                {document.title = "Продукты"}
            </script>
        </div>
    );
}

export default ProductsPage;
