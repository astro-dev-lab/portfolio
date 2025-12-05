"use client";

import { useState } from "react";
import { DEMOS } from "@/lib/constants";
import { Button, Card, Badge } from "@/components/ui";
import Link from "next/link";

const demo = DEMOS.find((d) => d.id === "portfolio")!;

const caseStudies = [
  {
    id: "saas-redesign",
    title: "SaaS Platform Redesign",
    client: "CloudTech Solutions",
    industry: "B2B Software",
    duration: "8 weeks",
    thumbnail: "🚀",
    color: "from-violet-500 to-purple-600",
    metrics: [
      { label: "Conversion Rate", before: "2.1%", after: "4.8%", change: "+129%" },
      { label: "User Retention", before: "45%", after: "72%", change: "+60%" },
      { label: "Support Tickets", before: "340/mo", after: "120/mo", change: "-65%" },
    ],
    challenge: "CloudTech's platform had an outdated UI causing high churn rates and poor conversion from trial to paid users.",
    solution: "Complete UX overhaul with modern design system, streamlined onboarding, and intuitive dashboard.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Prisma"],
    process: [
      { phase: "Discovery", desc: "User interviews, analytics review, competitive analysis" },
      { phase: "Design", desc: "Wireframes, prototypes, design system creation" },
      { phase: "Development", desc: "Component library, feature implementation, testing" },
      { phase: "Launch", desc: "Staged rollout, A/B testing, performance monitoring" },
    ],
  },
  {
    id: "ecommerce-build",
    title: "E-Commerce Platform Build",
    client: "StyleHouse Fashion",
    industry: "Retail",
    duration: "12 weeks",
    thumbnail: "🛍️",
    color: "from-emerald-500 to-teal-600",
    metrics: [
      { label: "Monthly Revenue", before: "$45K", after: "$180K", change: "+300%" },
      { label: "Cart Abandonment", before: "78%", after: "42%", change: "-46%" },
      { label: "Mobile Sales", before: "20%", after: "58%", change: "+190%" },
    ],
    challenge: "Legacy Shopify store couldn't handle customization needs and had poor mobile experience.",
    solution: "Custom headless commerce solution with optimized checkout and personalized recommendations.",
    techStack: ["Next.js", "Shopify Storefront API", "Tailwind", "Stripe", "Algolia"],
    process: [
      { phase: "Research", desc: "Customer journey mapping, pain point identification" },
      { phase: "Architecture", desc: "Headless setup, API integrations, payment flows" },
      { phase: "Build", desc: "Custom storefront, admin panel, analytics dashboard" },
      { phase: "Optimize", desc: "Performance tuning, SEO, conversion optimization" },
    ],
  },
  {
    id: "ai-integration",
    title: "AI-Powered Support System",
    client: "TechStart Inc",
    industry: "Technology",
    duration: "6 weeks",
    thumbnail: "🤖",
    color: "from-pink-500 to-rose-600",
    metrics: [
      { label: "Response Time", before: "4 hours", after: "30 sec", change: "-99%" },
      { label: "Resolution Rate", before: "65%", after: "89%", change: "+37%" },
      { label: "Cost per Ticket", before: "$12", after: "$2", change: "-83%" },
    ],
    challenge: "Growing support volume overwhelming small team, leading to slow responses and customer frustration.",
    solution: "AI chatbot with knowledge base integration, smart routing, and human handoff capabilities.",
    techStack: ["OpenAI GPT-4", "LangChain", "Pinecone", "Next.js", "WebSocket"],
    process: [
      { phase: "Data Prep", desc: "Knowledge base structuring, training data collection" },
      { phase: "AI Setup", desc: "Model fine-tuning, prompt engineering, testing" },
      { phase: "Integration", desc: "Widget development, CRM connection, routing logic" },
      { phase: "Training", desc: "Team onboarding, feedback loops, continuous improvement" },
    ],
  },
];

export default function PortfolioDemo() {
  const [selectedStudy, setSelectedStudy] = useState<string | null>(null);

  const study = caseStudies.find((s) => s.id === selectedStudy);

  if (study) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <div className={`bg-gradient-to-r ${study.color} text-white py-20`}>
          <div className="max-w-5xl mx-auto px-4">
            <button onClick={() => setSelectedStudy(null)} className="text-white/80 hover:text-white mb-6 flex items-center gap-2">
              ← Back to Case Studies
            </button>
            <Badge variant="default" className="mb-4">{study.industry}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{study.title}</h1>
            <p className="text-xl text-white/80">{study.client} • {study.duration}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-20 mb-12">
            {study.metrics.map((metric) => (
              <Card key={metric.label} className="text-center">
                <p className="text-sm text-gray-500 mb-2">{metric.label}</p>
                <div className="flex items-center justify-center gap-3 mb-2">
                  <span className="text-gray-400 line-through">{metric.before}</span>
                  <span className="text-2xl font-bold text-gray-900">{metric.after}</span>
                </div>
                <Badge variant="success" size="md">{metric.change}</Badge>
              </Card>
            ))}
          </div>

          {/* Challenge & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card>
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-red-500">⚠️</span> The Challenge
              </h3>
              <p className="text-gray-600">{study.challenge}</p>
            </Card>
            <Card>
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-emerald-500">✓</span> The Solution
              </h3>
              <p className="text-gray-600">{study.solution}</p>
            </Card>
          </div>

          {/* Process */}
          <Card className="mb-12">
            <h3 className="font-bold text-gray-900 mb-6">Development Process</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {study.process.map((step, i) => (
                <div key={step.phase} className="relative">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${study.color} text-white flex items-center justify-center font-bold text-sm`}>
                      {i + 1}
                    </div>
                    <span className="font-semibold text-gray-900">{step.phase}</span>
                  </div>
                  <p className="text-sm text-gray-600 pl-11">{step.desc}</p>
                  {i < study.process.length - 1 && (
                    <div className="hidden md:block absolute top-4 left-8 w-full h-0.5 bg-gray-200 -z-10" />
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Tech Stack */}
          <Card>
            <h3 className="font-bold text-gray-900 mb-4">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {study.techStack.map((tech) => (
                <Badge key={tech} variant="info" size="md">{tech}</Badge>
              ))}
            </div>
          </Card>

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Interested in similar results for your project?</p>
            <Button size="lg">Let&apos;s Talk</Button>
          </div>
        </div>

        {/* Footer Nav */}
        <div className="bg-white border-t py-8">
          <div className="max-w-5xl mx-auto px-4">
            <Link href="/" className="text-violet-600 hover:underline">← Back to Demo Gallery</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-900 via-violet-900 to-indigo-900 text-white py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <Badge variant="default" className="mb-4">Portfolio Demo</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Case Study Hub</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Not just projects — strategic solutions with measurable business outcomes. 
            Each case study is a mini whitepaper showing process, decisions, and results.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((study) => (
            <Card
              key={study.id}
              hover
              padding="none"
              className="cursor-pointer overflow-hidden"
              onClick={() => setSelectedStudy(study.id)}
            >
              <div className={`h-32 bg-gradient-to-br ${study.color} flex items-center justify-center`}>
                <span className="text-5xl">{study.thumbnail}</span>
              </div>
              <div className="p-6">
                <Badge variant="default" size="sm">{study.industry}</Badge>
                <h3 className="text-lg font-bold text-gray-900 mt-2">{study.title}</h3>
                <p className="text-sm text-gray-500">{study.client}</p>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Key Result:</span>
                    <Badge variant="success">{study.metrics[0].change}</Badge>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Why This Format */}
        <Card className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Why Case Studies Matter</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "📊", title: "Measurable Results", desc: "Real metrics showing business impact" },
              { icon: "🔍", title: "Process Transparency", desc: "See how problems were solved" },
              { icon: "🎯", title: "Relevant Context", desc: "Understand the challenges faced" },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <span className="text-3xl">{item.icon}</span>
                <h3 className="font-semibold text-gray-900 mt-2">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Back Link */}
        <div className="mt-8">
          <Link href="/" className="text-violet-600 hover:underline">← Back to Demo Gallery</Link>
        </div>
      </div>
    </div>
  );
}
