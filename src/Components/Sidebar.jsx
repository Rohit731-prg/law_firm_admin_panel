import { sidebarElements } from '../Utils/sidebarElements'
import useAdminStore from '../Store/AdminStore';
import { useNavigate, useLocation } from 'react-router-dom';

function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation(); // get current URL
    const admin = useAdminStore((state) => state.admin);

    const changeRoute = (path) => {
        navigate(path);
    }

    const handelLogout = async () => {
        await useAdminStore.getState().logout();
        localStorage.removeItem("auth");
        navigate("/");
    }

    return (
        <aside className="px-6 py-6 min-h-screen w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col justify-between">
            
            {/* Admin Profile */}
            <section className="flex items-center gap-4 mb-8 border-b-2 border-gray-200 pb-3">
                <img 
                    src={admin?.image}
                    alt={admin?.name}
                    className="w-16 h-16 rounded-full object-cover border border-gray-300"
                />
                <div>
                    <p className="text-gray-800 font-semibold">{admin?.name}</p>
                    <p className="text-gray-500 text-sm">{admin?.role}</p>
                </div>
            </section>

            {/* Sidebar Links */}
            <section className="flex flex-col gap-1 flex-grow">
                {sidebarElements.map((ele) => {
                    const isActive = location.pathname === ele.path; // check if current path matches
                    return (
                        <button 
                            key={ele.id}
                            onClick={() => changeRoute(ele?.path)}
                            className={`
                                text-left px-4 py-2 rounded-md transition-all
                                ${isActive 
                                    ? "bg-blue-600 text-white font-semibold" 
                                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                                }
                            `}
                        >
                            {ele?.name}
                        </button>
                    )
                })}
            </section>
            
            {/* Logout */}
            <section className="pt-6 border-t border-gray-200">
                <button 
                onClick={() => handelLogout()}
                className="w-full px-4 py-2 text-left rounded-md bg-red-50 text-red-600 hover:bg-red-100 active:bg-red-200 transition-colors">
                    Logout
                </button>
            </section>
        </aside>
    )
}

export default Sidebar;
