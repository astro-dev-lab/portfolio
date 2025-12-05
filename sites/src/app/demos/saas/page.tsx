"use client";

import { useState } from "react";
import { DEMOS } from "@/lib/constants";
import { DemoLayout, DemoSection } from "@/components/demos/DemoLayout";
import { Button, Card, Badge, Input, StatCard, Progress } from "@/components/ui";
import { generateMockChartData, formatCurrency } from "@/lib/utils";

const demo = DEMOS.find((d) => d.id === "enterprise-platform")!;

type View = "landing" | "login" | "signup" | "dashboard" | "billing";

export default function SaaSDemo() {
  const [view, setView] = useState<View>("landing");
  const chartData = generateMockChartData(30);

  if (view === "landing") {
    return <LandingPage onNavigate={setView} />;
  }

  if (view === "login" || view === "signup") {
    return <AuthPage type={view} onNavigate={setView} />;
  }

  if (view === "billing") {
    return <BillingPage onNavigate={setView} />;
  }

  return (
    <DemoLayout demo={demo}>
      <DashboardView data={chartData} onNavigate={setView} />
    </DemoLayout>
  );
}

function LandingPage({ onNavigate }: { onNavigate: (v: View) => void }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Enterprise Hero */}
      <section className="relative overflow-hidden">
        <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="/logo.svg" alt="logo" className="w-10 h-10 object-contain" onError={(e)=>{(e.target as HTMLImageElement).style.display='none'}} />
              <div>
                <div className="text-sm font-semibold text-gray-700">{/* brand line */}NexusOne</div>
                <div className="text-xs text-gray-500">Enterprise infrastructure platform</div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-gray-600 hover:text-gray-900">Platform</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900">Solutions</a>
              <a href="#customers" className="text-gray-600 hover:text-gray-900">Customers</a>
              <button onClick={() => onNavigate("login")} className="text-gray-700 hover:text-gray-900">Sign in</button>
              <Button onClick={() => onNavigate("signup")} className="shadow-sm">Contact Sales</Button>
            </div>
          </div>
        </nav>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <Badge variant="info" size="md">Fortune 500 Trusted</Badge>
              <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mt-6 mb-4">
                Unified enterprise infrastructure platform
              </h1>
              <p className="text-lg text-gray-600 mb-6 max-w-2xl">
                NexusOne provides enterprise-grade infrastructure management, compliance automation, and cross-departmental orchestration. Built for CIOs, CTOs, and enterprise architects managing complex, multi-cloud environments.
              </p>
              <div className="flex gap-4 items-center">
                <Button size="lg" onClick={() => onNavigate("signup")} className="shadow">Schedule Demo</Button>
                <Button variant="secondary" size="lg" onClick={() => onNavigate("signup")}>View Case Studies</Button>
              </div>
              <div className="mt-6 text-sm text-gray-500">
                <strong>Contact:</strong> peaceiam4now@gmail.com • <a href="https://github.com/astro-dev-lab" target="_blank" rel="noreferrer" className="text-gray-700 underline">astro-dev-lab</a>
              </div>
              <div id="customers" className="mt-8 flex items-center gap-6 flex-wrap">
                {/* Client logos (placeholders) */}
                {['Goldman Sachs', 'Deloitte', 'Pfizer', 'Boeing', 'JPMorgan'].map((c)=> (
                  <div key={c} className="px-3 py-2 bg-gray-50 border border-gray-100 rounded text-sm text-gray-600">{c}</div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-lg overflow-hidden shadow-lg border border-gray-100">
                <div className="h-64 bg-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1200&q=80"
                    alt="Programming code on laptop"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 bg-white">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-sm text-gray-500">Active deployments</div>
                      <div className="text-xl font-semibold text-gray-900">2,847</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Cost savings</div>
                      <div className="text-xl font-semibold text-gray-900">$4.2M</div>
                    </div>
                  </div>
                  <div className="h-24">
                    {/* simple sparkline using divs */}
                    <svg viewBox="0 0 100 30" className="w-full h-full">
                      <polyline fill="none" stroke="#6366f1" strokeWidth="2" points="0,20 10,18 20,12 30,14 40,9 50,10 60,6 70,8 80,4 90,6 100,2" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Built for enterprise scale</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Mission-critical infrastructure trusted by Fortune 500 companies</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "🏛️", title: "Multi-Cloud Governance", desc: "Unified policy management across AWS, Azure, and GCP" },
              { icon: "🔒", title: "Zero-Trust Security", desc: "SOC 2 Type II, HIPAA, FedRAMP certified with RBAC" },
              { icon: "📊", title: "Executive Dashboards", desc: "C-suite visibility into infrastructure costs and compliance" },
              { icon: "🔄", title: "Legacy Integration", desc: "Connect SAP, Oracle, Salesforce, and 500+ enterprise systems" },
              { icon: "🛡️", title: "Disaster Recovery", desc: "99.999% uptime SLA with geo-redundant failover" },
              { icon: "👥", title: "Dedicated TAM", desc: "Technical account manager with 4-hour response SLA" },
            ].map((f) => (
              <Card key={f.title} hover padding="lg">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Enterprise deployment options</h2>
            <p className="text-gray-600">Flexible licensing for organizations of any size</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: "Department", price: "25K", period: "year", features: ["Up to 100 users", "Single cloud provider", "Standard SLA (99.9%)", "Business hours support", "Basic compliance reports"] },
              { name: "Enterprise", price: "100K", period: "year", features: ["Unlimited users", "Multi-cloud support", "Premium SLA (99.99%)", "24/7 dedicated support", "Advanced compliance suite", "Custom integrations", "Quarterly business reviews"], popular: true },
              { name: "Global", price: "Custom", period: "", features: ["Unlimited everything", "On-premise deployment", "99.999% SLA guarantee", "Dedicated TAM & CSM", "FedRAMP/HIPAA certified", "White-glove onboarding", "Executive sponsorship"] },
            ].map((plan) => (
              <Card key={plan.name} className={plan.popular ? "ring-2 ring-amber-600 relative" : ""} padding="lg">
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="warning">Recommended</Badge>
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <div className="mt-4 mb-6">
                  <span className="text-4xl font-bold">{plan.price === "Custom" ? "Custom" : `$${plan.price}`}</span>
                  {plan.period && <span className="text-gray-500">/{plan.period}</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Button variant={plan.popular ? "primary" : "secondary"} className="w-full" onClick={() => onNavigate("signup")}>
                  {plan.price === "Custom" ? "Contact Sales" : "Request Quote"}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to modernize your enterprise infrastructure?</h2>
          <p className="text-lg text-white/80 mb-8">Join 200+ Fortune 500 companies already using NexusOne</p>
          <Button variant="secondary" size="lg" onClick={() => onNavigate("signup")}>
            Schedule Executive Briefing
          </Button>
        </div>
      </section>
    </div>
  );
}

function AuthPage({ type, onNavigate }: { type: "login" | "signup"; onNavigate: (v: View) => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md" padding="lg">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-xl">🏢</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {type === "login" ? "Enterprise Portal" : "Request Access"}
          </h1>
          <p className="text-gray-600 mt-2">
            {type === "login" ? "Sign in to your enterprise account" : "Contact us to schedule a demo"}
          </p>
        </div>

        <div className="space-y-4">
          {type === "signup" && <Input placeholder="Full name" />}
          {type === "signup" && <Input placeholder="Company name" />}
          {type === "signup" && <Input placeholder="Job title" />}
          <Input type="email" placeholder="Work email address" />
          {type === "login" && <Input type="password" placeholder="Password" />}
          
          <Button className="w-full" onClick={() => onNavigate("dashboard")}>
            {type === "login" ? "Sign In with SSO" : "Request Demo"}
          </Button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          {type === "login" ? (
            <>
              Don&apos;t have an account?{" "}
              <button onClick={() => onNavigate("signup")} className="text-violet-600 font-medium hover:underline">
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button onClick={() => onNavigate("login")} className="text-violet-600 font-medium hover:underline">
                Sign in
              </button>
            </>
          )}
        </div>

        <div className="mt-4 text-center">
          <button onClick={() => onNavigate("landing")} className="text-sm text-gray-500 hover:text-gray-700">
            ← Back to homepage
          </button>
        </div>
      </Card>
    </div>
  );
}

function DashboardView({ data, onNavigate }: { data: { date: string; value: number; visits: number }[]; onNavigate: (v: View) => void }) {
  const totalValue = data.reduce((a, b) => a + b.value, 0);
  const totalVisits = data.reduce((a, b) => a + b.visits, 0);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Enterprise Command Center</h2>
          <p className="text-gray-600">Infrastructure overview for Acme Corporation</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => onNavigate("billing")}>Contracts</Button>
          <Button variant="ghost" onClick={() => onNavigate("landing")}>Logout</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard title="Cost Savings" value={formatCurrency(totalValue * 10)} change={12} />
        <StatCard title="Active Nodes" value="2,847" change={8} />
        <StatCard title="Compliance Score" value="98.2%" change={2} />
        <StatCard title="Deployments" value={totalVisits.toLocaleString()} change={15} />
      </div>

      <DemoSection title="Resource Utilization">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-900">Compute Capacity</h3>
              <p className="text-sm text-gray-500">2,847 / 5,000 nodes allocated</p>
            </div>
            <Badge variant="success">57%</Badge>
          </div>
          <Progress value={57} color="default" />
        </Card>
      </DemoSection>

      <DemoSection title="Audit Log">
        <Card padding="none">
          <div className="divide-y divide-gray-100">
            {[
              { action: "Production deployment completed - v2.4.1", time: "2 minutes ago", icon: "🚀" },
              { action: "SOC 2 compliance scan passed", time: "15 minutes ago", icon: "✅" },
              { action: "New service principal created by IT Admin", time: "1 hour ago", icon: "🔐" },
              { action: "Auto-scaling triggered - US-East region", time: "3 hours ago", icon: "📈" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">{item.icon}</div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.action}</p>
                  <p className="text-sm text-gray-500">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </DemoSection>
    </>
  );
}

function BillingPage({ onNavigate }: { onNavigate: (v: View) => void }) {
  return (
    <DemoLayout demo={demo}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Enterprise Contracts</h2>
          <p className="text-gray-600">Manage licenses, contracts, and procurement</p>
        </div>
        <Button variant="ghost" onClick={() => onNavigate("dashboard")}>← Back to Command Center</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <Badge variant="warning" size="md">Enterprise License</Badge>
                <h3 className="text-xl font-bold text-gray-900 mt-2">$100,000/year</h3>
                <p className="text-gray-600">Contract renewal: Dec 31, 2025 • 3 years remaining</p>
              </div>
              <Button variant="secondary">Contact Account Team</Button>
            </div>
          </Card>

          <Card>
            <h3 className="font-bold text-gray-900 mb-4">License Allocation</h3>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-8 bg-gradient-to-r from-amber-600 to-orange-600 rounded flex items-center justify-center text-white text-xs font-bold">
                ENT
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">847 / 1,000 seats allocated</p>
                <p className="text-sm text-gray-500">Multi-cloud deployment • All regions enabled</p>
              </div>
              <Button variant="ghost" size="sm">Request More</Button>
            </div>
          </Card>
        </div>

        <div>
          <Card>
            <h3 className="font-bold text-gray-900 mb-4">Contract Documents</h3>
            <div className="space-y-3">
              {[
                { date: "MSA Agreement", amount: "PDF" },
                { date: "SOW 2024-Q4", amount: "PDF" },
                { date: "Security Addendum", amount: "PDF" },
              ].map((inv, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{inv.date}</span>
                  <span className="font-medium text-amber-600 cursor-pointer hover:underline">{inv.amount}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DemoLayout>
  );
}
