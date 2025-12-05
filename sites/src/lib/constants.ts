export const SITE_CONFIG = {
  name: "Demetrius",
  tagline: "Enterprise-Grade Full-Stack Systems",
  description: "Architected for performance, reliability, and scale. Senior full-stack engineer delivering production-ready enterprise solutions.",
  author: "Demetrius",
  github: "https://github.com/astro-dev-lab",
  email: "peaceiam4now@gmail.com",
  linkedin: "https://linkedin.com/in/demetrius",
};

export const DEMO_CATEGORIES = {
  platform: { name: "Platform", color: "#0A0A0A" },
  infrastructure: { name: "Infrastructure", color: "#111827" },
  intelligence: { name: "Intelligence", color: "#1F2937" },
  operations: { name: "Operations", color: "#374151" },
  experience: { name: "Experience", color: "#4B5563" },
  integration: { name: "Integration", color: "#6B7280" },
};

export interface Demo {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: keyof typeof DEMO_CATEGORIES;
  techStack: string[];
  features: string[];
  path: string;
  metrics: {
    label: string;
    value: string;
  }[];
  businessValue: string;
}

export const DEMOS: Demo[] = [
  {
    id: "enterprise-platform",
    title: "Enterprise Platform",
    subtitle: "Multi-tenant SaaS Architecture",
    description: "Complete enterprise platform with multi-tenant architecture, SSO authentication, role-based access control, and compliance-ready audit logging.",
    category: "platform",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Redis"],
    features: ["Multi-tenant isolation", "SSO/SAML integration", "RBAC system", "Audit logging", "Compliance dashboard"],
    path: "/demos/saas",
    metrics: [
      { label: "Uptime SLA", value: "99.99%" },
      { label: "Auth latency", value: "<50ms" },
    ],
    businessValue: "Enterprise-grade architecture pattern for B2B SaaS products requiring SOC 2 compliance",
  },
  {
    id: "commerce-engine",
    title: "Commerce Engine",
    subtitle: "High-Performance E-Commerce",
    description: "Scalable commerce platform with inventory management, real-time pricing, cart optimization, and payment processing integration.",
    category: "platform",
    techStack: ["Next.js", "TypeScript", "Stripe", "Algolia"],
    features: ["Product catalog", "Inventory sync", "Cart optimization", "Payment processing", "Order management"],
    path: "/demos/ecommerce",
    metrics: [
      { label: "Page load", value: "<1.2s" },
      { label: "Conversion lift", value: "+34%" },
    ],
    businessValue: "Production-ready commerce architecture supporting high-volume transaction processing",
  },
  {
    id: "portfolio-system",
    title: "Case Study System",
    subtitle: "Strategic Portfolio Architecture",
    description: "Structured case study platform with measurable outcomes, process documentation, and interactive prototypes for enterprise client presentations.",
    category: "experience",
    techStack: ["Next.js", "MDX", "Framer Motion", "Analytics"],
    features: ["Case study format", "Metrics visualization", "Process timeline", "Interactive prototypes"],
    path: "/demos/portfolio",
    metrics: [
      { label: "Engagement", value: "+280%" },
      { label: "Time on page", value: "4.2min" },
    ],
    businessValue: "Differentiated portfolio presentation that demonstrates measurable business impact",
  },
  {
    id: "resume-intelligence",
    title: "Resume Intelligence",
    subtitle: "AI-Powered Document Analysis",
    description: "Intelligent document processing system with NLP analysis, keyword extraction, scoring algorithms, and optimization recommendations.",
    category: "intelligence",
    techStack: ["Next.js", "OpenAI", "PDF Processing", "NLP"],
    features: ["Document parsing", "AI analysis", "Score computation", "Recommendations", "Export system"],
    path: "/demos/ai-resume",
    metrics: [
      { label: "Processing time", value: "<3s" },
      { label: "Accuracy", value: "94%" },
    ],
    businessValue: "Demonstrates AI integration patterns for document analysis and intelligent automation",
  },
  {
    id: "content-engine",
    title: "Content Engine",
    subtitle: "AI Content Generation Platform",
    description: "Enterprise content generation system with template management, tone calibration, multi-format export, and brand consistency controls.",
    category: "intelligence",
    techStack: ["Next.js", "GPT-4", "Template Engine", "Export API"],
    features: ["Template library", "AI generation", "Tone calibration", "Multi-format export", "Brand controls"],
    path: "/demos/ai-content",
    metrics: [
      { label: "Generation time", value: "<5s" },
      { label: "Time saved", value: "10hrs/wk" },
    ],
    businessValue: "Scalable content operations architecture for marketing and communications teams",
  },
  {
    id: "analytics-platform",
    title: "Analytics Platform",
    subtitle: "Real-Time Data Visualization",
    description: "Enterprise analytics dashboard with real-time data streams, role-based views, custom reporting, and export capabilities.",
    category: "operations",
    techStack: ["Next.js", "D3.js", "WebSockets", "PostgreSQL"],
    features: ["Real-time charts", "Data tables", "Role-based views", "Custom reports", "Alert system"],
    path: "/demos/dashboard",
    metrics: [
      { label: "Data latency", value: "<100ms" },
      { label: "Query speed", value: "<200ms" },
    ],
    businessValue: "Production-ready analytics architecture for data-driven decision making",
  },
  {
    id: "project-management",
    title: "Project Management",
    subtitle: "Enterprise Resource Planning",
    description: "Complete business management system with client management, project tracking, resource allocation, time logging, and invoicing.",
    category: "operations",
    techStack: ["Next.js", "Prisma", "PostgreSQL", "File Storage"],
    features: ["Client management", "Project tracking", "Resource allocation", "Time logging", "Invoicing"],
    path: "/demos/crud",
    metrics: [
      { label: "Efficiency gain", value: "+45%" },
      { label: "Data accuracy", value: "99.9%" },
    ],
    businessValue: "Enterprise resource planning architecture replacing legacy SaaS dependencies",
  },
  {
    id: "collaboration-platform",
    title: "Collaboration Platform",
    subtitle: "Real-Time Communication System",
    description: "Enterprise messaging platform with channels, direct messaging, file sharing, presence indicators, and message threading.",
    category: "infrastructure",
    techStack: ["Next.js", "WebSockets", "Redis", "S3"],
    features: ["Real-time messaging", "Channel management", "File sharing", "Presence system", "Threading"],
    path: "/demos/realtime",
    metrics: [
      { label: "Message latency", value: "<50ms" },
      { label: "Concurrent users", value: "10K+" },
    ],
    businessValue: "Scalable real-time communication architecture for distributed teams",
  },
  {
    id: "interactive-experience",
    title: "Interactive Experience",
    subtitle: "WebGL Product Visualization",
    description: "High-performance 3D product visualization with interactive controls, scroll-driven animations, and immersive user experiences.",
    category: "experience",
    techStack: ["Three.js", "WebGL", "GSAP", "React"],
    features: ["3D rendering", "Interactive controls", "Scroll animations", "Performance optimization"],
    path: "/demos/creative",
    metrics: [
      { label: "Frame rate", value: "60fps" },
      { label: "Engagement", value: "+520%" },
    ],
    businessValue: "Premium product visualization increasing customer engagement and conversion",
  },
  {
    id: "automation-platform",
    title: "Automation Platform",
    subtitle: "Workflow Orchestration Engine",
    description: "Visual workflow automation with node-based builder, data transformation, API integration, and execution monitoring.",
    category: "integration",
    techStack: ["Next.js", "Node.js", "Queue System", "Webhooks"],
    features: ["Visual builder", "Data transformation", "API integration", "Execution logs", "Scheduling"],
    path: "/demos/automation",
    metrics: [
      { label: "Time saved", value: "20hrs/wk" },
      { label: "Error reduction", value: "95%" },
    ],
    businessValue: "Enterprise automation architecture eliminating manual operational overhead",
  },
  {
    id: "scheduling-system",
    title: "Scheduling System",
    subtitle: "Appointment Management Platform",
    description: "Complete scheduling platform with calendar management, availability optimization, automated reminders, and payment integration.",
    category: "operations",
    techStack: ["Next.js", "Calendar API", "Twilio", "Stripe"],
    features: ["Calendar management", "Availability rules", "Automated reminders", "Payment processing", "Analytics"],
    path: "/demos/booking",
    metrics: [
      { label: "No-show reduction", value: "50%" },
      { label: "Booking efficiency", value: "+65%" },
    ],
    businessValue: "Optimized scheduling architecture reducing operational friction and no-shows",
  },
  {
    id: "social-operations",
    title: "Social Operations",
    subtitle: "Multi-Platform Management",
    description: "Unified social media command center with cross-platform publishing, analytics aggregation, and engagement management.",
    category: "integration",
    techStack: ["Next.js", "API Aggregation", "Scheduling", "Analytics"],
    features: ["Multi-platform sync", "Scheduled publishing", "Analytics dashboard", "Inbox management", "Reports"],
    path: "/demos/social",
    metrics: [
      { label: "Platform coverage", value: "5+" },
      { label: "Time saved", value: "15hrs/wk" },
    ],
    businessValue: "Consolidated social operations reducing tool fragmentation and operational overhead",
  },
];
