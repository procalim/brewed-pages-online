import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Every route change starts at the top of the page, the way a real store behaves. */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
};

export default ScrollToTop;
