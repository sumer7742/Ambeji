import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "../constant/UserProvider";
import AccountDropdown from "./AccountDropdown";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useCart } from "../hooks/useCart";
import { getToken } from "../utils/token";
import { useNavbar, type NavbarResponse } from "../hooks/useNavbar";
import SearchProduct from "./Search";
import LocationModel from "../screens/LocationModel";
import { usePincode } from "../hooks/usePincode";
import { ChevronDown, ChevronUp, CircleHelp, Heart, LogIn, LogOut, MapPin, Menu, Package, ShoppingCart, User, UserPlus, X } from "lucide-react";
import { Ambeji } from "../assets";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "mr", label: "मराठी" },
  { code: "ta", label: "தமிழ்" },
  { code: "te", label: "తెలుగు" },
  { code: "bn", label: "বাংলা" },
  { code: "gu", label: "ગુજરાતી" },
  { code: "kn", label: "ಕನ್ನಡ" },
  { code: "ml", label: "മലയാളം" },
  { code: "pa", label: "ਪੰਜਾਬੀ" },
  { code: "ur", label: "اردو" },
];

const changeLanguage = (lang: string) => {
  document.cookie = `googtrans=/en/${lang}; path=/;`;

  let attempts = 0;
  const interval = setInterval(() => {
    const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event("change"));
      clearInterval(interval);
    }
    if (++attempts > 10) clearInterval(interval);
  }, 300);
};

// const styles = {
//   nav: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "12px 20px",
//     background: "#0f172a",
//     color: "#fff",
//   },
//   select: {
//     padding: "6px 8px",
//     borderRadius: "4px",
//     border: "none",
//   },
// };

const Navbar: React.FC = () => {
  const { data: navItems, isLoading } = useNavbar();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data } = useCart({ type: "through_cart" });
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [pincode, setPincode] = useState("");
  const [autoDetected, setAutoDetected] = useState(false);
  const { data: pincodeData } = usePincode(pincode);
  const [language, setLanguage] = useState("en");
  const postOffice = pincodeData?.[0]?.PostOffice?.[0];
  const city = postOffice?.District;
  const stateName = postOffice?.State;
  useEffect(() => {
    if (pincode && city && stateName) {
      localStorage.setItem(
        "user_location",
        JSON.stringify({ pincode, city, state: stateName })
      );
    }
  }, [pincode, city, stateName]);

  useEffect(() => {
    const savedLang = localStorage.getItem("language");
    if (!savedLang || savedLang === "en") {
      localStorage.removeItem("language");
      return;
    }
    setLanguage(savedLang);
    changeLanguage(savedLang);
  }, []);

  const handleChange = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    changeLanguage(lang);
  };

  const items = useSelector((state: RootState) => state.cart.items);
  const totalItems = !getToken()
    ? items.reduce((sum: number, item: any) => sum + item.quantity, 0)
    : data?.total_carts.total_quantity || 0;
  const handleLogoReload = () => {
    window.location.href = "/";
  };
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const saved = localStorage.getItem("user_location");
    if (saved) {
      const parsed = JSON.parse(saved);
      setPincode(parsed.pincode);
    }
  }, []);

  useEffect(() => {
    if (!navigator.geolocation || autoDetected || pincode) return;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const json = await res.json();
          const pin = json?.address?.postcode;

          if (pin && pin.length === 6) {
            setPincode(pin);
            setAutoDetected(true);
          }
        } catch (err) {
          console.error("Failed to detect location", err);
        }
      },
      () => {
        console.warn("Location permission denied");
        setAutoDetected(true);
      }
    );
  }, [autoDetected, pincode]);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-[#dd3333] transition-shadow duration-300  ${scrolled ? "shadow-sm" : ""
        }`}
    >
  <div className="border-b border-[#dd3333] bg-[#dd3333]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-9 text-sm text-white">
          <p className="font-medium">
            🚚 Free shipping on all orders over{" "}
            <span className="text-gray-200 font-bold">₹1500</span>
          </p>
          <div className="hidden sm:flex items-center gap-5">
           
            <Link to="/wishlist" className="hover:text-[#e8572a] transition">
              My Wishlist
            </Link>
            
            {/* Language */}
            <select
              value={language}
              onChange={(e) => handleChange(e.target.value)}
              className="bg-transparent text-white text-sm py-0 border-none outline-none cursor-pointer"
            >
              {LANGUAGES.map((l) => (
                <option   className="bg-red-300" key={l.code} value={l.code}>{l.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="px-4 sm:px-6 lg:px-10 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 shrink-0">
            <Link to="/" onClick={handleLogoReload}>
              <img
                src={Ambeji}
                alt="Ambeji Logo"
                className="h-7 sm:h-8 md:h-9 w-auto"
              />
            </Link>

            <button
              onClick={() => setShowLocationModal(true)}
              className="hidden md:flex items-center gap-1.5 text-sm font-medium text-white px-3 py-1.5 rounded-md border border-white hover:border-white/70 hover:text-white/70 transition whitespace-nowrap"
            >
              <MapPin className="w-4 h-4 text-white" />
              {pincode && !city
                ? "Detecting location..."
                : city && stateName
                  ? `${city}, ${stateName}`
                  : pincode
                    ? pincode
                    : "Change Location"}
            </button>
          </div>

          <div className="hidden md:flex flex-1 justify-center px-6">
            <div className="w-full max-w-2xl">
              <SearchProduct />
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* <Link
              to="https://seller.unibcomp.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium border border-white rounded-md  text-white   hover:border-white/70 hover:text-white/70 transition whitespace-nowrap"
            >
              <Store className="w-4 h-4 text-white " />
              Become a Seller
            </Link> */}

            {/* <Link
              to="https://seller.unibcomp.in/"
              className="hidden sm:inline-block lg:hidden text-pink-600"
              title="Become a Seller"
            >
              <Store className="w-6 h-6 text-pink-600" />
            </Link> */}

            {/* <Link
              to="/contactus"
              className="hidden md:flex items-center gap-1 text-sm font-medium hover:text-pink-600"
            >
              <span className="material-symbols-outlined text-xl">
                help_outline
              </span>
              Help
            </Link> */}

            {/* <select
              value={language}
              onChange={(e) => handleChange(e.target.value)}
              style={styles.select}
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select> */}

            {/* <Link to="/wishlist" className="hover:text-pink-600 hidden md:block">
              <Heart className="w-6 h-6 text-white" />
            </Link> */}

            <Link to="/cart" className="relative hover:text-pink-600 hidden md:block">
              <ShoppingCart className="w-6 h-6 text-white" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gray-600 text-white text-[10px] font-semibold rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <AccountDropdown />

            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="md:hidden"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3 md:hidden w-full">
          {/* Location (Left) */}
          <button
            onClick={() => setShowLocationModal(true)}
            className="
      flex items-center gap-2
      text-sm font-medium text-gray-700
      px-3 py-2
      border border-gray-300
      rounded-full
      hover:text-pink-600 hover:border-pink-500
      transition
      whitespace-nowrap
      max-w-[45%]
    "
          >
            <MapPin className="w-5 h-5 text-pink-600" />
            <span className="truncate">
              {pincode && !city
                ? "Detecting..."
                : city && stateName
                  ? `${city}, ${stateName}`
                  : pincode
                    ? pincode
                    : "Change Location"}
            </span>
          </button>

          {/* Search (Right) */}
          <div className="flex-1 min-w-0">
            <SearchProduct />
          </div>
        </div>
      </div>

      <DesktopNavbar navItems={navItems} isLoading={isLoading} />

      <MobileMenu
        navItems={navItems}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <LocationModel
        show={showLocationModal}
        handleClose={() => setShowLocationModal(false)}
        onApply={(pin) => {
          setPincode(pin);
          setAutoDetected(true);
        }}
        currentPincode={pincode}
      />
    </header>
  );
};
interface DesktopNavbarProps {
  navItems: NavbarResponse | undefined;
  isLoading: boolean;
}

const DesktopNavbar: React.FC<DesktopNavbarProps> = ({
  navItems,
  isLoading,
}) => {
  const [hoverItem, setHoverItem] = useState<string | null>(null);
  const [alignRight, setAlignRight] = useState(false);

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLDivElement>,
    name: string
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const dropdownWidth = 600;

    setAlignRight(rect.left + dropdownWidth > window.innerWidth);
    setHoverItem(name);
  };

  const electronics = navItems?.results?.find(
    (item) => item.name === "Electronics"
  );

  return (
    <div className="hidden md:block w-screen bg-[#dd3333] border-t border-gray-100 shadow-sm  py-2">
      <nav className="grid grid-cols-[1fr_auto] items-center px-6 xl:px-10 py-2 font-medium gap-6">
        {/* ================= LEFT SIDE (Electronics Categories) ================= */}
        <div className="flex items-center gap-4 xl:gap-6 overflow-hidden whitespace-nowrap min-w-0 ">
          {electronics?.children?.map((child, index) => (
            <Link
              key={child.name}
              to={child.path || "#"}
              className={`text-md text-white hover:text-red-200 transition
                ${index > 5 ? "hidden xl:inline-block" : ""}
              `}
            >
              {child.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6">
          {isLoading ? (
            <span className="text-gray-500 text-sm"></span>
          ) : (
            navItems?.results
              ?.filter(
                (item) => item.name === "Brand" || item.name === "Electronics"
              )
              .map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={(e) => handleMouseEnter(e, item.name)}
                  onMouseLeave={() => setHoverItem(null)}
                >
                  <Link
                    to={item.path || "#"}
                    className="flex items-center gap-1 text-sm text-white hover:text-red-200 whitespace-nowrap"
                  >
                    {item.name}
                    <ChevronDown className="w-4 h-4" />
                  </Link>

                  <AnimatePresence>
                    {hoverItem === item.name && item.children?.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className={`
                          absolute top-full mt-3
                          ${alignRight ? "right-0" : "left-0"}
                          w-[600px] max-w-[95vw]
                          bg-white border border-gray-100
                          shadow-xl rounded-xl z-50 p-4
                        `}
                        onMouseEnter={() => setHoverItem(item.name)}
                        onMouseLeave={() => setHoverItem(null)}
                      >
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[65vh] overflow-y-auto">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              to={child.path || "#"}
                              className="flex items-center gap-3 p-2 rounded-md hover:bg-pink-50 transition"
                            >
                              {child.image && (
                                <img
                                  src={child.image}
                                  alt={child.name}
                                  className="w-8 h-8 rounded object-cover"
                                />
                              )}
                              <span className="text-sm font-medium text-gray-800">
                                {child.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))
          )}
        </div>
      </nav>
    </div>
  );
};

interface MobileMenuProps {
  navItems: NavbarResponse | undefined;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const MobileMenu: React.FC<MobileMenuProps> = ({
  navItems,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const [mobileDropdown, setMobileDropdown] = useState<number | null>(null);
  const { user, logout } = useUser();
  const [userDropdown, setUserDropdown] = useState(false);

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.nav
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-4"
        >
          {navItems?.results?.map((item, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-center font-semibold text-gray-700 cursor-pointer">
                {item.children?.length > 0 ? (
                  <button
                    className="flex-1 text-left"
                    onClick={() =>
                      setMobileDropdown(mobileDropdown === index ? null : index)
                    }
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    to={item.path || "#"}
                    className="flex-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
                {item.children?.length > 0 && (
                  <div>
                    {mobileDropdown === index ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                )}
              </div>
              <AnimatePresence>
                {mobileDropdown === index && item.children?.length > 0 && (
                  <motion.ul
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="pl-4 pt-2 space-y-1 text-gray-600 text-sm max-h-[60vh] custom-scroll"
                  >
                    {item.children.map((child, idx) => (
                      <li key={idx}>
                        <Link
                          to={child.path || "#"}
                          className="block py-1"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          ))}
          {/* ================== USER ACCOUNT DROPDOWN ================== */}
          <div className="mb-3">
            <div
              className="flex justify-between items-center font-semibold text-gray-700 cursor-pointer"
              onClick={() => setUserDropdown(!userDropdown)}
            >
              <span>Account</span>

              {userDropdown ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </div>

            <AnimatePresence>
              {userDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="pl-4 pt-2 space-y-1 text-gray-700 text-sm"
                >
                  {!user ? (
                    <>
                      <Link
                        to="/login"
                        className="flex items-center gap-3 py-1.5"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <LogIn className="w-5 h-5" /> Sign In
                      </Link>

                      <Link
                        to="/signup"
                        className="flex items-center gap-3 py-1.5"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <UserPlus className="w-5 h-5" /> Sign Up
                      </Link>

                      <Link
                        to="/contactus"
                        className="flex items-center gap-3 py-1.5"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <CircleHelp className="w-5 h-5" /> Help
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/settings"
                        className="flex items-center gap-3 py-1.5"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <User className="w-5 h-5" /> User Profile
                      </Link>

                      <Link
                        to="/orders"
                        className="flex items-center gap-3 py-1.5"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Package className="w-5 h-5" /> Orders
                      </Link>

                      <Link
                        to="/wishlist"
                        className="flex items-center gap-3 py-1.5"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Heart className="w-5 h-5" /> Wishlist
                      </Link>

                      <Link
                        to="/cart"
                        className="flex items-center gap-3 py-1.5"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <ShoppingCart className="w-5 h-5" /> Cart
                      </Link>

                      {/* <Link
                        to="https://seller.unibcomp.in/"
                        className="flex items-center gap-3 py-1.5"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Store className="w-5 h-5" /> Become a Seller
                      </Link> */}

                      <button
                        className="flex items-center gap-3 py-1.5 text-red-600"
                        onClick={() => {
                          logout();
                          setUserDropdown(false);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <LogOut className="w-5 h-5" /> Logout
                      </button>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};
export default Navbar;
