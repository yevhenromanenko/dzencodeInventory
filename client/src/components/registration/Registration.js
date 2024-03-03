import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {HOST_NAME} from "../../HOST_NAME";
import firstRightName from "../../functions/first-right-name/firstRightName";

const Registration = ({setUserName}) => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({
        id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
        username: '',
        password: ''
    });

    const {login} = useContext(AuthContext)

    const changeHandlerUser = (event) => {
        setForm({...form, [event.target.name]: event.target.value});
    }

    useEffect(() => {
        document.title = "Registration";
    }, []);

    const handleRegistration = async () => {

        try {
            const trimmedForm = {
                id: form.id,
                username: form.username.trim(),
                password: form.password.trim()
            };

            const response = await axios.post(`${HOST_NAME}/registration`,  {...trimmedForm}, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 201) {
                const loginResponse = await axios.post(`${HOST_NAME}/login`, {username: form.username, password: form.password},{
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (loginResponse.status === 200) {
                    login(loginResponse.data.token, loginResponse.data.userId, loginResponse.data.username, loginResponse.data.password);
                    const userObject = {
                        userId: loginResponse.data.userId,
                        userName: loginResponse.data.username,
                    };
                    localStorage.setItem('user', JSON.stringify(userObject));

                    if (loginResponse.data.redirectTo) {
                        navigate(loginResponse.data.redirectTo);
                    }

                    const formattedName = firstRightName(loginResponse.data.username);
                    setUserName(formattedName);

                    toast.success(`Регистрация прошла успешно! Добро пожаловать ${formattedName}`);

                } else {
                    console.error('Login after registration failed');
                }
            } else {
                console.error('Registration failed');
            }
        } catch (error) {
            if (error.response && error.response.status === 300) {
                toast.error('Пользователь с таким именем уже создан, попробуйте залогиниться!');
            } else {
                console.error('Unexpected error:', error.message);
            }
        }
    };

    return (
        <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-md shadow-md w-1/4">
            <h2 className="text-2xl font-semibold mb-4">Регистрация пользователя</h2>
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
                onClick={handleRegistration}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
                Register
            </button>

            <p className="mt-4 text-gray-600">
               <Link to="/" className="text-blue-500 hover:underline">Уже есть аккаунт?</Link>
            </p>
        </div>
    );
};

export default Registration;
