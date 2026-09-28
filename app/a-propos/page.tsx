import type { Metadata } from "next";
import { AboutAction } from "@/components/about/Action";
import { AboutAmbition } from "@/components/about/Ambition";
import { AboutApproach } from "@/components/about/Approach";
import { AboutClose } from "@/components/about/Close";
import { AboutCommitment } from "@/components/about/Commitment";
import { AboutEcosystem } from "@/components/about/Ecosystem";
import { AboutIdentity } from "@/components/about/Identity";
import { AboutIntro } from "@/components/about/Intro";
import { AboutMission } from "@/components/about/Mission";
import { AboutValues } from "@/components/about/Values";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";

export const metadata: Metadata = {
  title: "À propos",
  description: "REZO M relie talents, entrepreneurs et organisations. Plus qu’un réseau : connecter, collaborer, réussir.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="contenu">
        <AboutIntro />
        <AboutIdentity />
        <AboutMission />
        <AboutAmbition />
        <AboutValues />
        <AboutEcosystem />
        <AboutAction />
        <AboutApproach />
        <AboutCommitment />
        <AboutClose />
      </main>
      <Footer />
    </>
  );
}
