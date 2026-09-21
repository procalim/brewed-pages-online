import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "@/lib/pixel";

/** Reports every client-side route change to the Whop pixel. */
const RouteTracker = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    trackPageView(pathname + search);
  }, [pathname, search]);

  return null;
};

export default RouteTracker;
