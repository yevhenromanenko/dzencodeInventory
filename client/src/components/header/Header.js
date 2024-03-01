import React, {useContext, useEffect, useState} from "react";
import GetProductsFromServer from "../../functions/get-products-from-server/GetProductsFromServer";
import {AuthContext} from "../../context/AuthContext";

function Header({userId, activeSessions, setLoadingProduct, loadingProduct}) {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showPreview, setShowPreview] = useState(false);
    const [highlightedProduct, setHighlightedProduct] = useState(null);
    const [products, setProducts] = useState([]);

    const {logout} = useContext(AuthContext);

    useEffect(() => {
        GetProductsFromServer(userId, setProducts, setLoadingProduct);
    }, [userId]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const searchProducts = () => {
            const results = products.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSearchResults(results);
            setShowPreview(searchQuery.length > 0);
        };

        searchProducts();
    }, [searchQuery, products, userId]);

    const formattedDate = currentDateTime.toLocaleDateString();
    const formattedTime = currentDateTime.toLocaleTimeString();


    const handleMouseEnter = (productId) => {
        setHighlightedProduct(productId);
    };

    const handleMouseLeave = () => {
        setHighlightedProduct(null);
    };


    return (
        <div className="flex justify-between items-center p-6 bg-white shadow-md">
            <div className="flex space-x-4">
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <i className="fas fa-search text-gray-600"></i>
                    </span>
                    <input
                        type="search"
                        className="py-2 pl-10 pr-4 border rounded-md focus:outline-none"
                        placeholder="Поиск"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    {showPreview && (
                        <div className="absolute mt-2 bg-white border rounded-md shadow-md">
                            {loadingProduct ? (
                                <div className="p-2">Загрузка...</div>
                            ) : searchResults.length > 0 ? (
                                <ul>
                                    {searchResults.map((result) => (
                                        <li
                                            key={result.id}  // Ensure that the key is unique for each item
                                            onMouseEnter={() => handleMouseEnter(result.id)}
                                            onMouseLeave={handleMouseLeave}
                                            className={highlightedProduct === result.id ? "bg-gray-200" : ""}
                                        >
                                            <a href={`/products/${result.id}`}>
                                                {result.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="p-2">Продуктов не найдено...</div>
                            )}
                        </div>
                    )}

                </div>
            </div>
            <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Active Sessions: {activeSessions}</span>
                <span className="text-sm text-gray-600">Today</span>
                <span className="text-sm font-semibold text-gray-600">{formattedDate}</span>
                <span className="text-sm text-gray-600">{formattedTime}</span>
                <button
                    className="text-sm text-gray-600 cursor-pointer"
                    onClick={logout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Header;
