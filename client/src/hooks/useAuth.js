import {useState, useEffect, useCallback} from "react";
import axios from "axios";

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isReady, setIsReady] = useState(false);

    const login = useCallback( (jwtToken, id) => {
        setToken(jwtToken)
        setUserId(id)

        localStorage.setItem('userData', JSON.stringify({
            userId: id,
            token: jwtToken
        }))

    }, [])

    const logout =  () => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem('userData');
        window.location.href = 'http://localhost:3000/';
    }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('userData'));

        axios.get("/")
            .then(response => {
                if (data && data.token && response.status === 200) {
                    login(data.token, data.userId);
                } else {
                    console.log("Пользователь не залогинен!");
                }
            })
            .catch(error => {
                console.log("Login check error:", error);
            })

        setIsReady(true)

    }, [login]);

    return {login, logout, token, userId, isReady }
}
