"use client";

import { useState } from "react";
import { DEMOS, DEMO_CATEGORIES, SITE_CONFIG } from "@/lib/constants";
import { DemoGrid } from "@/components/demos/DemoCard";
import { Button } from "@/components/ui";

const CAPABILITIES = [
  {
    title: "Platform Architecture",
    description: "Designing and implementing scalable multi-tenant systems with enterprise-grade security, authentication, and compliance controls.",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Redis", "AWS"],
  },
  {
    title: "API Design & Integration",
    description: "Building robust RESTful and GraphQL APIs with comprehensive documentation, versioning strategies, and third-party integrations.",
    technologies: ["REST", "GraphQL", "OpenAPI", "Webhooks", "OAuth 2.0"],
  },
  {
    title: "Data Systems",
    description: "Implementing data pipelines, real-time analytics, and visualization systems for data-driven decision making.",
    technologies: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch", "D3.js"],
  },
  {
    title: "Cloud Infrastructure",
    description: "Deploying and managing cloud-native applications with containerization, orchestration, and CI/CD automation.",
    technologies: ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
  },
  {
    title: "AI/ML Integration",
    description: "Integrating machine learning models and AI services into production applications for intelligent automation.",
    technologies: ["OpenAI", "LangChain", "Python", "TensorFlow", "Vector DBs"],
  },
  {
    title: "Performance Engineering",
    description: "Optimizing application performance through profiling, caching strategies, and architectural improvements.",
    technologies: ["Lighthouse", "WebVitals", "CDN", "Edge Computing", "SSR"],
  },
];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredDemos = activeFilter === "all" 
    ? DEMOS 
    : DEMOS.filter(demo => demo.category === activeFilter);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center border-b border-[#E5E7EB] bg-cover bg-center bg-no-repeat before:content-[''] before:absolute before:inset-0 before:bg-black/50 before:z-[1]"
        style={{ backgroundImage: "url('/hero.png')" }}
      >
        {/* Content */}
        <div className="relative z-[2] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold text-white uppercase tracking-widest mb-6 animate-fade-in">
              Full-Stack Engineering
            </p>
            <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-8">
              Enterprise-Grade Systems
              <span className="block text-white mt-2">Architected for Scale</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-12 leading-relaxed drop-shadow-md">
              Senior full-stack engineer delivering production-ready solutions for complex business requirements. 
              Specializing in scalable architectures, performance optimization, and enterprise integrations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="#contact" size="lg" className="shadow-lg hover:shadow-xl transition-shadow bg-white text-[#0A0A0A] hover:bg-gray-100">
                Start a Conversation
              </Button>
              <Button variant="outline" href="#work" size="lg" className="border-white text-white hover:bg-white/10 backdrop-blur-sm">
                View Case Studies
              </Button>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2] animate-bounce">
          <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Metrics Bar */}
      <section className="bg-[#0A0A0A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl md:text-4xl font-semibold tracking-tight">12+</div>
              <div className="text-sm text-[#9CA3AF] mt-1">Production Systems</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-semibold tracking-tight">6</div>
              <div className="text-sm text-[#9CA3AF] mt-1">Architecture Domains</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-semibold tracking-tight">99.9%</div>
              <div className="text-sm text-[#9CA3AF] mt-1">Uptime Standard</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-semibold tracking-tight">10+</div>
              <div className="text-sm text-[#9CA3AF] mt-1">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="work" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-sm font-medium text-[#6B7280] uppercase tracking-wider mb-3">
              Case Studies
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#0A0A0A] tracking-tight mb-4">
              Production-Ready Systems
            </h2>
            <p className="text-lg text-[#4B5563]">
              Each case study demonstrates architectural patterns, technical decisions, 
              and measurable outcomes for enterprise-grade applications.
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-10 border-b border-[#E5E7EB] pb-6">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 text-sm font-medium transition-colors rounded ${
                activeFilter === "all"
                  ? "bg-[#0A0A0A] text-white"
                  : "text-[#6B7280] hover:text-[#0A0A0A] hover:bg-[#F3F4F6]"
              }`}
            >
              All Systems
            </button>
            {Object.entries(DEMO_CATEGORIES).map(([key, cat]) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`px-4 py-2 text-sm font-medium transition-colors rounded ${
                  activeFilter === key
                    ? "bg-[#0A0A0A] text-white"
                    : "text-[#6B7280] hover:text-[#0A0A0A] hover:bg-[#F3F4F6]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Case Study Grid */}
          <DemoGrid demos={filteredDemos} />
          
          {/* Section CTA */}
          <div className="mt-16 text-center">
            <p className="text-[#6B7280] mb-4">Looking for a specific solution?</p>
            <Button href="#contact" size="lg">
              Discuss Your Project
            </Button>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities" className="py-20 md:py-28 bg-white border-y border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <p className="text-sm font-medium text-[#6B7280] uppercase tracking-wider mb-3">
              Technical Capabilities
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#0A0A0A] tracking-tight mb-4">
              Engineering Expertise
            </h2>
            <p className="text-lg text-[#4B5563]">
              Deep expertise across the full stack, from infrastructure and APIs 
              to front-end systems and data architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CAPABILITIES.map((capability) => (
              <div key={capability.title} className="bg-white/60 backdrop-blur-sm border border-[#E5E7EB]/50 rounded-xl p-6 hover:border-[#9CA3AF] hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <h3 className="text-lg font-semibold text-[#0A0A0A] mb-3">{capability.title}</h3>
                <p className="text-sm text-[#4B5563] mb-4 leading-relaxed">{capability.description}</p>
                <div className="flex flex-wrap gap-2">
                  {capability.technologies.map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-[#F3F4F6]/80 text-[#374151] text-xs rounded-md">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Section CTA */}
          <div className="mt-16 text-center">
            <Button href="#contact" size="lg">
              Let&apos;s Build Something
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="text-sm font-medium text-[#6B7280] uppercase tracking-wider mb-3">
                About
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold text-[#0A0A0A] tracking-tight mb-6">
                Building Systems That Scale
              </h2>
              <div className="prose prose-lg text-[#4B5563] max-w-none">
                <p className="mb-4 leading-relaxed">
                  I architect and build enterprise-grade software systems with a focus on scalability, 
                  maintainability, and long-term operational efficiency. My approach combines rigorous 
                  engineering principles with pragmatic delivery.
                </p>
                <p className="mb-4 leading-relaxed">
                  With experience across SaaS platforms, e-commerce systems, real-time applications, 
                  and data pipelines, I bring a comprehensive understanding of how modern software 
                  systems interconnect and scale.
                </p>
                <p className="leading-relaxed">
                  Every project I undertake follows a systematic process: thorough requirements analysis, 
                  careful architectural design, rigorous implementation, and comprehensive documentation. 
                  The goal is always to deliver systems that teams can maintain and extend confidently.
                </p>
              </div>
            </div>
            
            <div className="lg:col-span-5">
              <div className="bg-white/70 backdrop-blur-sm border border-[#E5E7EB]/50 rounded-xl p-8 shadow-lg">
                <h3 className="text-lg font-semibold text-[#0A0A0A] mb-6">Core Principles</h3>
                <ul className="space-y-4">
                  {[
                    { title: "Architecture First", desc: "Systematic design before implementation" },
                    { title: "Scalability by Design", desc: "Systems that grow with business needs" },
                    { title: "Documentation Standards", desc: "Clear documentation for maintainability" },
                    { title: "Performance Optimization", desc: "Measured improvements, not guesswork" },
                    { title: "Security Baseline", desc: "Enterprise security from day one" },
                  ].map((principle) => (
                    <li key={principle.title} className="flex gap-4 group">
                      <svg className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <p className="font-medium text-[#0A0A0A]">{principle.title}</p>
                        <p className="text-sm text-[#6B7280]">{principle.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* About CTA */}
              <div className="mt-8">
                <Button href="#contact" size="lg" className="w-full">
                  Work With Me
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-28 bg-[#0A0A0A] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold text-[#9CA3AF] uppercase tracking-widest mb-4">
            Ready to Build?
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Let&apos;s Start a Conversation
          </h2>
          <p className="text-lg md:text-xl text-[#9CA3AF] mb-12 max-w-2xl mx-auto leading-relaxed">
            Whether you need a complete platform build, architectural consulting, 
            or technical leadership for your next project, I&apos;m available to discuss your requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={`mailto:${SITE_CONFIG.email}`}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-white text-[#0A0A0A] rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Send an Email
            </a>
            <a 
              href={SITE_CONFIG.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold border-2 border-[#374151] text-white rounded-lg hover:bg-[#1F2937] transition-all duration-300"
            >
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View GitHub
            </a>
          </div>
          
          {/* Email badge */}
          <div className="mt-10 pt-8 border-t border-[#1F2937]">
            <p className="text-sm text-[#6B7280] mb-2">Direct email</p>
            <a 
              href={`mailto:${SITE_CONFIG.email}`}
              className="text-white hover:text-gray-300 transition-colors font-mono text-lg"
            >
              {SITE_CONFIG.email}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
