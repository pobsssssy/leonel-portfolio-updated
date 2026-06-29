import { Box, Container, Heading, Text } from "@chakra-ui/react";
import { NavLink } from "react-router";

function NotFoundPage() {
  return (
    <Box minH="100vh" display="grid" placeItems="center" bg="var(--bg-primary)" px="1rem">
      <Container maxW="lg" textAlign="center">
        <Text className="section-eyebrow">404 / NOT FOUND</Text>
        <Heading color="var(--text-primary)" fontSize={{ base: "2.5rem", md: "4rem" }} letterSpacing="-0.05em">
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
