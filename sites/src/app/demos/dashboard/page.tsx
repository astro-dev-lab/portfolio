"use client";

import { useState } from "react";
import { DEMOS } from "@/lib/constants";
import { DemoLayout, DemoSection } from "@/components/demos/DemoLayout";
import { Button, Card, Badge, StatCard, Avatar, Progress } from "@/components/ui";
import { generateMockChartData, generateMockUsers, formatCurrency } from "@/lib/utils";

const demo = DEMOS.find((d) => d.id === "analytics-dashboard")!;
const chartData = generateMockChartData(30);
const users = generateMockUsers(5);

export default function DashboardDemo() {
  const [activeTab, setActiveTab] = useState("overview");
  const [dateRange, setDateRange] = useState("30d");

  return (
    <DemoLayout demo={demo}>
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Real-time insights for your business</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white rounded-lg p-1 border">
            {["7d", "30d", "90d", "1y"].map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                  dateRange === range ? "bg-blue-500 text-white" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          <Button variant="secondary" size="sm">Export</Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
        {["overview", "traffic", "revenue", "users"].map((tab) => (
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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(124500)}
          change={12.5}
          icon={<span className="text-xl">💰</span>}
        />
        <StatCard
          title="Active Users"
          value="8,234"
          change={8.2}
          icon={<span className="text-xl">👥</span>}
        />
        <StatCard
          title="Conversion Rate"
          value="3.24%"
          change={-2.1}
          icon={<span className="text-xl">📈</span>}
        />
        <StatCard
          title="Avg. Session"
          value="4m 32s"
          change={5.8}
          icon={<span className="text-xl">⏱️</span>}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900">Revenue Overview</h3>
            <Badge variant="success">+12.5% vs last period</Badge>
          </div>
          {/* Mock Chart */}
          <div className="h-64 flex items-end gap-1">
            {chartData.slice(-20).map((d, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t-sm hover:from-blue-600 hover:to-cyan-500 transition-all cursor-pointer"
                style={{ height: `${(d.value / Math.max(...chartData.map(x => x.value))) * 100}%` }}
                title={`${d.date}: ${formatCurrency(d.value)}`}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>{chartData[chartData.length - 20]?.date}</span>
            <span>{chartData[chartData.length - 1]?.date}</span>
          </div>
        </Card>

        {/* Traffic Sources */}
        <Card>
          <h3 className="font-bold text-gray-900 mb-6">Traffic Sources</h3>
          <div className="space-y-4">
            {[
              { name: "Organic Search", value: 45, color: "emerald" as const },
              { name: "Direct", value: 28, color: "blue" as const },
              { name: "Social Media", value: 18, color: "amber" as const },
              { name: "Referral", value: 9, color: "violet" as const },
            ].map((source) => (
              <div key={source.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{source.name}</span>
                  <span className="font-medium text-gray-900">{source.value}%</span>
                </div>
                <Progress value={source.value} size="sm" color={source.color} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Recent Activity */}
        <Card>
          <h3 className="font-bold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { user: users[0], action: "Completed purchase", amount: "$349.00", time: "2m ago" },
              { user: users[1], action: "Signed up for trial", amount: null, time: "15m ago" },
              { user: users[2], action: "Upgraded to Pro", amount: "$79.00/mo", time: "1h ago" },
              { user: users[3], action: "Submitted support ticket", amount: null, time: "2h ago" },
              { user: users[4], action: "Completed purchase", amount: "$129.00", time: "3h ago" },
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-3">
                <Avatar name={activity.user.name} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{activity.user.name}</p>
                  <p className="text-xs text-gray-500">{activity.action}</p>
                </div>
                <div className="text-right">
                  {activity.amount && <p className="text-sm font-medium text-emerald-600">{activity.amount}</p>}
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Products */}
        <Card>
          <h3 className="font-bold text-gray-900 mb-4">Top Products</h3>
          <div className="space-y-3">
            {[
              { name: "Pro Subscription", sales: 234, revenue: 18486, trend: "+12%" },
              { name: "Enterprise License", sales: 45, revenue: 22500, trend: "+28%" },
              { name: "Starter Pack", sales: 189, revenue: 5481, trend: "-5%" },
              { name: "Add-on Bundle", sales: 78, revenue: 3900, trend: "+8%" },
            ].map((product, i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-xs text-gray-500">{product.sales} sales</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{formatCurrency(product.revenue)}</p>
                  <p className={`text-xs ${product.trend.startsWith("+") ? "text-emerald-500" : "text-red-500"}`}>
                    {product.trend}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Team Section */}
      <DemoSection title="Team Access" className="mt-6">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-600">Manage who has access to this dashboard</p>
            <Button variant="secondary" size="sm">Invite Member</Button>
          </div>
          <div className="divide-y">
            {users.map((user) => (
              <div key={user.id} className="flex items-center gap-4 py-3">
                <Avatar name={user.name} />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <Badge variant={user.role === "Admin" ? "info" : user.role === "Manager" ? "warning" : "default"}>
                  {user.role}
                </Badge>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
            ))}
          </div>
        </Card>
      </DemoSection>
    </DemoLayout>
  );
}
