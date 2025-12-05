"use client";

import { useState } from "react";
import { DEMOS } from "@/lib/constants";
import { DemoLayout, DemoSection } from "@/components/demos/DemoLayout";
import { Button, Card, Badge, Avatar, Progress } from "@/components/ui";

const demo = DEMOS.find((d) => d.id === "social-dashboard")!;

const platforms = [
  { id: "twitter", name: "Twitter", icon: "𝕏", color: "bg-black", followers: "12.4K", growth: 8.2 },
  { id: "instagram", name: "Instagram", icon: "📷", color: "bg-gradient-to-br from-purple-500 to-pink-500", followers: "28.1K", growth: 12.5 },
  { id: "linkedin", name: "LinkedIn", icon: "in", color: "bg-blue-600", followers: "8.7K", growth: 5.1 },
  { id: "tiktok", name: "TikTok", icon: "♪", color: "bg-black", followers: "45.2K", growth: 24.3 },
];

const scheduledPosts = [
  { id: 1, platform: "twitter", content: "Excited to announce our new feature! 🚀 Stay tuned...", date: "Dec 5", time: "10:00 AM", status: "scheduled" },
  { id: 2, platform: "instagram", content: "Behind the scenes of our latest photoshoot 📸", date: "Dec 5", time: "2:00 PM", status: "scheduled" },
  { id: 3, platform: "linkedin", content: "We're hiring! Join our growing team...", date: "Dec 6", time: "9:00 AM", status: "draft" },
];

const recentMessages = [
  { id: 1, platform: "twitter", user: "Sarah M.", message: "Love your product! Quick question...", time: "5m ago", unread: true },
  { id: 2, platform: "instagram", user: "design.daily", message: "Can we collaborate on a post?", time: "1h ago", unread: true },
  { id: 3, platform: "linkedin", user: "John Tech", message: "Interested in your services", time: "3h ago", unread: false },
];

const analytics = [
  { metric: "Total Reach", value: "245K", change: 15 },
  { metric: "Engagement Rate", value: "4.8%", change: 8 },
  { metric: "Link Clicks", value: "3.2K", change: -3 },
  { metric: "New Followers", value: "+892", change: 22 },
];

export default function SocialDemo() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

  return (
    <DemoLayout demo={demo}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-2xl">📱</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">SocialPulse</h1>
            <p className="text-gray-600">Unified social media command center</p>
          </div>
        </div>
        <Button>+ New Post</Button>
      </div>

      {/* Platform Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {platforms.map((p) => (
          <Card
            key={p.id}
            hover
            className={`cursor-pointer ${selectedPlatform === p.id ? "ring-2 ring-blue-500" : ""}`}
            onClick={() => setSelectedPlatform(selectedPlatform === p.id ? null : p.id)}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 ${p.color} rounded-lg flex items-center justify-center text-white font-bold`}>
                {p.icon}
              </div>
              <span className="font-medium text-gray-900">{p.name}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{p.followers}</p>
            <p className="text-sm text-emerald-600">+{p.growth}% this month</p>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
        {["overview", "schedule", "inbox", "analytics"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-md capitalize transition-all ${
              activeTab === tab ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stats */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {analytics.map((a) => (
                <Card key={a.metric}>
                  <p className="text-sm text-gray-500">{a.metric}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{a.value}</p>
                  <p className={`text-sm ${a.change >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                    {a.change >= 0 ? "↑" : "↓"} {Math.abs(a.change)}%
                  </p>
                </Card>
              ))}
            </div>

            {/* Chart Area */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Engagement Trend</h3>
                <div className="flex gap-2">
                  {["7d", "30d", "90d"].map((range) => (
                    <button key={range} className="px-3 py-1 text-sm rounded-lg hover:bg-gray-100">{range}</button>
                  ))}
                </div>
              </div>
              <div className="h-48 flex items-end gap-2">
                {Array.from({ length: 14 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-sm"
                    style={{ height: `${30 + Math.random() * 70}%` }}
                  />
                ))}
              </div>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <h3 className="font-bold text-gray-900 mb-4">Recent Messages</h3>
            <div className="space-y-3">
              {recentMessages.map((msg) => (
                <div key={msg.id} className={`p-3 rounded-lg ${msg.unread ? "bg-blue-50" : "bg-gray-50"}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">{platforms.find((p) => p.id === msg.platform)?.icon}</span>
                    <span className="font-medium text-gray-900 text-sm">{msg.user}</span>
                    {msg.unread && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                  </div>
                  <p className="text-sm text-gray-600 truncate">{msg.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{msg.time}</p>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4" onClick={() => setActiveTab("inbox")}>
              View All Messages
            </Button>
          </Card>
        </div>
      )}

      {activeTab === "schedule" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-900">Scheduled Posts</h3>
                <Button size="sm">+ Schedule Post</Button>
              </div>
              <div className="space-y-4">
                {scheduledPosts.map((post) => (
                  <div key={post.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 ${platforms.find((p) => p.id === post.platform)?.color} rounded-lg flex items-center justify-center text-white`}>
                        {platforms.find((p) => p.id === post.platform)?.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900">{post.content}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-sm text-gray-500">{post.date} at {post.time}</span>
                          <Badge variant={post.status === "scheduled" ? "success" : "warning"}>{post.status}</Badge>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card>
            <h3 className="font-bold text-gray-900 mb-4">Best Times to Post</h3>
            <div className="space-y-3">
              {[
                { day: "Monday", time: "10:00 AM", engagement: 85 },
                { day: "Wednesday", time: "2:00 PM", engagement: 92 },
                { day: "Friday", time: "6:00 PM", engagement: 78 },
              ].map((slot) => (
                <div key={slot.day} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{slot.day}</span>
                    <span className="text-sm text-gray-500">{slot.time}</span>
                  </div>
                  <Progress value={slot.engagement} size="sm" color="blue" />
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {activeTab === "inbox" && (
        <Card>
          <h3 className="font-bold text-gray-900 mb-6">Unified Inbox</h3>
          <div className="space-y-3">
            {[...recentMessages, ...recentMessages].map((msg, i) => (
              <div key={i} className={`p-4 rounded-lg border ${msg.unread ? "border-blue-200 bg-blue-50" : "border-gray-200"} hover:bg-gray-50 cursor-pointer transition-colors`}>
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 ${platforms.find((p) => p.id === msg.platform)?.color} rounded-lg flex items-center justify-center text-white`}>
                    {platforms.find((p) => p.id === msg.platform)?.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{msg.user}</span>
                      {msg.unread && <Badge variant="info" size="sm">New</Badge>}
                    </div>
                    <p className="text-sm text-gray-600">{msg.message}</p>
                  </div>
                  <span className="text-sm text-gray-400">{msg.time}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === "analytics" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h3 className="font-bold text-gray-900 mb-4">Top Performing Posts</h3>
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg mb-3">
                <div className="w-12 h-12 bg-gray-200 rounded-lg" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Post title here...</p>
                  <p className="text-sm text-gray-500">{Math.floor(Math.random() * 50)}K reach • {Math.floor(Math.random() * 5)}K likes</p>
                </div>
              </div>
            ))}
          </Card>

          <Card>
            <h3 className="font-bold text-gray-900 mb-4">Audience Demographics</h3>
            <div className="space-y-4">
              {[
                { label: "18-24", value: 25 },
                { label: "25-34", value: 45 },
                { label: "35-44", value: 20 },
                { label: "45+", value: 10 },
              ].map((demo) => (
                <div key={demo.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{demo.label}</span>
                    <span className="font-medium">{demo.value}%</span>
                  </div>
                  <Progress value={demo.value} size="sm" color="violet" />
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </DemoLayout>
  );
}
