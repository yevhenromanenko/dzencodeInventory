import React, {useState} from "react";
import { Route } from 'react-router-dom';
import ProductsPage from "./components/product-content/products-page/ProductsPage";
import GroupsPage from "./components/group-content/groups-page/GroupsPage";
import OrdersPage from "./components/orders-content/order-page/OrdersPage";
import MainPage from "./components/main-page/MainPage";
import UsersPage from "./components/users-content/UserPage";
import SettingsPage from "./components/settings/settings-page/SettingsPage";
import SettingsProfilePage from "./components/settings/settings-profile-page/SettingsProfilePage";

const useRoutes = (userId, users, activeUserIds, setLoadingProduct, loadingProduct) => {
        const [loading, setLoading] = useState(true);
        const [updatedOrders, setUpdatedOrders] = useState([]);

        return (
            <>
                <Route path="/" element={<MainPage userId={userId}/>}/>
                <Route path="/arrival" element={<OrdersPage userId={userId} loading={loading} setLoading={setLoading} setUpdatedOrders={setUpdatedOrders} updatedOrders={updatedOrders}/>}/>
                <Route path="/groups" element={<GroupsPage userId={userId} loadingProduct={loadingProduct} setLoadingProduct={setLoadingProduct}/>}/>
                <Route
                    path="/products"
                       element={<ProductsPage userId={userId}
                                              setLoading={setLoading}
                                              loading={loading}
                                              setLoadingProduct={setLoadingProduct}
                                              loadingProduct={loadingProduct}
                                              orders={updatedOrders}
                       />
                }
                />
                <Route path="/users" element={<UsersPage users={users} activeUserIds={activeUserIds}/>}/>
                <Route path="/settings" element={<SettingsPage />}/>
                <Route path="/settings-profile" element={<SettingsProfilePage />}/>
            </>
        );
}

export default useRoutes;

