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
    tools: [".NET", "VB.NET", "C#","MSSQL", "Design Patterns", "API Integration"],
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

      <Heading as="h3" mt="2rem" color="var(--text-primary)" fontSize={{ base: "1.5rem", md: "1.9rem" }} letterSpacing="-0.03em">
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
