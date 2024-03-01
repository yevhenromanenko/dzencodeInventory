import React, {useContext, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import {HOST_NAME} from "../../HOST_NAME";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({setUserName}) => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({
        username: '',
        password: ''
    });

    const {login} = useContext(AuthContext)

    const changeHandlerUser = (event) => {
        setForm({...form, [event.target.name]: event.target.value});
    }

    const handleLogin = async () => {
        try {
            const trimmedForm = {
                username: form.username.trim(),
                password: form.password.trim()
            };

            const response = await axios.post(`${HOST_NAME}/login`, { ...trimmedForm }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                login(response.data.token, response.data.userId, response.data.username, response.data.password);
                navigate(response.data.redirectTo);
                const userObject = {
                    userId: response.data.userId,
                    userName: response.data.username,
                };
                localStorage.setItem('user', JSON.stringify(userObject));

                let firstRightName = response.data.username[0].toUpperCase() + response.data.username.slice(1);
                setUserName(`${firstRightName}`)
                toast.success(`Добро пожаловать ${response.data.username.charAt(0).toUpperCase() + response.data.username.slice(1)}`);

            } else {
                console.error('Login failed');
            }

        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error('Пользователь не найден. Зарегистрируйтесь сначала.');
            } else {
                console.error('Unexpected error:', error.message);
            }
        }
    };

    return (
        <div className="mx-auto my-8 p-6 bg-white rounded-md shadow-md w-1/4">
            <h2 className="text-2xl font-semibold mb-4">Логин пользователя</h2>
            <input
                type="text"
                placeholder="Ваше имя"
                name='username'
                onChange={changeHandlerUser}
                className="w-full mb-3 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            <div className="relative mb-3 min-w-full">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Пароль"
                    name='password'
                    onChange={changeHandlerUser}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
                <span
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 text-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 text-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    )}
                </span>
            </div>
            <button
                onClick={handleLogin}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
                Login
            </button>

            <p className="mt-4 text-gray-600">
                <Link to="/registration" className="text-blue-500 hover:underline">Нет аккаунта?</Link>
            </p>
            <script>
                {document.title = "Login"}
            </script>
            <ToastContainer />
        </div>
    );
};

export default Login;
