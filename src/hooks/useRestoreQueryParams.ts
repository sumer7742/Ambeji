import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useRestoreQueryParams = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const storedParams = localStorage.getItem(location.pathname);
    if (!location.search && storedParams) {
      navigate(`${location.pathname}${storedParams}`, { replace: true });
    }
  }, [location.pathname, location.search, navigate]);
  useEffect(() => {
    if (location.search) {
      localStorage.setItem(location.pathname, location.search);
    }
  }, [location.pathname, location.search]);
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        localStorage.removeItem(location.pathname);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [location.pathname]);
};
