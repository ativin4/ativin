"use client";
import Head from "next/head";
import Lenis from "@studio-freight/lenis";
import { motion } from "framer-motion";
import dynamic from 'next/dynamic';
import { useEffect } from "react";

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
  bg: string;
  children: React.ReactNode;
};

const Section = ({ id, bg, children }: SectionProps) => (
  <section
    id={id}
    className={`bg-[#18181b] snap-start flex items-center justify-center h-screen w-screen overflow-hidden`}
  >
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }}
      viewport={{ once: true, amount: 0.6 }}
      className="px-6 md:px-24 w-full max-w-5xl"
    >
      {children}
    </motion.div>
  </section>
);

export default function Home() {
  // Initialize Lenis once on mount for buttery‑smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // replicate fast full‑page scrolling behaviour seen on hikeys1977.com
    const sections = Array.from(document.querySelectorAll('section')) as HTMLElement[];
    const snapToSection = (deltaY: number) => {
      const current = window.scrollY;
      let target: HTMLElement | null = null;
      if (deltaY > 0) {
        target = sections.find((s) => s.offsetTop > current + 1) || sections[sections.length - 1];
      } else {
        const prev = sections
          .slice()
          .reverse()
          .find((s) => s.offsetTop < current - 1);
        target = prev || sections[0];
      }
      if (target) {
        lenis.scrollTo(target, { duration: 1.2 });
      }
    };

    const wheelHandler = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 1) return;
      e.preventDefault();
      snapToSection(e.deltaY);
    };

    window.addEventListener('wheel', wheelHandler, { passive: false });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      window.removeEventListener('wheel', wheelHandler);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Head>
        <title>Atishay Jain | Portfolio</title>
      </Head>

      <main className="scroll-smooth snap-y snap-mandatory leading-relaxed font-sans text-gray-100 bg-[#18181b] min-h-screen overflow-x-hidden">
        {/* Intro */}
        <Section id="intro" bg="bg-gradient-to-b from-teal-500 to-cyan-700 text-white">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">Atishay&nbsp;Jain</h1>
            <p className="text-lg md:text-2xl max-w-2xl mx-auto">
              Full‑Stack Engineer crafting scalable platforms with React/TypeScript,
              Python/Django.
            </p>
          </div>
        </Section>

        {/* About me, capabilities & visual flare */}
        <Section id="about" bg="bg-gradient-to-b from-purple-600 to-indigo-800 text-white">
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
        <Section id="moveworks" bg="bg-neutral-900 text-white">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-semibold">Moveworks</h2>
            <p className="opacity-80"> Software Engineer • Bengaluru • May 2024 – Present</p>
            <ul className="list-disc pl-6 space-y-3 text-lg md:text-xl">
              <li>Built a customer-facing LLM troubleshooting/explainability platform:
                <ul className="list-disc pl-6 space-y-2">
                  <li>User intent detection, query tracking, plugin selection logic</li>
                  <li>Plugin execution steps, intermediate outputs, citations grounding</li>
                  <li>End‑to‑end reasoning trace per chat turn and human-readable UI flows</li>
                  <li>Modeled multi-step AI execution with partial failures, fallbacks, missing citations</li>
                </ul>
              </li>
              <li>Designed and implemented Entity Catalog platform:
                <ul className="list-disc pl-6 space-y-2">
                  <li>UI/APIs for add/update/delete entities with org‑scoped isolation</li>
                  <li>Metadata used for intent detection & plugin routing</li>
                  <li>Prefix-based cross-catalog search and single‑source migration</li>
                  <li>Migrated consumption from S3 dumps to central service, eliminating delays and Moveflow dependency, enabling same‑day availability</li>
                </ul>
              </li>
              <li>Created internal LLM annotation/evaluation tool:
                <ul className="list-disc pl-6 space-y-2">
                  <li>Annotated logs with answers, synthetic replacements, tags</li>
                  <li>Normalized YAML logs to structured JSON and rendered chat-style conversations</li>
                  <li>Solved complex span-indexing across nested outputs, 100% test coverage including UI hooks</li>
                </ul>
              </li>
              <li>Developed Monaco-based DSL editor platform with ANTLR parsers, real-time validation, context-aware suggestions, test-run workflows and reusable component design.</li>
              <li>Built frontend UI for content ingestion filesystem with hierarchical navigation, lazy loading, conversation modes and Google Drive BFF integration; achieved full frontend test coverage.</li>
            </ul>
          </div>
        </Section>

        {/* Myntra Experience */}
        <Section id="myntra" bg="bg-neutral-900 text-white">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-semibold">Myntra</h2>
            <p className="opacity-80">Software Engineer • Bengaluru • Jun 2021 – May 2024</p>
            <ul className="list-disc pl-6 space-y-3 text-lg md:text-xl">
              <li>Rebuilt Seller Coupon Service UI (micro‑frontend):
                <ul className="list-disc pl-6 space-y-2">
                  <li>Seller opt‑in/opt‑out workflows with async polling</li>
                  <li>Detailed coupon pages, recommendations and multi‑action flows</li>
                  <li>Delivered end‑to‑end in 30 days; supported ~2,500 sellers</li>
                </ul>
              </li>
              <li>Led Seller Onboarding Flow Revamp:
                <ul className="list-disc pl-6 space-y-2">
                  <li>Wizard-based onboarding with GST, bank and address validation (Digio APIs)</li>
                  <li>Used GST data for pin-code validation; internal review UI for parallel verification</li>
                  <li>Reduced TAT from 45 to 7 days</li>
                </ul>
              </li>
              <li>Built compliance-critical Agreement Service:
                <ul className="list-disc pl-6 space-y-2">
                  <li>Dynamic PDF generation, workflow tracking across partners</li>
                  <li>Enforced compliance with auditability and post-signature orchestration</li>
                </ul>
              </li>
              <li>Implemented secure in-app PDF reader to enforce read‑completion tracking (scroll/last‑page visibility).</li>
              <li>Migrated backend service from Java Spring to Spring Boot, improving config management while maintaining compatibility.</li>
              <li>Created internal data copy tool to transfer org data with FK integrity using S3 staging.</li>
            </ul>
          </div>
        </Section>

        {/* Projects */}
        <Section id="projects" bg="bg-neutral-900 text-white">
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
        <Section id="contact" bg="bg-neutral-900 text-gray-800">
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
