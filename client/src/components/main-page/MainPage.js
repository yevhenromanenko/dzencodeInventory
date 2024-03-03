import React, {useEffect} from "react";

const MainPage = () => {

    useEffect(() => {
        document.title = "Главная";
    }, []);

    return (
        <>
            <p>Тут можно добавить главную страницу и при входе сделать на нее переадресацию</p>
        </>
    )
}

export default MainPage;
