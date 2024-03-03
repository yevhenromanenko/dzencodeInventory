import React, {useEffect} from "react";

const SettingsPage = () => {

    useEffect(() => {
        document.title = "Настройки";
    }, []);

    return (
        <>
            <p>Тут можно добавить настройки</p>
        </>
    )
}

export default SettingsPage;
