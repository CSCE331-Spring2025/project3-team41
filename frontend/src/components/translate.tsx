import * as React from "react";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: {
      translate: {
        TranslateElement: new (
          options: { pageLanguage: string },
          elementId: string
        ) => void;
      };
    };
  }
}

export function Translate() {
  React.useEffect(() => {
    // Initialize Google Translate
    if (document.getElementById("google-translate-script")) return;

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en" },
        "google_translate_element"
      );
    };

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    // Hide the Google Translate bar after the script is loaded
    const hideTranslateBar = () => {
      const translateBanner = document.querySelector(".goog-te-banner-frame")  as HTMLElement;
      if (translateBanner) {
        translateBanner.style.display = "none"; // Hide the bar
      }
    };

    script.onload = hideTranslateBar;

    return () => {
      // Optional cleanup if you want to remove script on unmount
      // document.body.removeChild(script);
    };
  }, []);

  return <div id="google_translate_element" className="absolute bottom-4 right-4"></div>;
}
