import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "@/lib/pixel";

/**
 * Reports every in-app navigation to the Whop pixel.
 * The first page view is skipped: the snippet in index.html already fired
 * it on load, and reporting it again would double-count the visit.
 */
const RouteTracker = () => {
  const { pathname, search } = useLocation();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    trackPageView();
  }, [pathname, search]);

  return null;
};

export default RouteTracker;
