"use client";

import { useState } from "react";
import { DEMOS } from "@/lib/constants";
import { DemoLayout, DemoSection } from "@/components/demos/DemoLayout";
import { Button, Card, Badge, Input, Progress } from "@/components/ui";

const demo = DEMOS.find((d) => d.id === "ai-resume")!;

const mockAnalysis = {
  score: 72,
  sections: [
    { name: "Contact Info", score: 95, feedback: "Complete and professional" },
    { name: "Summary", score: 60, feedback: "Could be more impactful" },
    { name: "Experience", score: 75, feedback: "Good but lacks metrics" },
    { name: "Skills", score: 80, feedback: "Well organized" },
    { name: "Keywords", score: 55, feedback: "Missing key industry terms" },
  ],
  suggestions: [
    { type: "critical", text: "Add quantifiable achievements to your experience" },
    { type: "important", text: "Include industry-specific keywords for ATS optimization" },
    { type: "important", text: "Strengthen your summary with a unique value proposition" },
    { type: "optional", text: "Consider adding a skills section with proficiency levels" },
  ],
  keywords: {
    found: ["JavaScript", "React", "Node.js", "TypeScript", "Git"],
    missing: ["AWS", "Docker", "CI/CD", "Agile", "REST API"],
  },
};

export default function AIResumeDemo() {
  const [step, setStep] = useState<"upload" | "analyzing" | "results">("upload");
  const [progress, setProgress] = useState(0);

  const startAnalysis = () => {
    setStep("analyzing");
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setStep("results");
          return 100;
        }
        return p + 10;
      });
    }, 300);
  };

  return (
    <DemoLayout demo={demo}>
      {step === "upload" && (
        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🤖</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">AI Resume Analyzer</h2>
              <p className="text-gray-600 mt-2">Get instant feedback to improve your resume</p>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 mb-6 hover:border-pink-400 transition-colors cursor-pointer" onClick={startAnalysis}>
              <div className="text-5xl mb-4">📄</div>
              <p className="text-gray-600 mb-2">Drop your resume here or click to browse</p>
              <p className="text-sm text-gray-400">Supports PDF, DOC, DOCX</p>
            </div>

            <Button onClick={startAnalysis} size="lg" className="w-full">
              Analyze Sample Resume
            </Button>
          </Card>
        </div>
      )}

      {step === "analyzing" && (
        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
              <span className="text-4xl">🔍</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Analyzing Your Resume</h2>
            <p className="text-gray-600 mb-8">Our AI is reviewing your resume...</p>
            
            <div className="mb-4">
              <Progress value={progress} size="md" color="violet" />
            </div>
            <p className="text-sm text-gray-500">{progress}% complete</p>

            <div className="mt-8 space-y-3 text-left">
              {["Scanning document structure", "Analyzing content quality", "Checking ATS compatibility", "Generating recommendations"].map((item, i) => (
                <div key={i} className={`flex items-center gap-3 ${progress > i * 25 ? "text-gray-900" : "text-gray-400"}`}>
                  {progress > i * 25 ? (
                    <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                  )}
                  {item}
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {step === "results" && (
        <>
          {/* Score Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-1 text-center">
              <h3 className="font-semibold text-gray-900 mb-4">Overall Score</h3>
              <div className="relative w-32 h-32 mx-auto">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="64" cy="64" r="56" fill="none" stroke="#e5e7eb" strokeWidth="12" />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="12"
                    strokeDasharray={`${mockAnalysis.score * 3.52} 352`}
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#f43f5e" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-gray-900">{mockAnalysis.score}</span>
                </div>
              </div>
              <p className="text-gray-600 mt-4">Good, but room for improvement</p>
            </Card>

            <Card className="lg:col-span-2">
              <h3 className="font-semibold text-gray-900 mb-4">Section Breakdown</h3>
              <div className="space-y-4">
                {mockAnalysis.sections.map((section) => (
                  <div key={section.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{section.name}</span>
                      <span className="text-sm text-gray-500">{section.score}%</span>
                    </div>
                    <Progress value={section.score} size="sm" color={section.score > 70 ? "emerald" : section.score > 50 ? "amber" : "violet"} />
                    <p className="text-xs text-gray-500 mt-1">{section.feedback}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Suggestions */}
          <DemoSection title="AI Recommendations">
            <div className="space-y-4">
              {mockAnalysis.suggestions.map((suggestion, i) => (
                <Card key={i} hover>
                  <div className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      suggestion.type === "critical" ? "bg-red-100 text-red-600" :
                      suggestion.type === "important" ? "bg-amber-100 text-amber-600" :
                      "bg-blue-100 text-blue-600"
                    }`}>
                      {suggestion.type === "critical" ? "!" : suggestion.type === "important" ? "•" : "?"}
                    </div>
                    <div className="flex-1">
                      <Badge variant={suggestion.type === "critical" ? "danger" : suggestion.type === "important" ? "warning" : "info"} size="sm">
                        {suggestion.type}
                      </Badge>
                      <p className="text-gray-700 mt-2">{suggestion.text}</p>
                    </div>
                    <Button variant="ghost" size="sm">Apply</Button>
                  </div>
                </Card>
              ))}
            </div>
          </DemoSection>

          {/* Keywords */}
          <DemoSection title="Keyword Analysis">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-emerald-500">✓</span> Keywords Found
                </h4>
                <div className="flex flex-wrap gap-2">
                  {mockAnalysis.keywords.found.map((kw) => (
                    <Badge key={kw} variant="success">{kw}</Badge>
                  ))}
                </div>
              </Card>
              <Card>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-red-500">✗</span> Missing Keywords
                </h4>
                <div className="flex flex-wrap gap-2">
                  {mockAnalysis.keywords.missing.map((kw) => (
                    <Badge key={kw} variant="danger">{kw}</Badge>
                  ))}
                </div>
              </Card>
            </div>
          </DemoSection>

          <div className="flex justify-center gap-4 mt-8">
            <Button variant="secondary" onClick={() => setStep("upload")}>Analyze Another</Button>
            <Button>Download Improved Resume</Button>
          </div>
        </>
      )}
    </DemoLayout>
  );
}
