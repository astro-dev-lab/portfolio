"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { Demo, DEMO_CATEGORIES, SITE_CONFIG } from "@/lib/constants";
import { Badge } from "@/components/ui";

interface DemoLayoutProps {
  demo: Demo;
  children: ReactNode;
  variant?: "default" | "fullscreen";
}

export function DemoLayout({ demo, children, variant = "default" }: DemoLayoutProps) {
  const category = DEMO_CATEGORIES[demo.category];

  if (variant === "fullscreen") {
    return <div className="min-h-screen bg-white">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Case Study Header */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="default">{category.name}</Badge>
              </div>
              <h1 className="text-2xl md:text-3xl font-semibold text-[#0A0A0A] tracking-tight">{demo.title}</h1>
              <p className="text-[#6B7280] mt-1">{demo.subtitle}</p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={`${SITE_CONFIG.github}/tree/main/src/app/demos/${demo.path.split('/').pop()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#0A0A0A] text-white text-sm font-medium rounded hover:bg-[#1F2937] transition-colors"
              >
                View Source
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Case Study Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>

      {/* Case Study Footer */}
      <div className="bg-white border-t border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xs font-medium text-[#6B7280] uppercase tracking-wider mb-4">Technology Stack</h3>
              <div className="flex flex-wrap gap-2">
                {demo.techStack.map((tech) => (
                  <span key={tech} className="px-2.5 py-1 bg-[#F3F4F6] text-[#374151] rounded text-sm">{tech}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-medium text-[#6B7280] uppercase tracking-wider mb-4">Key Features</h3>
              <ul className="space-y-2">
                {demo.features.map((feature) => (
                  <li key={feature} className="text-sm text-[#4B5563] flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-medium text-[#6B7280] uppercase tracking-wider mb-4">Business Context</h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">{demo.businessValue}</p>
              {demo.metrics && demo.metrics.length > 0 && (
                <div className="mt-4 pt-4 border-t border-[#F3F4F6]">
                  <div className="grid grid-cols-2 gap-4">
                    {demo.metrics.map((metric) => (
                      <div key={metric.label}>
                        <p className="text-lg font-semibold text-[#0A0A0A]">{metric.value}</p>
                        <p className="text-xs text-[#6B7280]">{metric.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DemoSection({ title, description, children, className = "" }: { title?: string; description?: string; children: ReactNode; className?: string }) {
  return (
    <section className={`mb-8 ${className}`}>
      {title && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-[#0A0A0A] tracking-tight">{title}</h2>
          {description && <p className="text-sm text-[#6B7280] mt-1">{description}</p>}
        </div>
      )}
      {children}
    </section>
  );
}
