"use client";

import { useState } from "react";
import { DEMOS } from "@/lib/constants";
import { DemoLayout, DemoSection } from "@/components/demos/DemoLayout";
import { Button, Card, Badge, Input } from "@/components/ui";

const demo = DEMOS.find((d) => d.id === "ai-content")!;

const templates = [
  { id: "blog", name: "Blog Post", icon: "📝", desc: "Long-form article" },
  { id: "social", name: "Social Media", icon: "📱", desc: "Tweets, posts, captions" },
  { id: "email", name: "Email", icon: "📧", desc: "Newsletters, campaigns" },
  { id: "ad", name: "Ad Copy", icon: "📢", desc: "Headlines, descriptions" },
  { id: "product", name: "Product", icon: "🏷️", desc: "Descriptions, features" },
  { id: "seo", name: "SEO Content", icon: "🔍", desc: "Meta titles, descriptions" },
];

const mockContent = {
  blog: `# The Future of AI in Small Business

In today's rapidly evolving digital landscape, artificial intelligence is no longer just for tech giants. Small businesses are discovering powerful ways to leverage AI tools to compete more effectively.

## Why AI Matters Now

The democratization of AI technology means that even a one-person operation can access sophisticated tools that were once reserved for Fortune 500 companies. From automated customer service to intelligent inventory management, the possibilities are expanding every day.

### Key Benefits:
- **Time Savings**: Automate repetitive tasks and focus on growth
- **Cost Reduction**: Reduce operational expenses by up to 40%
- **Better Decisions**: Data-driven insights for smarter strategies

Ready to transform your business? The future is here, and it's more accessible than ever.`,

  social: `🚀 Big news! We've just launched our new AI-powered analytics dashboard.

Track your metrics in real-time, get automated insights, and make data-driven decisions faster than ever.

No more spreadsheet headaches. No more guessing games.

Try it free for 14 days 👇
#StartupLife #AI #Analytics`,

  email: `Subject: Your Weekly Growth Report is Ready 📈

Hi there,

Your business metrics from last week are in, and we've got some exciting insights to share!

📊 **Quick Stats:**
- Website visits: +23%
- Conversions: +15%
- Revenue: +18%

**What's Working:**
Your new landing page is performing exceptionally well. Visitors are spending 45% more time on the page compared to the previous version.

**Opportunity Spotted:**
We noticed a drop in mobile conversions. Consider optimizing your checkout flow for mobile users.

[View Full Report] →

Keep crushing it,
The Analytics Team`,
};

export default function AIContentDemo() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("professional");
  const [isGenerating, setIsGenerating] = useState(false);
  const [content, setContent] = useState("");

  const generate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setContent(mockContent[selectedTemplate as keyof typeof mockContent] || mockContent.blog);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <DemoLayout demo={demo}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Panel - Controls */}
        <div className="space-y-6">
          <Card>
            <h3 className="font-bold text-gray-900 mb-4">Content Type</h3>
            <div className="grid grid-cols-2 gap-2">
              {templates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTemplate(t.id)}
                  className={`p-3 rounded-lg border-2 text-left transition-all ${
                    selectedTemplate === t.id
                      ? "border-pink-500 bg-pink-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span className="text-2xl">{t.icon}</span>
                  <p className="font-medium text-gray-900 text-sm mt-1">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.desc}</p>
                </button>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="font-bold text-gray-900 mb-4">Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
                <Input
                  placeholder="What's your content about?"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tone</label>
                <div className="flex flex-wrap gap-2">
                  {["professional", "casual", "friendly", "persuasive"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTone(t)}
                      className={`px-3 py-1 rounded-full text-sm capitalize ${
                        tone === t
                          ? "bg-pink-500 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <Button
                className="w-full"
                onClick={generate}
                disabled={!selectedTemplate || isGenerating}
              >
                {isGenerating ? "Generating..." : "Generate Content"}
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Panel - Output */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Generated Content</h3>
              {content && (
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">Copy</Button>
                  <Button variant="ghost" size="sm">Edit</Button>
                  <Button variant="secondary" size="sm">Export</Button>
                </div>
              )}
            </div>

            {!content && !isGenerating && (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="text-6xl mb-4">✍️</div>
                <h4 className="text-lg font-medium text-gray-900">Ready to Create</h4>
                <p className="text-gray-500 mt-2 max-w-md">
                  Select a content type, enter your topic, and let AI generate compelling content for your business.
                </p>
              </div>
            )}

            {isGenerating && (
              <div className="flex flex-col items-center justify-center h-64">
                <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mb-4" />
                <p className="text-gray-600">Crafting your content...</p>
              </div>
            )}

            {content && !isGenerating && (
              <div className="prose prose-sm max-w-none">
                <div className="bg-gray-50 rounded-lg p-6 whitespace-pre-wrap font-mono text-sm">
                  {content}
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Features Section */}
      <DemoSection title="Platform Features" className="mt-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { icon: "🎯", title: "Brand Voice", desc: "Consistent tone across all content" },
            { icon: "🌍", title: "Multi-language", desc: "Generate in 50+ languages" },
            { icon: "📊", title: "SEO Optimized", desc: "Built-in keyword targeting" },
            { icon: "⚡", title: "Instant Export", desc: "One-click publishing" },
          ].map((f) => (
            <Card key={f.title} hover padding="md">
              <div className="text-3xl mb-2">{f.icon}</div>
              <h4 className="font-medium text-gray-900">{f.title}</h4>
              <p className="text-sm text-gray-500 mt-1">{f.desc}</p>
            </Card>
          ))}
        </div>
      </DemoSection>
    </DemoLayout>
  );
}
