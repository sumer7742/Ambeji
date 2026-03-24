import { useEffect } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import { useRestoreQueryParams } from "./hooks/useRestoreQueryParams";
function App() {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, searchParams]);
  useEffect(() => {
    const resetBody = () => {
      document.body.style.top = "0px";
      document.body.style.position = "static";
    };

    resetBody();

    const observer = new MutationObserver(resetBody);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
    });

    return () => observer.disconnect();
  }, []);

  useRestoreQueryParams();
  return (
    <div className="flex overflow-x-hidden">
      <div className="flex-1 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-1 mt-2">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
