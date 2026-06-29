import { useEffect } from "react";
import { useLocation } from "react-router";

const routeToSection = {
  "/about": "about",
  "/experience": "experience",
  "/projects": "projects",
  "/skills": "skills",
  "/contact": "contact",
};

/**
 * Keeps React Router URLs while preserving a single-page portfolio layout.
 * Navigating to /projects, for example, scrolls to the projects section.
 */
export function useScrollToSection() {
  const { pathname } = useLocation();

  useEffect(() => {
    const sectionId = routeToSection[pathname];

    const frameId = window.requestAnimationFrame(() => {
      if (!sectionId) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [pathname]);
}
