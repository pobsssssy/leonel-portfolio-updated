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
