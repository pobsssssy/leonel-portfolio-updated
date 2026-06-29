import { Box } from "@chakra-ui/react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Experience from "../components/sections/Experience";
import Projects from "../components/sections/Projects";
import Skills from "../components/sections/Skills";
import Contact from "../components/sections/Contact";
import { useScrollToSection } from "../hooks/useScrollToSection";

function HomePage() {
  useScrollToSection();

  return (
    <Box className="app-shell">
      <Navbar />
      <Box as="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </Box>
      <Footer />
    </Box>
  );
}

export default HomePage;
