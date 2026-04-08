import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../constant/UserProvider";
import {
  User,
  LogIn,
  UserPlus,
  Heart,
  // Store,
  LogOut,
  Package,
  CircleHelp,
  Settings,
} from "lucide-react";
const AccountDropdown: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useUser();
  const handleToggle = () => {
    setOpen((prev) => !prev);
    setFocusedIndex(-1);
  };
  const handleLogout = async (): Promise<void> => {
    setOpen(false);
    await logout(); // runs async logout logic
  };
  const getMenuItems = useCallback((): HTMLElement[] => {
    if (!dropdownRef.current) return [];
    return Array.from(
      dropdownRef.current.querySelectorAll<HTMLElement>(
        '[data-dropdown-item="true"]'
      )
    );
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
        setFocusedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const items = getMenuItems();
      if (items.length === 0) return;

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setFocusedIndex((prev) => {
          const next = prev + 1 >= items.length ? 0 : prev + 1;
          items[next]?.focus();
          return next;
        });
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setFocusedIndex((prev) => {
          const next = prev - 1 < 0 ? items.length - 1 : prev - 1;
          items[next]?.focus();
          return next;
        });
      } else if (event.key === "Escape") {
        setOpen(false);
        setFocusedIndex(-1);
      } else if (event.key === "Enter" && focusedIndex >= 0) {
        // Trigger click on the focused element
        items[focusedIndex]?.click();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, focusedIndex, getMenuItems]);

  return (
    <div className="relative z-50" ref={dropdownRef}>
      {/* Account Icon */}
      <button
        tabIndex={0}
        onClick={handleToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleToggle();
        }}
        className="hidden md:flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors"
      >
        <Settings className="w-6 h-6  text-cyan-50" />
        <svg
        color="white"
          width="16"
          height="16"
          fill="currentColor"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M4 6l4 4 4-4 " />
        </svg>
      </button>
      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-1 w-48 bg-white shadow-lg rounded-xl z-50 border border-gray-200">
          <div className="flex flex-col text-sm divide-y divide-gray-100">
            <div className="px-4 py-2 text-gray-700 font-medium">
              Welcome{user?.fullName ? `, ${user.fullName.charAt(0).toUpperCase() + user.fullName.slice(1)}` : "!"}
            </div>
            {!user ? (
              <>
                <Link
                  to="/login"
                  data-dropdown-item="true"
                  tabIndex={0}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Link>

                <Link
                  to="/signup"
                  data-dropdown-item="true"
                  tabIndex={0}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </Link>
                <Link
                  to="/contactus"
                  className="hidden md:flex items-center gap-2 px-4 py-2 text-sm hover:text-pink-600"
                >
                  <CircleHelp className="w-5 h-5" />
                  Help
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/settings"
                  data-dropdown-item="true"
                  tabIndex={0}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <User className="w-4 h-4" />
                  User Profile
                </Link>
                <Link
                  to="/orders"
                  data-dropdown-item="true"
                  tabIndex={0}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <Package className="w-4 h-4" />
                  Orders
                </Link>

                <Link
                  to="/wishlist"
                  data-dropdown-item="true"
                  tabIndex={0}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition-colors md:hidden"
                  onClick={() => setOpen(false)}
                >
                  <Heart className="w-4 h-4" />
                  Wishlist
                </Link>


                {/* <Link
                  to="https://seller.unibcomp.in/"
                  data-dropdown-item="true"
                  tabIndex={0}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition-colors sm:hidden"
                  onClick={() => setOpen(false)}
                >
                  <Store className="w-4 h-4" />
                  Become a Seller
                </Link> */}
                <Link
                  to="/contactus"
                  data-dropdown-item="true"
                  tabIndex={0}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <CircleHelp className="w-4 h-4" />
                  Help
                </Link>

                <button
                  data-dropdown-item="true"
                  tabIndex={0}
                  className="flex items-center gap-2 px-4 py-2 text-left text-red-600 hover:bg-gray-50 transition-colors"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 text-red-600" />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDropdown;
