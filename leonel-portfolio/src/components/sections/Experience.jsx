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
                  <Heading as="h3" color="var(--text-primary)" fontSize={{ base: "1.45rem", md: "1.8rem" }}>
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
