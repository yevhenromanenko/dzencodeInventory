import React from "react";

const MainPage = () => {
    return (
        <>
            <p>Тут можно добавить главную страницу и при входе сделать на нее переадресацию</p>
            <script>
                {document.title = "Главная"}
            </script>
        </>
    )
}

export default MainPage;
