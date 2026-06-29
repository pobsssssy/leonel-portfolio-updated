# Complete React Portfolio Walkthrough — Leonel Pobre

This walkthrough contains every source file for the responsive React portfolio. The layout uses a dark theme, deep-purple/teal/soft-gold gradients, React Router navigation, mobile burger navigation, Chakra UI components, custom CSS animations, and reusable hooks.

## 1. File structure

```text
leonel-portfolio/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── README.md
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── components/
    │   ├── common/
    │   │   ├── Reveal.jsx
    │   │   └── SectionHeading.jsx
    │   ├── layout/
    │   │   ├── Footer.jsx
    │   │   └── Navbar.jsx
    │   └── sections/
    │       ├── About.jsx
    │       ├── Contact.jsx
    │       ├── Experience.jsx
    │       ├── Hero.jsx
    │       ├── Projects.jsx
    │       └── Skills.jsx
    ├── hooks/
    │   ├── useInView.js
    │   └── useScrollToSection.js
    ├── pages/
    │   ├── HomePage.jsx
    │   └── NotFoundPage.jsx
    └── styles/
        ├── animations.css
        └── global.css
```

## 2. Create the project folder

Create the folders shown above, then add each file in the following order.

## 3. `src/App.jsx`

```jsx
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<HomePage />} />
      <Route path="/experience" element={<HomePage />} />
      <Route path="/projects" element={<HomePage />} />
      <Route path="/skills" element={<HomePage />} />
      <Route path="/contact" element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
```

## 4. `src/components/common/Reveal.jsx`

```jsx
import { useInView } from "../../hooks/useInView";

function Reveal({ children, delay = 0, className = "" }) {
  const { elementRef, isVisible } = useInView();

  return (
    <div
      ref={elementRef}
      className={`reveal ${isVisible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default Reveal;
```

## 5. `src/components/common/SectionHeading.jsx`

```jsx
import { Box, Heading, Text } from "@chakra-ui/react";

function SectionHeading({ eyebrow, title, description }) {
  return (
    <Box mb={{ base: "2.25rem", md: "3rem" }} maxW="720px">
      <Text className="section-eyebrow">{eyebrow}</Text>
      <Heading
        as="h2"
        fontSize={{ base: "2rem", md: "2.75rem" }}
        lineHeight="1.1"
        letterSpacing="-0.04em"
        color="white"
      >
        {title}
      </Heading>
      {description ? (
        <Text mt="1rem" color="var(--text-muted)" fontSize={{ base: "1rem", md: "1.08rem" }}>
          {description}
        </Text>
      ) : null}
    </Box>
  );
}

export default SectionHeading;
```

## 6. `src/components/layout/Navbar.jsx`

```jsx
import { useEffect, useState } from "react";
import { Box, Container, Flex, Text } from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router";

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
        <Flex h="72px" align="center" justify="space-between">
          <NavLink to="/" className="brand-link" aria-label="Leonel Pobre home">
            <span className="brand-mark">LP</span>
            <Text as="span" fontWeight="800" color="white" letterSpacing="-0.02em">
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
        </Flex>
      </Container>

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
      </div>
    </Box>
  );
}

export default Navbar;
```

## 7. `src/components/layout/Footer.jsx`

```jsx
import { Box, Container, Flex, Text } from "@chakra-ui/react";

function Footer() {
  return (
    <Box as="footer" className="footer-shell">
      <Container maxW="7xl" px={{ base: "1rem", md: "1.5rem" }}>
        <Flex
          py="1.5rem"
          gap="0.75rem"
          direction={{ base: "column", sm: "row" }}
          justify="space-between"
          align={{ base: "flex-start", sm: "center" }}
        >
          <Text color="var(--text-muted)" fontSize="0.9rem">
            © {new Date().getFullYear()} Leonel Pobre. All rights reserved.
          </Text>
          <Text color="var(--text-muted)" fontSize="0.9rem">
            Built with React, Chakra UI, and Vite.
          </Text>
        </Flex>
      </Container>
    </Box>
  );
}

export default Footer;
```

## 8. `src/components/sections/Hero.jsx`

```jsx
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { NavLink } from "react-router";

function Hero() {
  return (
    <Box as="section" className="hero-section" id="home">
      <div className="hero-orb hero-orb-one" />
      <div className="hero-orb hero-orb-two" />

      <Container maxW="7xl" px={{ base: "1rem", md: "1.5rem" }} position="relative" zIndex="1">
        <Flex minH={{ base: "calc(100vh - 72px)", md: "720px" }} align="center" py={{ base: "5rem", md: "7rem" }}>
          <Box maxW="900px" className="page-enter">
            <Text className="hero-kicker">SOFTWARE DEVELOPER · AI AUTOMATION</Text>
            <Heading
              as="h1"
              fontSize={{ base: "3rem", sm: "4rem", md: "5.8rem" }}
              lineHeight={{ base: "1.04", md: "0.98" }}
              letterSpacing="-0.065em"
              color="white"
              maxW="900px"
            >
              I build software that works smarter, not harder.
            </Heading>
            <Text mt="1.5rem" color="var(--text-muted)" fontSize={{ base: "1.05rem", md: "1.25rem" }} maxW="680px">
              Hi, I’m Leonel Pobre. I create reliable business applications and practical AI-powered workflows that turn repetitive work into efficient systems.
            </Text>

            <Flex mt="2rem" gap="0.9rem" wrap="wrap">
              <NavLink to="/projects" className="primary-button">
                View Projects
                <span aria-hidden="true">↗</span>
              </NavLink>
              <NavLink to="/contact" className="secondary-button">
                Let’s Work Together
              </NavLink>
            </Flex>

            <Flex mt="3.25rem" gap={{ base: "1.5rem", md: "3rem" }} wrap="wrap">
              <Box>
                <Text className="stat-value">02+</Text>
                <Text className="stat-label">Featured projects</Text>
              </Box>
              <Box>
                <Text className="stat-value">11+</Text>
                <Text className="stat-label">Core technologies</Text>
              </Box>
              <Box>
                <Text className="stat-value">100%</Text>
                <Text className="stat-label">Focused on useful solutions</Text>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

export default Hero;
```

## 9. `src/components/sections/About.jsx`

```jsx
import { Box, Container, Grid, Heading, Text } from "@chakra-ui/react";
import Reveal from "../common/Reveal";
import SectionHeading from "../common/SectionHeading";

function About() {
  return (
    <Box as="section" id="about" className="section-shell section-anchor">
      <Container maxW="7xl" px={{ base: "1rem", md: "1.5rem" }}>
        <Reveal>
          <SectionHeading
            eyebrow="01 / ABOUT"
            title="Developer mindset. Automation-first thinking."
            description="I combine traditional software development with modern automation tools to create systems that are maintainable, practical, and ready to grow."
          />
        </Reveal>

        <Grid templateColumns={{ base: "1fr", md: "0.75fr 1.25fr" }} gap={{ base: "2rem", md: "4rem" }} alignItems="center">
          <Reveal delay={80}>
            <Box className="profile-card">
              <Box className="avatar-ring" aria-label="Leonel Pobre profile placeholder">
                <Box className="avatar-placeholder">LP</Box>
              </Box>
              <Text mt="1.4rem" color="white" fontWeight="800" fontSize="1.25rem" textAlign="center">
                Leonel Pobre
              </Text>
              <Text color="var(--teal)" textAlign="center" fontSize="0.95rem">
                Software Developer & AI Automation
              </Text>
              {/* TODO: Replace the initials above with Leonel's real profile image. */}
            </Box>
          </Reveal>

          <Reveal delay={160}>
            <Box>
              <Heading as="h3" color="white" fontSize={{ base: "1.55rem", md: "2rem" }} letterSpacing="-0.03em">
                Building useful products from clear ideas.
              </Heading>
              <Text mt="1.2rem" color="var(--text-muted)" fontSize="1.05rem" lineHeight="1.9">
                {/* TODO: Replace with Leonel's final personal biography. */}
                I am a passionate software developer who enjoys turning real business problems into simple, dependable digital solutions. My work includes desktop and web-based systems, database-driven applications, API integrations, and workflow automation.
              </Text>
              <Text mt="1rem" color="var(--text-muted)" fontSize="1.05rem" lineHeight="1.9">
                I am also exploring AI automation with tools such as n8n, webhooks, and external APIs. My goal is to help teams reduce repetitive work, respond to opportunities faster, and make better use of the data they already have.
              </Text>

              <Grid mt="2rem" templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }} gap="1rem">
                <Box className="mini-info-card">
                  <Text className="mini-info-label">Focus</Text>
                  <Text color="white">Business Software & Integrations</Text>
                </Box>
                <Box className="mini-info-card">
                  <Text className="mini-info-label">Currently learning</Text>
                  <Text color="white">AI Agents & Lead Automation</Text>
                </Box>
              </Grid>
            </Box>
          </Reveal>
        </Grid>
      </Container>
    </Box>
  );
}

export default About;
```

## 10. `src/components/sections/Experience.jsx`

```jsx
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import Reveal from "../common/Reveal";
import SectionHeading from "../common/SectionHeading";

const experiences = [
  {
    role: "Software Developer",
    company: "Innovative Adhartas IT Solution Corp.",
    dates: "January 2024 – Present", // TODO: Replace with actual employment dates.
    description:
      "Develop and maintain business applications, database features, reports, and system integrations. Collaborate with stakeholders to understand workflows and translate requirements into stable software solutions.", // TODO: Replace with actual responsibilities and achievements.
    highlights: [
      "Application development and maintenance",
      "MSSQL/MySQL database work",
      "API and webhook integrations",
    ],
  },
];

function Experience() {
  return (
    <Box as="section" id="experience" className="section-shell section-shell-alt section-anchor">
      <Container maxW="7xl" px={{ base: "1rem", md: "1.5rem" }}>
        <Reveal>
          <SectionHeading
            eyebrow="02 / EXPERIENCE"
            title="Professional experience"
            description="A growing track record of building and supporting software used in real business operations."
          />
        </Reveal>

        {experiences.map((experience, index) => (
          <Reveal key={`${experience.company}-${experience.role}`} delay={index * 100}>
            <Box className="experience-card">
              <Flex direction={{ base: "column", md: "row" }} justify="space-between" gap="1rem">
                <Box>
                  <Text className="card-number">0{index + 1}</Text>
                  <Heading as="h3" color="white" fontSize={{ base: "1.45rem", md: "1.8rem" }}>
                    {experience.role}
                  </Heading>
                  <Text mt="0.3rem" color="var(--teal)" fontWeight="700">
                    {experience.company}
                  </Text>
                </Box>
                <Text className="date-pill">{experience.dates}</Text>
              </Flex>

              <Text mt="1.5rem" color="var(--text-muted)" lineHeight="1.8" maxW="850px">
                {experience.description}
              </Text>

              <Flex mt="1.5rem" gap="0.65rem" wrap="wrap">
                {experience.highlights.map((highlight) => (
                  <Text as="span" className="subtle-chip" key={highlight}>
                    {highlight}
                  </Text>
                ))}
              </Flex>
            </Box>
          </Reveal>
        ))}
      </Container>
    </Box>
  );
}

export default Experience;
```

## 11. `src/components/sections/Projects.jsx`

```jsx
import { Box, Container, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import Reveal from "../common/Reveal";
import SectionHeading from "../common/SectionHeading";

const projects = [
  {
    number: "01",
    title: "Enterprise Resource Planning",
    status: "Current Work",
    description:
      "A modular business platform for managing operational records, transactions, reports, and role-based workflows in one centralized system.", // TODO: Replace with actual ERP details and approved screenshots.
    tools: [".NET", "C#", "MSSQL", "Design Patterns", "API Integration"],
    demoUrl: "https://example.com/erp-demo", // TODO: Replace with the real demo video URL.
    githubUrl: "https://github.com/example/enterprise-resource-planning", // TODO: Replace with the real GitHub repository URL.
  },
  {
    number: "02",
    title: "AI Lead Automation",
    status: "n8n Sample Project",
    description:
      "An automated lead workflow that captures enquiries, validates and enriches lead information, stores records, and sends timely notifications or follow-up messages.", // TODO: Replace with the final workflow description and business outcome.
    tools: ["n8n", "OpenAI", "Webhooks", "Google Sheets", "Telegram"],
    demoUrl: "https://example.com/ai-lead-automation-demo", // TODO: Replace with the real demo video URL.
    githubUrl: "https://github.com/example/ai-lead-automation", // TODO: Replace with the real GitHub repository URL.
  },
];

function ExternalIcon() {
  return <span aria-hidden="true">↗</span>;
}

function ProjectCard({ project }) {
  const openDemo = () => {
    window.open(project.demoUrl, "_blank", "noopener,noreferrer");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openDemo();
    }
  };

  return (
    <Box
      as="article"
      className="project-card"
      role="link"
      tabIndex={0}
      aria-label={`Open ${project.title} demo in a new tab`}
      onClick={openDemo}
      onKeyDown={handleKeyDown}
    >
      <Flex justify="space-between" align="flex-start" gap="1rem">
        <Text className="project-number">{project.number}</Text>
        <Text className="status-pill">{project.status}</Text>
      </Flex>

      <Heading as="h3" mt="2rem" color="white" fontSize={{ base: "1.5rem", md: "1.9rem" }} letterSpacing="-0.03em">
        {project.title}
      </Heading>
      <Text mt="1rem" color="var(--text-muted)" lineHeight="1.8">
        {project.description}
      </Text>

      <Box mt="1.5rem">
        <Text className="tools-label">TOOLS USED</Text>
        <Flex mt="0.7rem" gap="0.55rem" wrap="wrap">
          {project.tools.map((tool) => (
            <Text as="span" className="skill-chip" key={tool}>
              {tool}
            </Text>
          ))}
        </Flex>
      </Box>

      <Flex mt="2rem" gap="1rem" wrap="wrap">
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noreferrer"
          className="project-link"
          onClick={(event) => event.stopPropagation()}
        >
          Demo Video <ExternalIcon />
        </a>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="project-link project-link-muted"
          onClick={(event) => event.stopPropagation()}
        >
          GitHub Repo <ExternalIcon />
        </a>
      </Flex>
    </Box>
  );
}

function Projects() {
  return (
    <Box as="section" id="projects" className="section-shell section-anchor">
      <Container maxW="7xl" px={{ base: "1rem", md: "1.5rem" }}>
        <Reveal>
          <SectionHeading
            eyebrow="03 / PROJECTS"
            title="Selected projects"
            description="Software and automation work designed around real workflows, measurable efficiency, and maintainable implementation."
          />
        </Reveal>

        <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap="1.25rem">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 120}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Projects;
```

## 12. `src/components/sections/Skills.jsx`

```jsx
import { Box, Container, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import Reveal from "../common/Reveal";
import SectionHeading from "../common/SectionHeading";

const skills = [
  ".NET",
  "C#",
  "VB.NET",
  "MSSQL",
  "MySQL",
  "Design Pattern",
  "WebHooks",
  "API Integration",
  "GitHub",
  "Azure",
  "Firebase",
  "Additional Skill", // TODO: Replace with another relevant skill.
];

const skillGroups = [
  { label: "Development", value: ".NET, C#, VB.NET" },
  { label: "Data", value: "MSSQL, MySQL, Firebase" },
  { label: "Integration", value: "APIs, Webhooks, Automation" },
];

function Skills() {
  return (
    <Box as="section" id="skills" className="section-shell section-shell-alt section-anchor">
      <Container maxW="7xl" px={{ base: "1rem", md: "1.5rem" }}>
        <Reveal>
          <SectionHeading
            eyebrow="04 / SKILLS & TOOLS"
            title="Tools I use to solve problems"
            description="A practical mix of application development, databases, cloud services, integrations, and automation platforms."
          />
        </Reveal>

        <Grid templateColumns={{ base: "1fr", lg: "0.8fr 1.2fr" }} gap={{ base: "2rem", lg: "4rem" }} alignItems="start">
          <Reveal delay={80}>
            <Box>
              {skillGroups.map((group, index) => (
                <Box className="skill-group-row" key={group.label}>
                  <Text className="skill-group-index">0{index + 1}</Text>
                  <Box>
                    <Heading as="h3" color="white" fontSize="1.1rem">
                      {group.label}
                    </Heading>
                    <Text mt="0.25rem" color="var(--text-muted)">
                      {group.value}
                    </Text>
                  </Box>
                </Box>
              ))}
            </Box>
          </Reveal>

          <Reveal delay={160}>
            <Flex gap="0.8rem" wrap="wrap">
              {skills.map((skill, index) => (
                <Text
                  as="span"
                  className={`large-skill-badge ${skill === "Additional Skill" ? "placeholder-skill" : ""}`}
                  key={skill}
                  style={{ animationDelay: `${index * 45}ms` }}
                >
                  {skill}
                </Text>
              ))}
            </Flex>
          </Reveal>
        </Grid>
      </Container>
    </Box>
  );
}

export default Skills;
```

## 13. `src/components/sections/Contact.jsx`

```jsx
import { useState } from "react";
import { Box, Button, Container, Flex, Grid, Heading, Input, Text, Textarea } from "@chakra-ui/react";
import Reveal from "../common/Reveal";
import SectionHeading from "../common/SectionHeading";

const initialForm = {
  name: "",
  email: "",
  message: "",
};

function Contact() {
  const [formData, setFormData] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setSubmitted(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // TODO: Connect this form to Formspree, EmailJS, a custom API, or an n8n webhook.
    console.log("Contact form placeholder submission:", formData);
    setSubmitted(true);
    setFormData(initialForm);
  };

  return (
    <Box as="section" id="contact" className="section-shell contact-section section-anchor">
      <Container maxW="7xl" px={{ base: "1rem", md: "1.5rem" }}>
        <Reveal>
          <SectionHeading
            eyebrow="05 / CONTACT"
            title="Let’s build something useful"
            description="Have a software project, integration problem, or automation idea? Send a message or schedule a conversation."
          />
        </Reveal>

        <Grid templateColumns={{ base: "1fr", lg: "0.8fr 1.2fr" }} gap={{ base: "2rem", lg: "4rem" }}>
          <Reveal delay={80}>
            <Box>
              <Box className="contact-info-card">
                <Text className="contact-label">EMAIL</Text>
                {/* TODO: Replace with Leonel's actual professional email. */}
                <a href="mailto:leonel.pobre@example.com" className="contact-value">
                  leonel.pobre@example.com
                </a>
              </Box>

              <Box className="contact-info-card">
                <Text className="contact-label">PHONE</Text>
                {/* TODO: Replace with Leonel's actual phone number. */}
                <a href="tel:+639000000000" className="contact-value">
                  +63 900 000 0000
                </a>
              </Box>

              <Box mt="1.5rem">
                {/* TODO: Replace with Leonel's actual Calendly scheduling URL. */}
                <a
                  href="https://calendly.com/example/30min"
                  target="_blank"
                  rel="noreferrer"
                  className="primary-button meeting-button"
                >
                  Book a Meeting <span aria-hidden="true">↗</span>
                </a>
              </Box>
            </Box>
          </Reveal>

          <Reveal delay={160}>
            <Box as="form" className="contact-form" onSubmit={handleSubmit}>
              <Heading as="h3" color="white" fontSize="1.4rem" mb="1.5rem">
                Send a message
              </Heading>

              <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }} gap="1rem">
                <Box>
                  <label className="form-label" htmlFor="name">Name</label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="contact-input"
                    autoComplete="name"
                  />
                </Box>
                <Box>
                  <label className="form-label" htmlFor="email">Email</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="contact-input"
                    autoComplete="email"
                  />
                </Box>
              </Grid>

              <Box mt="1rem">
                <label className="form-label" htmlFor="message">Message</label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or automation idea..."
                  required
                  className="contact-input contact-textarea"
                  resize="vertical"
                />
              </Box>

              <Flex mt="1.25rem" align={{ base: "stretch", sm: "center" }} gap="1rem" direction={{ base: "column", sm: "row" }}>
                <Button type="submit" className="submit-button">
                  Send Message
                </Button>
                {submitted ? (
                  <Text color="var(--teal)" fontSize="0.92rem" role="status">
                    Demo submitted. Connect a form service to send real messages.
                  </Text>
                ) : null}
              </Flex>
            </Box>
          </Reveal>
        </Grid>
      </Container>
    </Box>
  );
}

export default Contact;
```

## 14. `src/pages/HomePage.jsx`

```jsx
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
```

## 15. `src/pages/NotFoundPage.jsx`

```jsx
import { Box, Container, Heading, Text } from "@chakra-ui/react";
import { NavLink } from "react-router";

function NotFoundPage() {
  return (
    <Box minH="100vh" display="grid" placeItems="center" bg="var(--bg-primary)" px="1rem">
      <Container maxW="lg" textAlign="center">
        <Text className="section-eyebrow">404 / NOT FOUND</Text>
        <Heading color="white" fontSize={{ base: "2.5rem", md: "4rem" }} letterSpacing="-0.05em">
          This page does not exist.
        </Heading>
        <Text mt="1rem" color="var(--text-muted)">
          The link may be outdated, or the page may have moved.
        </Text>
        <NavLink to="/" className="primary-button not-found-button">
          Return Home
        </NavLink>
      </Container>
    </Box>
  );
}

export default NotFoundPage;
```

## 16. `src/hooks/useInView.js`

```js
import { useEffect, useRef, useState } from "react";

/**
 * Reveals an element once it enters the viewport.
 * The hook uses IntersectionObserver and includes a safe fallback.
 */
export function useInView({ threshold = 0.15, rootMargin = "0px 0px -60px 0px" } = {}) {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return undefined;

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { elementRef, isVisible };
}
```

## 17. `src/hooks/useScrollToSection.js`

```js
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
```

## 18. `src/styles/global.css`

```css
:root {
  --bg-primary: #090b14;
  --bg-secondary: #0f1220;
  --surface: rgba(21, 24, 42, 0.72);
  --surface-strong: #171a2d;
  --border: rgba(255, 255, 255, 0.1);
  --border-hover: rgba(20, 184, 166, 0.44);
  --text-primary: #f7f8ff;
  --text-muted: #a7abc0;
  --purple: #7c3aed;
  --purple-light: #a78bfa;
  --teal: #2dd4bf;
  --teal-deep: #0f9f90;
  --gold: #f5c76b;
  --gradient-primary: linear-gradient(135deg, var(--purple) 0%, var(--teal) 55%, var(--gold) 115%);
  --gradient-soft: linear-gradient(135deg, rgba(124, 58, 237, 0.22), rgba(45, 212, 191, 0.1), rgba(245, 199, 107, 0.1));
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: var(--text-primary);
  background: var(--bg-primary);
  font-synthesis: none;
  text-rendering: optimizeLegibility;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  background: var(--bg-primary);
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  background:
    radial-gradient(circle at 12% 8%, rgba(124, 58, 237, 0.1), transparent 28%),
    radial-gradient(circle at 88% 40%, rgba(45, 212, 191, 0.06), transparent 24%),
    var(--bg-primary);
  color: var(--text-primary);
  overflow-x: hidden;
}

button,
a,
input,
textarea {
  font: inherit;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
a {
  -webkit-tap-highlight-color: transparent;
}

::selection {
  background: rgba(45, 212, 191, 0.28);
  color: white;
}

.app-shell {
  min-height: 100vh;
  background: transparent;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  background: rgba(9, 11, 20, 0.78);
  -webkit-backdrop-filter: blur(18px);
  backdrop-filter: blur(18px);
}

.brand-link {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  border-radius: 12px;
  transition: transform 180ms ease, opacity 180ms ease;
}

.brand-link:hover {
  transform: translateY(-2px);
}

.brand-link:focus-visible,
.nav-link:focus-visible,
.menu-toggle:focus-visible,
.mobile-nav-link:focus-visible,
.primary-button:focus-visible,
.secondary-button:focus-visible,
.project-link:focus-visible,
.contact-value:focus-visible {
  outline: 3px solid rgba(45, 212, 191, 0.42);
  outline-offset: 4px;
}

.brand-mark {
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 11px;
  background: var(--gradient-primary);
  color: #080a12;
  font-weight: 900;
  letter-spacing: -0.04em;
  box-shadow: 0 10px 28px rgba(124, 58, 237, 0.25);
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: 0.15rem;
}

.nav-link {
  position: relative;
  padding: 0.62rem 0.82rem;
  border-radius: 10px;
  color: var(--text-muted);
  font-size: 0.91rem;
  font-weight: 700;
  transition: color 180ms ease, background 180ms ease, transform 180ms ease;
}

.nav-link:hover {
  color: white;
  background: rgba(255, 255, 255, 0.05);
  transform: translateY(-2px);
}

.nav-link-active {
  color: var(--teal);
}

.nav-link-active::after {
  content: "";
  position: absolute;
  right: 0.8rem;
  bottom: 0.3rem;
  left: 0.8rem;
  height: 2px;
  border-radius: 100px;
  background: var(--gradient-primary);
}

.menu-toggle {
  display: none;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.04);
  color: white;
  cursor: pointer;
  transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;
}

.menu-toggle:hover {
  transform: translateY(-2px);
  border-color: var(--border-hover);
  background: rgba(45, 212, 191, 0.08);
}

.mobile-nav-overlay {
  position: fixed;
  inset: 72px 0 0;
  visibility: hidden;
  background: rgba(4, 5, 10, 0);
  pointer-events: none;
  transition: background 260ms ease, visibility 260ms ease;
}

.mobile-nav-overlay-open {
  visibility: visible;
  background: rgba(4, 5, 10, 0.72);
  pointer-events: auto;
}

.mobile-nav-panel {
  position: absolute;
  top: 0;
  right: 0;
  width: min(86vw, 380px);
  height: 100%;
  padding: 1.4rem 1rem;
  border-left: 1px solid var(--border);
  background: rgba(15, 18, 32, 0.98);
  box-shadow: -30px 0 70px rgba(0, 0, 0, 0.35);
  transform: translateX(105%);
  transition: transform 280ms cubic-bezier(0.2, 0.8, 0.2, 1);
}

.mobile-nav-panel-open {
  transform: translateX(0);
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 12px;
  color: white;
  font-size: 1.15rem;
  font-weight: 800;
  opacity: 0;
  transform: translateX(18px);
  transition: opacity 200ms ease, transform 200ms ease, background 180ms ease, color 180ms ease;
}

.mobile-nav-panel-open .mobile-nav-link {
  opacity: 1;
  transform: translateX(0);
}

.mobile-nav-link span {
  color: var(--gold);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.75rem;
}

.mobile-nav-link:hover,
.mobile-nav-link-active {
  color: var(--teal);
  background: rgba(45, 212, 191, 0.07);
}

.hero-section {
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.hero-section::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: linear-gradient(to bottom, black, transparent 88%);
}

.hero-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(20px);
  pointer-events: none;
}

.hero-orb-one {
  top: 8%;
  right: -9%;
  width: min(45vw, 620px);
  aspect-ratio: 1;
  background: radial-gradient(circle, rgba(124, 58, 237, 0.25), rgba(124, 58, 237, 0));
}

.hero-orb-two {
  bottom: -18%;
  left: 30%;
  width: min(36vw, 480px);
  aspect-ratio: 1;
  background: radial-gradient(circle, rgba(45, 212, 191, 0.16), rgba(45, 212, 191, 0));
}

.hero-kicker,
.section-eyebrow {
  margin-bottom: 1rem;
  color: var(--gold);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.16em;
}

.primary-button,
.secondary-button {
  display: inline-flex;
  min-height: 48px;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  padding: 0.78rem 1.15rem;
  border: 1px solid transparent;
  border-radius: 12px;
  font-weight: 800;
  transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease, background 180ms ease;
}

.primary-button {
  background: var(--gradient-primary);
  color: #070911;
  box-shadow: 0 14px 38px rgba(124, 58, 237, 0.22);
}

.primary-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 18px 48px rgba(45, 212, 191, 0.2);
}

.secondary-button {
  border-color: var(--border);
  background: rgba(255, 255, 255, 0.035);
  color: white;
}

.secondary-button:hover {
  transform: translateY(-3px);
  border-color: var(--border-hover);
  background: rgba(45, 212, 191, 0.07);
}

.stat-value {
  color: white;
  font-size: 1.4rem;
  font-weight: 900;
  letter-spacing: -0.04em;
}

.stat-label {
  margin-top: 0.2rem;
  color: var(--text-muted);
  font-size: 0.83rem;
}

.section-shell {
  padding: 7rem 0;
}

.section-shell-alt {
  border-top: 1px solid rgba(255, 255, 255, 0.055);
  border-bottom: 1px solid rgba(255, 255, 255, 0.055);
  background: rgba(15, 18, 32, 0.58);
}

.section-anchor {
  scroll-margin-top: 72px;
}

.profile-card,
.experience-card,
.project-card,
.contact-form {
  border: 1px solid var(--border);
  background: var(--surface);
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.16);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
}

.profile-card {
  padding: 2rem;
  border-radius: 28px;
  background: var(--gradient-soft), var(--surface);
}

.avatar-ring {
  width: min(72vw, 280px);
  aspect-ratio: 1;
  margin: 0 auto;
  padding: 5px;
  border-radius: 50%;
  background: var(--gradient-primary);
  box-shadow: 0 30px 80px rgba(124, 58, 237, 0.24);
}

.avatar-placeholder {
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
  border: 8px solid var(--bg-secondary);
  border-radius: 50%;
  background:
    radial-gradient(circle at 32% 25%, rgba(255, 255, 255, 0.11), transparent 26%),
    linear-gradient(145deg, #242842, #111420);
  color: white;
  font-size: clamp(3rem, 10vw, 5.4rem);
  font-weight: 900;
  letter-spacing: -0.08em;
}

.mini-info-card {
  padding: 1.1rem;
  border: 1px solid var(--border);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.025);
  transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;
}

.mini-info-card:hover {
  transform: translateY(-3px);
  border-color: var(--border-hover);
  background: rgba(45, 212, 191, 0.055);
}

.mini-info-label,
.tools-label,
.contact-label {
  margin-bottom: 0.35rem;
  color: var(--gold);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.11em;
}

.experience-card {
  position: relative;
  padding: clamp(1.25rem, 4vw, 2.25rem);
  overflow: hidden;
  border-radius: 20px;
  transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
}

.experience-card::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--gradient-primary);
  opacity: 0.65;
}

.experience-card:hover {
  transform: translateY(-7px);
  border-color: var(--border-hover);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.26);
}

.card-number,
.project-number {
  color: var(--gold);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.12em;
}

.date-pill,
.status-pill,
.subtle-chip,
.skill-chip {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.035);
}

.date-pill {
  width: fit-content;
  height: fit-content;
  padding: 0.5rem 0.75rem;
  color: var(--text-muted);
  font-size: 0.78rem;
}

.subtle-chip {
  padding: 0.42rem 0.7rem;
  color: #dfe2f1;
  font-size: 0.78rem;
}

.project-card {
  position: relative;
  height: 100%;
  min-height: 430px;
  padding: clamp(1.25rem, 4vw, 2rem);
  overflow: hidden;
  border-radius: 22px;
  cursor: pointer;
  transition: transform 240ms ease, border-color 240ms ease, box-shadow 240ms ease;
}

.project-card::before {
  content: "";
  position: absolute;
  right: -120px;
  bottom: -120px;
  width: 260px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(124, 58, 237, 0.18), transparent 68%);
  transition: transform 300ms ease;
}

.project-card:hover,
.project-card:focus-visible {
  transform: translateY(-9px);
  border-color: var(--border-hover);
  box-shadow: 0 36px 90px rgba(0, 0, 0, 0.3);
  outline: none;
}

.project-card:hover::before,
.project-card:focus-visible::before {
  transform: scale(1.24);
}

.status-pill {
  padding: 0.45rem 0.7rem;
  color: var(--teal);
  font-size: 0.72rem;
  font-weight: 800;
}

.skill-chip {
  padding: 0.42rem 0.68rem;
  color: #e7e9f6;
  font-size: 0.76rem;
  transition: border-color 180ms ease, color 180ms ease, transform 180ms ease;
}

.skill-chip:hover {
  transform: translateY(-2px);
  border-color: rgba(245, 199, 107, 0.42);
  color: var(--gold);
}

.project-link {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  color: var(--teal);
  font-weight: 800;
  transition: transform 180ms ease, color 180ms ease;
}

.project-link:hover {
  transform: translateX(4px);
  color: white;
}

.project-link-muted {
  color: var(--text-muted);
}

.skill-group-row {
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 0.8rem;
  padding: 1.1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.skill-group-index {
  color: var(--gold);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.75rem;
}

.large-skill-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  padding: 0.72rem 1rem;
  border: 1px solid var(--border);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.035);
  color: white;
  font-weight: 800;
  animation: badgeFloat 4s ease-in-out infinite alternate;
  transition: transform 200ms ease, border-color 200ms ease, background 200ms ease, color 200ms ease;
}

.large-skill-badge:hover {
  transform: translateY(-5px) scale(1.03);
  border-color: var(--border-hover);
  background: rgba(45, 212, 191, 0.08);
  color: var(--teal);
}

.placeholder-skill {
  border-style: dashed;
  color: var(--text-muted);
}

.contact-section {
  position: relative;
  overflow: hidden;
}

.contact-section::before {
  content: "";
  position: absolute;
  inset: 20% auto auto -10%;
  width: 360px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(245, 199, 107, 0.08), transparent 70%);
  pointer-events: none;
}

.contact-info-card {
  padding: 1.25rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.contact-value {
  display: inline-block;
  color: white;
  font-size: clamp(1.05rem, 3vw, 1.35rem);
  font-weight: 800;
  word-break: break-word;
  transition: color 180ms ease, transform 180ms ease;
}

.contact-value:hover {
  color: var(--teal);
  transform: translateX(4px);
}

.meeting-button {
  width: fit-content;
}

.contact-form {
  padding: clamp(1.25rem, 4vw, 2rem);
  border-radius: 22px;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  color: #e7e9f6;
  font-size: 0.86rem;
  font-weight: 750;
}

.contact-input {
  min-height: 48px !important;
  border: 1px solid var(--border) !important;
  border-radius: 12px !important;
  background: rgba(255, 255, 255, 0.035) !important;
  color: white !important;
  transition: border-color 180ms ease, box-shadow 180ms ease, background 180ms ease !important;
}

.contact-input::placeholder {
  color: #73778c;
}

.contact-input:hover {
  border-color: rgba(255, 255, 255, 0.18) !important;
}

.contact-input:focus {
  border-color: var(--teal) !important;
  box-shadow: 0 0 0 3px rgba(45, 212, 191, 0.12) !important;
  outline: none !important;
}

.contact-textarea {
  min-height: 145px !important;
  padding-top: 0.85rem !important;
}

.submit-button {
  min-width: 150px !important;
  min-height: 46px !important;
  border-radius: 12px !important;
  background: var(--gradient-primary) !important;
  color: #070911 !important;
  font-weight: 900 !important;
  transition: transform 180ms ease, box-shadow 180ms ease !important;
}

.submit-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 18px 44px rgba(45, 212, 191, 0.18);
}

.footer-shell {
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  background: #070910;
}

.not-found-button {
  margin-top: 1.75rem;
}

@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }

  .menu-toggle {
    display: inline-flex;
  }

  .section-shell {
    padding: 5rem 0;
  }

  .hero-orb-one {
    top: 3%;
    right: -45%;
    width: 110vw;
  }

  .hero-orb-two {
    left: -30%;
    width: 100vw;
  }

  .project-card {
    min-height: 0;
  }
}

@media (max-width: 480px) {
  .primary-button,
  .secondary-button {
    width: 100%;
  }

  .meeting-button {
    width: 100%;
  }

  .status-pill {
    max-width: 145px;
    text-align: center;
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 19. `src/styles/animations.css`

```css
@keyframes pageEnter {
  from {
    opacity: 0;
    transform: translateY(26px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes badgeFloat {
  from {
    translate: 0 0;
  }
  to {
    translate: 0 -3px;
  }
}

.page-enter {
  animation: pageEnter 720ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
}

.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition:
    opacity 680ms cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 680ms cubic-bezier(0.2, 0.8, 0.2, 1);
  will-change: opacity, transform;
}

.reveal-visible {
  opacity: 1;
  transform: translateY(0);
}
```

## 20. `src/main.jsx`

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { BrowserRouter } from "react-router";
import App from "./App";
import "./styles/global.css";
import "./styles/animations.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider value={defaultSystem}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
);
```

## 21. `package.json`

```json
{
  "name": "leonel-pobre-portfolio",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "oxlint src"
  },
  "dependencies": {
    "@chakra-ui/react": "^3.36.0",
    "@emotion/react": "^11.14.0",
    "react": "^19.2.7",
    "react-dom": "^19.2.7",
    "react-router": "^7.18.0"
  },
  "devDependencies": {
    "@types/react": "^19.2.17",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.2",
    "oxlint": "^1.69.0",
    "vite": "^8.1.0"
  }
}
```

## 22. `vite.config.js`

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
```

## 23. `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="Portfolio of Leonel Pobre, Software Developer and AI Automation specialist."
    />
    <meta name="theme-color" content="#090b14" />
    <title>Leonel Pobre | Software Developer & AI Automation</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

## 24. `README.md`

```markdown
# Leonel Pobre Portfolio

A responsive dark-mode portfolio for **Leonel Pobre — Software Developer & AI Automation**.

## Main features

- React 19 + Vite 8
- Chakra UI v3 components
- React Router navigation
- Responsive desktop and mobile navigation
- Accessible burger menu with Escape-key support and body scroll lock
- Scroll-to-section route behavior
- IntersectionObserver reveal animations
- Responsive project, experience, skills, and contact layouts
- Placeholder content marked with `TODO` comments

## Requirements

- Node.js 20 or newer
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

## Before publishing

Search the project for `TODO:` and replace the placeholder biography, dates, links, contact details, avatar, and project content.
```

## Running the project

1. Open a terminal in the `leonel-portfolio` folder.
2. Confirm Node.js 20 or newer with `node -v`.
3. Install packages with `npm install`.
4. Start development mode with `npm run dev`.
5. Open the URL printed by Vite, normally `http://localhost:5173`.

For a production check, run:

```bash
npm run lint
npm run build
npm run preview
```

## Placeholder replacement checklist

Search the project for `TODO:`. Replace the profile image, biography, employment dates and responsibilities, project links, GitHub links, email address, phone number, Calendly URL, and the additional skill placeholder.

## Theme update

The current project includes `src/components/ui/color-mode.jsx` and `src/components/common/ThemeToggle.jsx`. Dark mode is the default, light mode is optional, and the selection is saved under `leonel-portfolio-theme`. The mobile navigation is rendered through a React portal and uses a fully opaque background.
