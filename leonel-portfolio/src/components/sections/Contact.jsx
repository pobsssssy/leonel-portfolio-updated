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
              <Heading as="h3" color="var(--text-primary)" fontSize="1.4rem" mb="1.5rem">
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
