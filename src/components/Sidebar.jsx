import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useUserAuthorization } from "../hooks/UserAuthorization.jsx";
import {MapIcon, CameraIcon, AccountIcon, LogoutIcon} from "../images/SidebarIcons.jsx"


const navItems = [
  { label: "Parkinzi", path: "/dashboard/parking", icon: <MapIcon /> },
  { label: "Kamere", path: "/dashboard/kamere", icon: <CameraIcon /> },
  { label: "Račun", path: "/dashboard/racun", icon: <AccountIcon />, disabled: true },
];

const Sidebar = () => {
  const { user, userLogout } = useUserAuthorization();
  const navigate = useNavigate();

  const handleLogout = () => {
    userLogout();
    navigate("/login");
  };

  return (
    <aside className="fixed top-0 left-0 h-screen w-60 bg-white shadow-lg flex flex-col justify-between z-50">
      <div>
        <div className="px-5 py-7">
          <h1 className="text-xl font-extrabold tracking-tight cursor-pointer">
            <span className="text-gray-700">Parking</span>
            <span className="text-blue-500 ml-1">AI</span>
          </h1>
          {user?.email && (
            <p className="text-xs text-gray-400 mt-2 truncate">{user.email}</p>
          )}
        </div>

        <div className="px-4 mb-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 px-2">
            Izbornik
          </span>
        </div>

        <nav className="flex flex-col gap-1 px-3">
          {navItems.map((item) =>
            item.disabled ? (
              <span
                key={item.path}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-300 cursor-not-allowed"
              >
                {item.icon}
                {item.label}
              </span>
            ) : (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-blue-50 text-blue-600 shadow-sm"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            )
          )}
        </nav>
      </div>

      <div className="px-3 pb-5">
        <div className="border-t border-gray-100 pt-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-500 transition-all duration-200 w-full"
          >
            <LogoutIcon />
            Odjava
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
