import {
  FiFacebook,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiPhone,
} from "react-icons/fi";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfoCard from "@/components/contact/ContactInfoCard";
import SocialLinksGrid from "@/components/contact/SocialLinksGrid";
import PageIntro from "@/components/shared/PageIntro";

const contactInfo = {
  email: "merajbd7@gmail.com",
  phone: "+8801995489248",
  linkedin: "https://www.linkedin.com/in/meraj-ul-islam/",
  github: "https://github.com/buildwithmeraj",
  facebook: "https://www.facebook.com/meraj.bd.96",
};

const socialLinks = [
  { icon: FiLinkedin, label: "LinkedIn", href: contactInfo.linkedin },
  { icon: FiGithub, label: "GitHub", href: contactInfo.github },
  { icon: FiFacebook, label: "Facebook", href: contactInfo.facebook },
];

const ContactPage = () => {
  return (
    <section className="mx-auto space-y-6 py-2 md:space-y-8">
      <PageIntro
        title="Get in Touch"
        description="Have a project or collaboration idea? I'd love to hear from you. Reach out anytime."
        className="max-w-2xl"
      />
      <div className="flex gap-4 lg:gap-6 flex-col lg:flex-row">
        <div className="lg:flex-1">
          <ContactForm />
        </div>

        <aside className="space-y-4 lg:flex-1">
          <h2 className="reveal text-2xl font-semibold">Contact Information</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <ContactInfoCard
              href={`mailto:${contactInfo.email}`}
              icon={FiMail}
              label="Email"
              value={contactInfo.email}
            />
            <ContactInfoCard
              href={`tel:${contactInfo.phone}`}
              icon={FiPhone}
              label="Phone"
              value={contactInfo.phone}
            />
          </div>

          <h2 className="reveal mb-4 text-2xl font-semibold">Social Links</h2>
          <SocialLinksGrid links={socialLinks} />
        </aside>
      </div>
    </section>
  );
};

export default ContactPage;
