"use client";

import { useState } from "react";
import { DEMOS } from "@/lib/constants";
import { DemoLayout, DemoSection } from "@/components/demos/DemoLayout";
import { Button, Card, Badge, Progress } from "@/components/ui";

const demo = DEMOS.find((d) => d.id === "automation-flow")!;

const workflows = [
  { id: 1, name: "CSV → Email Report", status: "active", runs: 234, lastRun: "2 hours ago", success: 98 },
  { id: 2, name: "Form → Slack Notify", status: "active", runs: 89, lastRun: "15 min ago", success: 100 },
  { id: 3, name: "Invoice → Payment", status: "paused", runs: 45, lastRun: "1 day ago", success: 95 },
  { id: 4, name: "Lead → CRM Sync", status: "active", runs: 567, lastRun: "Just now", success: 99 },
];

const triggers = [
  { id: "file", name: "File Upload", icon: "📁", desc: "When a file is uploaded" },
  { id: "schedule", name: "Schedule", icon: "⏰", desc: "Run on a schedule" },
  { id: "webhook", name: "Webhook", icon: "🔗", desc: "HTTP request trigger" },
  { id: "form", name: "Form Submit", icon: "📝", desc: "When form is submitted" },
];

const actions = [
  { id: "transform", name: "Transform Data", icon: "🔄", desc: "Parse, filter, map" },
  { id: "email", name: "Send Email", icon: "📧", desc: "SMTP or API" },
  { id: "slack", name: "Slack Message", icon: "💬", desc: "Post to channel" },
  { id: "api", name: "API Request", icon: "🌐", desc: "Call external API" },
  { id: "sheets", name: "Google Sheets", icon: "📊", desc: "Add/update rows" },
  { id: "database", name: "Database", icon: "🗄️", desc: "Query or insert" },
];

export default function AutomationDemo() {
  const [view, setView] = useState<"list" | "builder" | "logs">("list");
  const [selectedTrigger, setSelectedTrigger] = useState<string | null>(null);
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runDemo = () => {
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 3000);
  };

  return (
    <DemoLayout demo={demo}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-lime-500 to-green-600 rounded-xl flex items-center justify-center">
            <span className="text-2xl">⚡</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">FlowForge</h1>
            <p className="text-gray-600">Visual workflow automation</p>
          </div>
        </div>
        <div className="flex gap-2">
          {(["list", "builder", "logs"] as const).map((v) => (
            <Button key={v} variant={view === v ? "primary" : "secondary"} size="sm" onClick={() => setView(v)}>
              {v === "list" ? "Workflows" : v === "builder" ? "Builder" : "Logs"}
            </Button>
          ))}
        </div>
      </div>

      {view === "list" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Workflows", value: "12", icon: "📊" },
              { label: "Runs Today", value: "847", icon: "▶️" },
              { label: "Success Rate", value: "99.2%", icon: "✅" },
              { label: "Time Saved", value: "23h", icon: "⏱️" },
            ].map((stat) => (
              <Card key={stat.label} hover>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{stat.icon}</span>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900">Your Workflows</h2>
              <Button size="sm" onClick={() => setView("builder")}>+ New Workflow</Button>
            </div>
            <div className="space-y-3">
              {workflows.map((wf) => (
                <div key={wf.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${wf.status === "active" ? "bg-emerald-100 text-emerald-600" : "bg-gray-200 text-gray-500"}`}>
                    ⚡
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900">{wf.name}</p>
                      <Badge variant={wf.status === "active" ? "success" : "default"}>{wf.status}</Badge>
                    </div>
                    <p className="text-sm text-gray-500">{wf.runs} runs • Last: {wf.lastRun}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-emerald-600">{wf.success}% success</p>
                    <Progress value={wf.success} size="sm" color="emerald" />
                  </div>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}

      {view === "builder" && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <h3 className="font-bold text-gray-900 mb-3">Triggers</h3>
              <div className="space-y-2">
                {triggers.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTrigger(t.id)}
                    className={`w-full p-3 rounded-lg text-left transition-all ${
                      selectedTrigger === t.id ? "bg-lime-100 border-2 border-lime-500" : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{t.icon}</span>
                      <span className="font-medium text-sm">{t.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="font-bold text-gray-900 mb-3">Actions</h3>
              <div className="space-y-2">
                {actions.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => setSelectedActions((prev) => prev.includes(a.id) ? prev.filter((x) => x !== a.id) : [...prev, a.id])}
                    className={`w-full p-3 rounded-lg text-left transition-all ${
                      selectedActions.includes(a.id) ? "bg-lime-100 border-2 border-lime-500" : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{a.icon}</span>
                      <span className="font-medium text-sm">{a.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Canvas */}
          <div className="lg:col-span-3">
            <Card className="min-h-[500px]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-900">Workflow Canvas</h3>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" disabled={!selectedTrigger}>Test Run</Button>
                  <Button size="sm" onClick={runDemo} disabled={!selectedTrigger || selectedActions.length === 0}>
                    {isRunning ? "Running..." : "Save & Deploy"}
                  </Button>
                </div>
              </div>

              {/* Visual Flow */}
              <div className="flex flex-col items-center gap-4">
                {/* Trigger */}
                {selectedTrigger ? (
                  <div className="flex items-center gap-4">
                    <div className="w-48 p-4 bg-gradient-to-r from-lime-500 to-green-500 text-white rounded-xl text-center shadow-lg">
                      <span className="text-2xl">{triggers.find((t) => t.id === selectedTrigger)?.icon}</span>
                      <p className="font-medium mt-1">{triggers.find((t) => t.id === selectedTrigger)?.name}</p>
                    </div>
                  </div>
                ) : (
                  <div className="w-48 p-4 border-2 border-dashed border-gray-300 rounded-xl text-center text-gray-400">
                    Select a trigger
                  </div>
                )}

                {selectedTrigger && <div className="w-0.5 h-8 bg-gray-300" />}

                {/* Actions */}
                {selectedActions.map((actionId, i) => {
                  const action = actions.find((a) => a.id === actionId);
                  return (
                    <div key={actionId}>
                      <div className="w-48 p-4 bg-white border-2 border-gray-200 rounded-xl text-center shadow-sm">
                        <span className="text-2xl">{action?.icon}</span>
                        <p className="font-medium mt-1 text-gray-900">{action?.name}</p>
                      </div>
                      {i < selectedActions.length - 1 && <div className="w-0.5 h-8 bg-gray-300 mx-auto" />}
                    </div>
                  );
                })}

                {selectedTrigger && selectedActions.length === 0 && (
                  <div className="w-48 p-4 border-2 border-dashed border-gray-300 rounded-xl text-center text-gray-400">
                    Add actions
                  </div>
                )}
              </div>

              {isRunning && (
                <div className="mt-8 p-4 bg-lime-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-lime-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-lime-700 font-medium">Workflow running...</span>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      )}

      {view === "logs" && (
        <Card>
          <h2 className="font-bold text-gray-900 mb-4">Execution Logs</h2>
          <div className="space-y-2">
            {[
              { time: "12:45:32", workflow: "CSV → Email Report", status: "success", duration: "1.2s" },
              { time: "12:44:18", workflow: "Lead → CRM Sync", status: "success", duration: "0.8s" },
              { time: "12:43:05", workflow: "Form → Slack Notify", status: "success", duration: "0.3s" },
              { time: "12:42:51", workflow: "Lead → CRM Sync", status: "error", duration: "2.1s" },
              { time: "12:41:22", workflow: "CSV → Email Report", status: "success", duration: "1.5s" },
            ].map((log, i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg font-mono text-sm">
                <span className="text-gray-400">{log.time}</span>
                <span className="flex-1 text-gray-900">{log.workflow}</span>
                <Badge variant={log.status === "success" ? "success" : "danger"}>{log.status}</Badge>
                <span className="text-gray-500">{log.duration}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </DemoLayout>
  );
}
