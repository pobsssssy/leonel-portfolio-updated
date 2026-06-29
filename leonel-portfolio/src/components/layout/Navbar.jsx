import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Box, Container, Flex, Text } from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router";
import ThemeToggle from "../common/ThemeToggle";

const navItems = [
  { label: "About", to: "/about" },
  { label: "Experience", to: "/experience" },
  { label: "Projects", to: "/projects" },
  { label: "Skills", to: "/skills" },
  { label: "Contact", to: "/contact" },
];

function MenuIcon({ isOpen }) {
  return isOpen ? (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ) : (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsOpen(false);
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <Box as="header" className="site-header">
      <Container maxW="7xl" px={{ base: "1rem", md: "1.5rem" }}>
        <Flex h="72px" align="center" justify="space-between" gap="1rem">
          <NavLink to="/" className="brand-link" aria-label="Leonel Pobre home">
            <span className="brand-mark">LP</span>
            <Text as="span" fontWeight="800" color="var(--text-primary)" letterSpacing="-0.02em">
              Leonel Pobre
            </Text>
          </NavLink>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `nav-link ${isActive ? "nav-link-active" : ""}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="nav-actions">
            <ThemeToggle />
            <button
              type="button"
              className="menu-toggle"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsOpen((current) => !current)}
            >
              <MenuIcon isOpen={isOpen} />
            </button>
          </div>
        </Flex>
      </Container>

      {createPortal(
        <div
          id="mobile-navigation"
          className={`mobile-nav-overlay ${isOpen ? "mobile-nav-overlay-open" : ""}`}
          aria-hidden={!isOpen}
          onClick={() => setIsOpen(false)}
        >
          <nav
            className={`mobile-nav-panel ${isOpen ? "mobile-nav-panel-open" : ""}`}
            aria-label="Mobile navigation"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mobile-nav-heading">
              <Text fontWeight="800" color="var(--text-primary)">
                Navigation
              </Text>
              <Text fontSize="0.8rem" color="var(--text-muted)">
                Select a section
              </Text>
            </div>

            {navItems.map((item, index) => (
              <NavLink
                key={item.to}
                to={item.to}
                tabIndex={isOpen ? 0 : -1}
                className={({ isActive }) => `mobile-nav-link ${isActive ? "mobile-nav-link-active" : ""}`}
                style={{ transitionDelay: `${index * 45}ms` }}
              >
                <span>0{index + 1}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>,
        document.body,
      )}
    </Box>
  );
}

export default Navbar;
