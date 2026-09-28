import { Footer } from "@/components/sections/Footer";
import { ActivitiesSection } from "@/components/sections/Activities";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { MembersSection } from "@/components/sections/Members";
import { MembershipSection } from "@/components/sections/Membership";
import { NetworkExperience } from "@/components/sections/NetworkExperience";
import { NetworkStrip } from "@/components/sections/NetworkStrip";
import { PartnershipSection } from "@/components/sections/Partnership";
import { ValueSection } from "@/components/sections/Value";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="contenu">
        <Hero />
        <NetworkStrip />
        <ValueSection />
        <ActivitiesSection />
        <MembersSection />
        <NetworkExperience />
        <MembershipSection />
        <PartnershipSection />
      </main>
      <Footer />
    </>
  );
}
