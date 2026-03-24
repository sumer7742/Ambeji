import { useEffect } from "react";

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

const GoogleTranslateLoader: React.FC = () => {
  useEffect(() => {
    const lang = localStorage.getItem("language") || "en";
    document.cookie = `googtrans=/en/${lang}; path=/;`;
  }, []);

  useEffect(() => {
    if (document.getElementById("google-translate-script")) return;

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate) return;

      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;

    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    const hideBanner = () => {
      const iframe = document.querySelector(
        ".goog-te-banner-frame"
      ) as HTMLElement | null;

      if (iframe) iframe.style.display = "none";
      document.body.style.top = "0px";
    };

    hideBanner();
    const interval = setInterval(hideBanner, 300);

    return () => clearInterval(interval);
  }, []);

  return <div id="google_translate_element" style={{ display: "none" }} />;
};

export default GoogleTranslateLoader;
