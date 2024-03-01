import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import axios from "axios";
import socketIOClient from "socket.io-client";
import {AuthContext} from "./context/AuthContext";

import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import {HOST_NAME} from "./HOST_NAME";
import {useAuth} from "./hooks/useAuth";
import Registration from "./components/registration/Registration";
import Login from "./components/login/Login";
import Header from "./components/header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import useRoutes from "./Routes";

function App() {
    const [users, setUsers] = useState([]);
    const [activeUserIds, setActiveUserIds] = useState([]);
    const [activeSessions, setActiveSessions] = useState(0);
    const [loadingProduct, setLoadingProduct] = useState(false);
    const [userName, setUserName] = useState('User Name');

    const { login, logout, token, isReady, userId, socket } = useAuth();
    const isLogin = !!token;

    const routes = useRoutes(userId, users, activeUserIds, setLoadingProduct, loadingProduct);

    useEffect(() => {
        const storedUserString = localStorage.getItem('user');

        if (storedUserString) {
            const storedUser = JSON.parse(storedUserString);

            if (storedUser.userId === userId) {
                const maxNameLength = 17;

                const truncatedName = storedUser.userName.length > maxNameLength
                    ? storedUser.userName.slice(0, maxNameLength) + '...'
                    : storedUser.userName;
                let firstRightName = truncatedName[0].toUpperCase() + truncatedName.slice(1);

                setUserName(`${firstRightName}`);
            }
        }

        axios.get(`${HOST_NAME}/users`)
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });

        const socket = socketIOClient("http://localhost:3003", {
            transports: ["websocket", "polling", "flashsocket"],
            query: { userId },
        });

        socket.on('connect', () => {
            console.log('WebSocket connected successfully!');
        });

        socket.on('disconnect', () => {
            console.log('WebSocket disconnected!');
        });

        socket.on('activeUserIds', (ids) => {
            setActiveUserIds(ids);
            setActiveSessions(ids.length);
        });

        return () => {
            console.log('Cleaning up useEffect');
            socket.disconnect();
        };
    }, [userId]);


    return (
        <AuthContext.Provider value={{ login, logout, token, isReady, userId, isLogin, socket }}>
            <div className="min-h-screen bg-gray-100">
                <Router>
                    <div className="flex">
                        {isLogin && <Sidebar userName={userName}/>}
                        <div className="flex-1 flex flex-col overflow-hidden">
                            {isLogin && <Header userId={userId} activeSessions={activeSessions} setLoadingProduct={setLoadingProduct} loadingProduct={loadingProduct}/>}

                            <Routes>
                                {isLogin ? (
                                    <>
                                        {routes}
                                    </>
                                ) : (
                                    <>
                                        <Route path="/registration" element={<Registration setUserName={setUserName}/>} />
                                        <Route path="/" element={<Login setUserName={setUserName}/>} />
                                    </>
                                )}
                            </Routes>
                        </div>
                    </div>
                </Router>
                <ToastContainer />
            </div>
        </AuthContext.Provider>
    );
}
export default App;
