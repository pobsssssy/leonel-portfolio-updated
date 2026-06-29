import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import Reveal from "../common/Reveal";
import SectionHeading from "../common/SectionHeading";

const skills = [
  {
    name: ".NET",
    shortName: ".NET",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dot-net/dot-net-original.svg",
  },
  {
    name: "C#",
    shortName: "C#",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg",
  },
  {
    name: "VB.NET",
    shortName: "VB",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/visualbasic/visualbasic-original.svg",
  },
  {
    name: "Microsoft SQL Server",
    shortName: "SQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-original.svg",
  },
  {
    name: "MySQL",
    shortName: "MySQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
  },
  {
    name: "GitHub",
    shortName: "GH",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
  },
  {
    name: "Microsoft Azure",
    shortName: "AZ",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
  },
  {
    name: "Firebase",
    shortName: "FB",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg",
  },
  {
    name: "n8n",
    shortName: "n8n",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/n8n.svg",
  },
  {
    name: "API Integration",
    shortName: "API",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/openapiinitiative.svg",
  },
  {
    name: "Webhooks",
    shortName: "WH",
    type: "webhook",
  },
  {
    name: "Design Patterns",
    shortName: "DP",
    type: "pattern",
  },
];

const skillGroups = [
  {
    label: "Development",
    value: ".NET, C#, VB.NET and software design patterns",
  },
  {
    label: "Data",
    value: "Microsoft SQL Server, MySQL and Firebase",
  },
  {
    label: "Integration",
    value: "APIs, webhooks, Azure and workflow automation",
  },
  {
    label: "Automation",
    value: "N8N",
  },
];

const firstRow = skills.slice(0, 6);
const secondRow = skills.slice(6);

function CustomSkillIcon({ type }) {
  if (type === "webhook") {
    return (
      <Box
        as="svg"
        viewBox="0 0 24 24"
        width="42px"
        height="42px"
        color="#14b8a6"
        aria-hidden="true"
      >
        <circle
          cx="7"
          cy="7"
          r="3"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />

        <circle
          cx="17"
          cy="7"
          r="3"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />

        <circle
          cx="12"
          cy="17"
          r="3"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />

        <path
          d="M9.8 8.7 11 14M14.2 8.7 13 14M10 17H7"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </Box>
    );
  }

  return (
    <Box
      as="svg"
      viewBox="0 0 24 24"
      width="42px"
      height="42px"
      color="#7c3aed"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="8" height="8" rx="2" fill="currentColor" />

      <rect
        x="14"
        y="2"
        width="8"
        height="8"
        rx="2"
        fill="currentColor"
        opacity="0.55"
      />

      <rect
        x="2"
        y="14"
        width="8"
        height="8"
        rx="2"
        fill="currentColor"
        opacity="0.55"
      />

      <rect x="14" y="14" width="8" height="8" rx="2" fill="currentColor" />
    </Box>
  );
}

function SkillLogo({ skill }) {
  const [imageFailed, setImageFailed] = useState(false);

  if (!skill.logo || imageFailed) {
    if (skill.type) {
      return <CustomSkillIcon type={skill.type} />;
    }

    return (
      <Flex
        width="44px"
        height="44px"
        align="center"
        justify="center"
        borderRadius="10px"
        background="linear-gradient(135deg, #7c3aed, #14b8a6)"
        color="white"
        fontWeight="800"
        fontSize="0.75rem"
      >
        {skill.shortName}
      </Flex>
    );
  }

  return (
    <Image
      src={skill.logo}
      alt={`${skill.name} logo`}
      width="44px"
      height="44px"
      maxW="44px"
      maxH="44px"
      objectFit="contain"
      display="block"
      onError={() => setImageFailed(true)}
    />
  );
}

function SkillCard({ skill, duplicate = false }) {
  return (
    <Flex
      as="article"
      className="skill-carousel-card"
      flex="0 0 auto"
      width={{ base: "170px", sm: "190px", md: "210px" }}
      minH={{ base: "78px", md: "86px" }}
      align="center"
      gap="0.85rem"
      padding={{ base: "0.75rem", md: "0.9rem" }}
      border="1px solid var(--border-color)"
      borderRadius="1rem"
      background="var(--background-primary)"
      boxShadow="0 12px 30px rgba(0, 0, 0, 0.16)"
      position="relative"
      overflow="hidden"
      aria-hidden={duplicate ? "true" : undefined}
      tabIndex={duplicate ? -1 : 0}
    >
      <Flex
        width="54px"
        height="54px"
        minW="54px"
        align="center"
        justify="center"
        borderRadius="0.85rem"
        background="rgba(255, 255, 255, 0.96)"
        padding="0.35rem"
        position="relative"
        zIndex="1"
      >
        <SkillLogo skill={skill} />
      </Flex>

      <Box minW="0" position="relative" zIndex="1">
        <Text
          color="var(--text-primary)"
          fontWeight="700"
          fontSize={{ base: "0.82rem", md: "0.92rem" }}
          lineHeight="1.25"
        >
          {skill.name}
        </Text>

        <Text
          mt="0.2rem"
          color="var(--text-muted)"
          fontSize="0.68rem"
          textTransform="uppercase"
          letterSpacing="0.06em"
        >
          Technology
        </Text>
      </Box>
    </Flex>
  );
}

function SkillCarouselRow({ items, reverse = false }) {
  return (
    <Box
      className={`skill-marquee ${reverse ? "skill-marquee-reverse" : ""}`}
      role="list"
    >
      <Flex className="skill-marquee-track">
        <Flex className="skill-marquee-set">
          {items.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </Flex>

        <Flex className="skill-marquee-set" aria-hidden="true">
          {items.map((skill) => (
            <SkillCard
              key={`${skill.name}-duplicate`}
              skill={skill}
              duplicate
            />
          ))}
        </Flex>
      </Flex>
    </Box>
  );
}

function Skills() {
  return (
    <Box
      as="section"
      id="skills"
      className="section-shell section-shell-alt section-anchor"
    >
      <Container maxW="7xl" px={{ base: "1rem", md: "1.5rem" }}>
        <Reveal>
          <SectionHeading
            eyebrow="04 / SKILLS & TOOLS"
            title="Tools I use to solve problems"
            description="A practical mix of application development, databases, cloud services, integrations, and automation platforms."
          />
        </Reveal>

        <Grid
          templateColumns={{
            base: "minmax(0, 1fr)",
            lg: "310px minmax(0, 1fr)",
          }}
          gap={{ base: "3rem", lg: "4rem" }}
          alignItems="center"
        >
          <Reveal delay={80}>
            <Box>
              {skillGroups.map((group, index) => (
                <Grid
                  key={group.label}
                  templateColumns="48px minmax(0, 1fr)"
                  gap="1rem"
                  py="1.4rem"
                  borderBottom="1px solid var(--border-color)"
                >
                  <Text
                    color="#f4c95d"
                    fontSize="0.75rem"
                    fontFamily="monospace"
                    pt="0.15rem"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </Text>

                  <Box minW="0">
                    <Heading
                      as="h3"
                      color="var(--text-primary)"
                      fontSize="1.1rem"
                    >
                      {group.label}
                    </Heading>

                    <Text
                      mt="0.5rem"
                      color="var(--text-muted)"
                      lineHeight="1.7"
                      fontSize="0.95rem"
                    >
                      {group.value}
                    </Text>
                  </Box>
                </Grid>
              ))}
            </Box>
          </Reveal>

          <Reveal delay={160}>
            <Box
              width="100%"
              minW="0"
              overflow="hidden"
              border="1px solid var(--border-color)"
              borderRadius={{ base: "1.25rem", md: "1.75rem" }}
              background="var(--background-secondary)"
              boxShadow="0 24px 70px rgba(0, 0, 0, 0.2)"
              py={{ base: "1.25rem", md: "1.75rem" }}
            >
              <Box px={{ base: "1rem", md: "1.5rem" }} mb="1.5rem">
                <Text
                  color="#14b8a6"
                  fontSize="0.75rem"
                  fontWeight="800"
                  letterSpacing="0.14em"
                >
                  TECHNOLOGY STACK
                </Text>

                <Heading
                  as="h3"
                  mt="0.35rem"
                  color="var(--text-primary)"
                  fontSize={{ base: "1.45rem", md: "1.8rem" }}
                >
                  Technologies behind my work
                </Heading>

                <Text mt="0.45rem" color="var(--text-muted)">
                  Hover over the carousel to pause the movement.
                </Text>
              </Box>

              <Flex direction="column" gap="1rem" overflow="hidden">
                <SkillCarouselRow items={firstRow} />

                <SkillCarouselRow items={secondRow} reverse />
              </Flex>
            </Box>
          </Reveal>
        </Grid>
      </Container>
    </Box>
  );
}

export default Skills;