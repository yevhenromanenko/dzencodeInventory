import React from 'react';

const UsersPage = ({users, activeUserIds}) => {

    const getUserStatusColor = (user) => {
        return activeUserIds.includes(user.id) ? 'bg-green-500' : 'bg-red-500';
    };

    return (
        <>
            {users.length > 0 ? (
            users.map(user => (

                    <div key={user.id}  className="flex items-center p-6 bg-white shadow-lg rounded-lg my-2 overflow-x-auto m-5">

                        <div className="flex-none w-6 flex flex-col mr-4 items-center">
                            <div className={`w-4 h-4 rounded-full mr-4 ${getUserStatusColor(user)}`}></div>
                        </div>

                        <div className="flex-none w-14 flex flex-col mr-4">
                            <img
                                src="https://i.pinimg.com/originals/64/c0/7c/64c07cd56fee2c3b0423168c5b10e58c.png"
                                alt="User Avatar"
                                className="w-12 h-12 object-cover rounded-full"
                            />
                        </div>

                        <div className="flex-none w-46 flex flex-col mr-4">
                            <span className="text-lg font-medium name-product">{user.username}</span>
                            <span className="text-sm text-gray-600">ID: {user.id}</span>
                        </div>
                    </div>
            ))
            ) : (
            <p>Загрузка...</p>
            )}
        </>
    );
};

export default UsersPage;
