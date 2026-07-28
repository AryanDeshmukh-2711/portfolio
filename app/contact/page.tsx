import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageHeading } from "@/components/PageHeading";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell me about the project and I'll get back to you.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="pb-4">
      <PageHeading lead="Let's work" trail="Together" />
      <ContactForm />
    </div>
  );
}
