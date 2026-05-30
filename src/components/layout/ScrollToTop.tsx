"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * ScrollToTop — scrolls the window to the top whenever the route (pathname) changes.
 * This fixes the Next.js App Router behaviour where client-side navigation
 * preserves the previous scroll position instead of resetting to the top.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Use instant scroll (not smooth) so the user always lands at the top
    // immediately when the new page renders.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
