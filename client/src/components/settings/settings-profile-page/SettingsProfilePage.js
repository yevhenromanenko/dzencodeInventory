import React, {useEffect} from "react";

const SettingsProfilePage = () => {

    useEffect(() => {
        document.title = "Настройки профиля";
    }, []);

    return (
        <>
            <p>Тут можно добавить настройки профиля</p>
        </>
    )
}

export default SettingsProfilePage;
