"use client";

import Link from "next/link";
import { Demo, DEMO_CATEGORIES, SITE_CONFIG } from "@/lib/constants";
import { Badge, Button } from "@/components/ui";

interface DemoCardProps {
  demo: Demo;
}

export function DemoCard({ demo }: DemoCardProps) {
  const category = DEMO_CATEGORIES[demo.category];

  return (
    <article className="bg-white/40 backdrop-blur-md border border-white/15 rounded-xl overflow-hidden shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 hover:bg-white/50 transition-all duration-300 h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-white/20">
        <div className="flex items-start justify-between mb-4">
          <Badge variant="default">{category.name}</Badge>
        </div>
        <h3 className="text-lg font-semibold text-[#0A0A0A] tracking-tight mb-1">{demo.title}</h3>
        <p className="text-sm text-[#6B7280]">{demo.subtitle}</p>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <p className="text-sm text-[#4B5563] leading-relaxed mb-6 line-clamp-3">{demo.description}</p>

        {/* Metrics */}
        {demo.metrics && demo.metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mb-6 pt-4 border-t border-white/20">
            {demo.metrics.map((metric) => (
              <div key={metric.label}>
                <p className="text-lg font-semibold text-[#0A0A0A] tracking-tight">{metric.value}</p>
                <p className="text-xs text-[#6B7280]">{metric.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {demo.techStack.slice(0, 4).map((tech) => (
            <span key={tech} className="px-2 py-0.5 bg-white/30 text-[#374151] text-xs rounded backdrop-blur-sm">
              {tech}
            </span>
          ))}
          {demo.techStack.length > 4 && (
            <span className="px-2 py-0.5 text-[#6B7280] text-xs">
              +{demo.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-auto pt-4 border-t border-white/20">
          <Link href={demo.path} className="flex-1">
            <Button className="w-full" size="sm">
              View Case Study
            </Button>
          </Link>
          <a
            href={`${SITE_CONFIG.github}/tree/main/src/app/demos/${demo.path.split('/').pop()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 border border-white/20 rounded text-[#4B5563] hover:border-white/40 hover:text-[#0A0A0A] hover:bg-white/20 transition-colors text-sm backdrop-blur-sm"
          >
            Code
          </a>
        </div>
      </div>
    </article>
  );
}

export function DemoGrid({ demos }: { demos: Demo[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {demos.map((demo) => (
        <DemoCard key={demo.id} demo={demo} />
      ))}
    </div>
  );
}
