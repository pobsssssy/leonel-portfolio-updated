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
        color="var(--text-primary)"
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
