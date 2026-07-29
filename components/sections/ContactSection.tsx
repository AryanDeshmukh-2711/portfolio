import { ContactForm } from "@/components/ContactForm";
import { Section } from "@/components/Section";

export function ContactSection() {
  return (
    <Section id="contact" lead="Let's work" trail="Together" last>
      <ContactForm />
    </Section>
  );
}
