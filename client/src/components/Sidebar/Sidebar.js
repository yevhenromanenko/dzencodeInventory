import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Sidebar.css';

const Sidebar = ({userName}) => {

    const location = useLocation();
    const [activeTab, setActiveTab] = useState('');

    useEffect(() => {
        const path = location.pathname.split('/')[1];
        setActiveTab(path || '');
    }, [location.pathname]);

    return (
        <>
            <div className="w-64 h-screen bg-white shadow-lg">
                <div className="flex items-center justify-center h-20 shadow-md" style={{height: '90px'}}>
                    <h1 className="text-lg font-semibold text-green-600 uppercase">Inventory</h1>
                </div>
                <div className="px-6 py-4">
                    <div className="flex items-center space-x-3 cursor-pointer">

                        <div className="flex items-center space-x-3 cursor-pointer relative">
                            <img className="w-12 h-12 rounded-full" src="https://i.pinimg.com/736x/51/e0/d5/51e0d5aa27808ce689e3dd5a5cd7685a.jpg" alt={'profile'} />
                            <Link to="/settings-profile" className="absolute top-6 right-0 m-2">
                                <i className="fas fa-cog text-gray-500"></i>
                            </Link>
                        </div>

                        <div>
                            <h2 className="text-sm font-semibold">{userName}</h2>
                            <span className="flex items-center space-x-1 text-xs text-gray-600">
                                <i className="fas fa-circle text-green-400"></i>
                                <span>Online</span>
                            </span>
                        </div>

                    </div>
                </div>
                <div className="text-sm">
                    <Link to="/arrival" className={`block px-6 py-3 ${activeTab === 'arrival' ? 'bg-green-500 text-white' : 'hover:bg-gray-200'}`}>приход</Link>
                    <Link to="/groups" className={`block px-6 py-3 ${activeTab === 'groups' ? 'bg-green-500 text-white' : 'hover:bg-gray-200'}`}>группы</Link>
                    <Link to="/products" className={`block px-6 py-3 ${activeTab === 'products' ? 'bg-green-500 text-white' : 'hover:bg-gray-200'}`}>продукты</Link>
                    <Link to="/users" className={`block px-6 py-3 ${activeTab === 'users' ? 'bg-green-500 text-white' : 'hover:bg-gray-200'}`}>пользователи</Link>
                    <Link to="/settings" className={`block px-6 py-3 ${activeTab === 'settings' ? 'bg-green-500 text-white' : 'hover:bg-gray-200'}`}>настройки</Link>
                </div>
            </div>
        </>
    )
}

export default Sidebar;
