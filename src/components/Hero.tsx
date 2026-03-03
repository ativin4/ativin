"use client";
import React, { useEffect } from "react";
import Head from "next/head";
import Lenis from "@studio-freight/lenis";
import { motion } from "framer-motion";
import dynamic from 'next/dynamic';

// lazy‑load the 3D developer scene only on the client
const LazyDev3D = dynamic(() => import('@/components/LazyDev3D'), {
  ssr: false,
  loading: () => <div className="h-64 flex items-center justify-center">Loading 3D...</div>,
});

/**
 * Smooth‑scroll portfolio home page inspired by hikeys1977.com.
 * Uses Lenis for inertial scroll + Framer Motion viewport animations.
 * TailwindCSS required (including `scroll-smooth` behaviour).
 */

type SectionProps = {
  id: string;
  children: React.ReactNode;
};

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const Section = ({ id, children }: SectionProps) => (
  <section
    id={id}
    className={`bg-[#18181b] flex items-center justify-center min-h-screen w-screen overflow-hidden py-20`}
  >
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      className="px-6 md:px-24 w-full max-w-5xl"
    >
      {/** wrap each direct child for staggered entrance */}
      {React.Children.map(children, (child) => (
        <motion.div variants={itemVariants}>{child}</motion.div>
      ))}
    </motion.div>
  </section>
);

const moveworksExperience = [
  {
    title: "Built a customer-facing LLM troubleshooting/explainability platform:",
    details: [
      "User intent detection, query tracking, plugin selection logic",
      "Plugin execution steps, intermediate outputs, citations grounding",
      "End‑to‑end reasoning trace per chat turn and human-readable UI flows",
      "Modeled multi-step AI execution with partial failures, fallbacks, missing citations",
    ],
  },
  {
    title: "Designed and implemented Entity Catalog platform:",
    details: [
      "UI/APIs for add/update/delete entities with org‑scoped isolation",
      "Metadata used for intent detection & plugin routing",
      "Prefix-based cross-catalog search and single‑source migration",
      "Migrated consumption from S3 dumps to central service, eliminating delays and Moveflow dependency, enabling same‑day availability",
    ],
  },
  {
    title: "Created internal LLM annotation/evaluation tool:",
    details: [
      "Annotated logs with answers, synthetic replacements, tags",
      "Normalized YAML logs to structured JSON and rendered chat-style conversations",
      "Solved complex span-indexing across nested outputs, 100% test coverage including UI hooks",
    ],
  },
  {
    title: "Developed Monaco-based DSL editor platform with ANTLR parsers, real-time validation, context-aware suggestions, test-run workflows and reusable component design.",
    details: [],
  },
  {
    title: "Built frontend UI for content ingestion filesystem with hierarchical navigation, lazy loading, conversation modes and Google Drive BFF integration; achieved full frontend test coverage.",
    details: [],
  },
];

const myntraExperience = [
  {
    title: "Rebuilt Seller Coupon Service UI (micro‑frontend):",
    details: [
      "Seller opt‑in/opt‑out workflows with async polling",
      "Detailed coupon pages, recommendations and multi‑action flows",
      "Delivered end‑to‑end in 30 days; supported ~2,500 sellers",
    ],
  },
  {
    title: "Led Seller Onboarding Flow Revamp:",
    details: [
      "Wizard-based onboarding with GST, bank and address validation (Digio APIs)",
      "Used GST data for pin-code validation; internal review UI for parallel verification",
      "Reduced TAT from 45 to 7 days",
    ],
  },
  {
    title: "Built compliance-critical Agreement Service:",
    details: [
      "Dynamic PDF generation, workflow tracking across partners",
      "Enforced compliance with auditability and post-signature orchestration",
    ],
  },
  {
    title: "Implemented secure in-app PDF reader to enforce read‑completion tracking (scroll/last‑page visibility).",
    details: [],
  },
  {
    title: "Migrated backend service from Java Spring to Spring Boot, improving config management while maintaining compatibility.",
    details: [],
  },
  {
    title: "Created internal data copy tool to transfer org data with FK integrity using S3 staging.",
    details: [],
  },
];

export default function Home() {
  // Initialize Lenis once on mount for buttery‑smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // Removed manual snap logic to allow for smooth sticky scrolling

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Head>
        <title>Atishay Jain | Portfolio</title>
      </Head>

      <main className="scroll-smooth leading-relaxed font-sans text-gray-100 bg-[#18181b] min-h-screen overflow-x-hidden">
        {/* Intro */}
        <Section id="intro">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">Atishay&nbsp;Jain</h1>
            <p className="text-lg md:text-2xl max-w-2xl mx-auto">
              Full‑Stack Engineer crafting scalable platforms with React/TypeScript,
              Python/Django.
            </p>
          </div>
        </Section>

        {/* About me, capabilities & visual flare */}
        <Section id="about">
          <div className="md:flex md:items-center md:space-x-12">
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-4xl md:text-5xl font-semibold">About Me</h2>
              <p className="text-lg md:text-xl">
                I build interactive experiences and powerful tools for the web. My
                code is influenced by clean abstractions, accessible design, and
                a love of subtle motion & 3D. On a typical day I might be
                debugging a real‑time search index, writing a custom DSL parser,
                or spinning up a new microservice in Go.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-lg md:text-xl">
                <li>React & TypeScript with Framer Motion for expressive UIs</li>
                <li>WebGL / three‑js 3D scenes and interactive canvas experiences</li>
                <li>Backend APIs in Python/Django, Go or Node with clean testing</li>
                <li>DevOps: Docker, Kubernetes, CI/CD pipelines and cloud infra</li>
                <li>Fast learner who thrives in collaborative teams and code reviews</li>
              </ul>
            </div>
            <div className="md:w-1/2 h-64 md:h-96">
              <LazyDev3D />
            </div>
          </div>
        </Section>

        {/* Moveworks Experience */}
        <section id="moveworks" className="w-full py-24 bg-[#18181b]">
          <div className="max-w-5xl mx-auto px-6 md:px-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="md:sticky top-32 h-fit">
              <h2 className="text-4xl md:text-5xl font-semibold mb-2">Moveworks</h2>
              <p className="opacity-80 text-lg">Software Engineer</p>
              <p className="opacity-60">Bengaluru • May 2024 – Present</p>
            </div>
            
            <div className="space-y-16">
              {moveworksExperience.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <h3 className="text-xl md:text-2xl font-medium mb-3 leading-snug">{item.title}</h3>
                  {item.details.length > 0 && (
                    <ul className="list-disc pl-5 space-y-2 text-gray-400 text-base md:text-lg">
                      {item.details.map((detail, i) => (
                        <li key={i}>{detail}</li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Myntra Experience */}
        <section id="myntra" className="w-full py-24 bg-[#18181b]">
          <div className="max-w-5xl mx-auto px-6 md:px-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="md:sticky top-32 h-fit">
              <h2 className="text-4xl md:text-5xl font-semibold mb-2">Myntra</h2>
              <p className="opacity-80 text-lg">Software Engineer</p>
              <p className="opacity-60">Bengaluru • Jun 2021 – May 2024</p>
            </div>
            
            <div className="space-y-16">
              {myntraExperience.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <h3 className="text-xl md:text-2xl font-medium mb-3 leading-snug">{item.title}</h3>
                  {item.details.length > 0 && (
                    <ul className="list-disc pl-5 space-y-2 text-gray-400 text-base md:text-lg">
                      {item.details.map((detail, i) => (
                        <li key={i}>{detail}</li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <Section id="projects">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-semibold">Selected Projects</h2>
            <ul className="list-disc pl-6 space-y-3 text-lg md:text-xl">
              <li>DSA Problem‑Solving Web App (Next.js, Monaco, JS sandbox).</li>
              <li>Personal Portfolio & Blog – <a href="https://atin.dev" className="underline font-medium">atin.dev</a>.</li>
              <li>React Template Editor → PDF generator.</li>
            </ul>
          </div>
        </Section>

        {/* Contact */}
        <Section id="contact">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-6xl font-semibold">Let’s build something!</h2>
            <p className="text-lg md:text-2xl">
              Reach me at <a href="mailto:jain.atishayvin@gmail.com" className="underline font-medium">jain.atishayvin@gmail.com</a>
            </p>
            <div className="flex justify-center gap-10 text-2xl">
              <a href="https://linkedin.com/in/atishayjain4" target="_blank" rel="noopener" className="hover:text-blue-600">LinkedIn</a>
              <a href="https://github.com/ativin4" target="_blank" rel="noopener" className="hover:text-black">GitHub</a>
            </div>
          </div>
        </Section>
      </main>
    </>
  );
}
