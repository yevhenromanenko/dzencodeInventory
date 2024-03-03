import React, {useEffect, useState} from 'react';
import GroupItem from "../group-item/GroupItem";
import GetProductsFromServer from "../../../functions/get-products-from-server/GetProductsFromServer";
import GroupProductsByType from "../../../functions/group-products-by-type/GroupProductsByType";

function GroupsPage ({userId, loadingProduct, setLoadingProduct}) {
    const [updatedProducts, setUpdatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedGroups, setExpandedGroups] = useState(null);
    const [updatedGroups, setUpdatedGroups] = useState([]);

    useEffect(() => {
        document.title = "Группы";
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
               await GetProductsFromServer(userId, setUpdatedProducts, setLoadingProduct);
            } catch (error) {
                console.error('Error GetProductsFromServer:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [userId]);

    useEffect(() => {
        GroupProductsByType(updatedProducts, setUpdatedGroups);
    }, [updatedProducts]);

    return (
        <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
            <div className="container mx-auto px-6 py-8">
                <h3 className="text-gray-700 text-2xl font-medium">Группы / {updatedGroups.length > 0 ? updatedGroups.length : '0'}</h3>

                {loading ? (
                    <p>Загрузка...</p>
                ) : (
                    updatedGroups.map((group, index) => (
                        <GroupItem
                            key={index}
                            group={group}
                            expandedGroups={expandedGroups}
                            setExpandedGroups={setExpandedGroups}
                            updatedGroups={updatedGroups}
                            setUpdatedGroups={setUpdatedGroups}
                            loadingProduct={loadingProduct}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default GroupsPage;
