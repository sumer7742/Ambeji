import { useState } from "react";
import { NavLink } from "react-router-dom";
import Navbardata from "../constant/navbardata";

const Sidebar: React.FC = () => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleCategory = (name: string) => {
    setOpenCategory(openCategory === name ? null : name);
  };

  return (
    <div className="w-64 h-screen border-r bg-white p-4 overflow-y-auto">
      <h2 className="font-bold text-lg mb-4">Category</h2>
      <ul className="space-y-2">
        {Navbardata.map((cat) => (
          <li key={cat.name}>
            <div
              className="flex justify-betw.een items-center cursor-pointer font-semibold hover:text-blue-600"
              onClick={() => toggleCategory(cat.name)}
            >
              <NavLink
                to={cat.path}
                className={({ isActive }) =>
                  `px-1 ${
                    isActive
                      ? "text-blue-600 font-bold"
                      : "hover:text-blue-600"
                  }`
                }
              >
                {cat.name}
              </NavLink>
              {cat.Children && cat.Children.length > 0 && (
                <span>{openCategory === cat.name ? "−" : ""}</span>
              )}
            </div>
            {openCategory === cat.name &&
              cat.Children &&
              cat.Children.length > 0 && (
                <ul className="ml-4 mt-2 space-y-1">
                  {cat.Children.map((sub) => (
                    <li key={sub.name}>
                      <NavLink
                        to={sub.path}
                        className={({ isActive }) =>
                          `block px-2 py-1 rounded text-sm ${
                            isActive
                              ? "bg-blue-500 text-white font-semibold"
                              : "text-gray-600 hover:text-black"
                          }`
                        }
                      >
                        {sub.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
