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
              <Text mt="1.4rem" color="var(--text-primary)" fontWeight="800" fontSize="1.25rem" textAlign="center">
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
              <Heading as="h3" color="var(--text-primary)" fontSize={{ base: "1.55rem", md: "2rem" }} letterSpacing="-0.03em">
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
                  <Text color="var(--text-primary)">Business Software & Integrations</Text>
                </Box>
                <Box className="mini-info-card">
                  <Text className="mini-info-label">Currently learning</Text>
                  <Text color="var(--text-primary)">AI Agents & Lead Automation</Text>
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
