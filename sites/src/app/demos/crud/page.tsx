"use client";

import { useState } from "react";
import { DEMOS } from "@/lib/constants";
import { DemoLayout, DemoSection } from "@/components/demos/DemoLayout";
import { Button, Card, Badge, Input, Avatar, Progress } from "@/components/ui";
import { generateMockProjects, generateMockUsers, formatCurrency, formatDate } from "@/lib/utils";

const demo = DEMOS.find((d) => d.id === "crud-enterprise")!;
const projects = generateMockProjects(8);
const users = generateMockUsers(6);

const mockClients = [
  { id: 1, name: "TechCorp Inc", contact: "John Smith", email: "john@techcorp.com", projects: 3, revenue: 45000 },
  { id: 2, name: "StartupXYZ", contact: "Sarah Johnson", email: "sarah@startup.xyz", projects: 2, revenue: 28000 },
  { id: 3, name: "RetailMax", contact: "Mike Brown", email: "mike@retailmax.com", projects: 4, revenue: 72000 },
  { id: 4, name: "DataFlow Ltd", contact: "Emma Davis", email: "emma@dataflow.com", projects: 1, revenue: 15000 },
];

export default function CRUDDemo() {
  const [activeTab, setActiveTab] = useState<"clients" | "projects" | "tasks" | "billing">("clients");
  const [showModal, setShowModal] = useState(false);

  return (
    <DemoLayout demo={demo}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ProjectHub</h1>
          <p className="text-gray-600">Enterprise project management system</p>
        </div>
        <div className="flex items-center gap-3">
          <Input placeholder="Search..." className="w-64" />
          <Button onClick={() => setShowModal(true)}>+ New {activeTab.slice(0, -1)}</Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b">
        {["clients", "projects", "tasks", "billing"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as typeof activeTab)}
            className={`px-4 py-3 text-sm font-medium capitalize border-b-2 transition-all ${
              activeTab === tab
                ? "border-amber-500 text-amber-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "clients" && (
        <Card padding="none">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Client</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Contact</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Projects</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Revenue</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
                          {client.name[0]}
                        </div>
                        <span className="font-medium text-gray-900">{client.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-900">{client.contact}</p>
                      <p className="text-sm text-gray-500">{client.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="info">{client.projects} active</Badge>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {formatCurrency(client.revenue)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">View</Button>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === "projects" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <Card key={project.id} hover>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-gray-900">{project.name}</h3>
                  <p className="text-sm text-gray-500">{project.client}</p>
                </div>
                <Badge variant={project.status === "active" ? "success" : project.status === "completed" ? "info" : "warning"}>
                  {project.status}
                </Badge>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} size="sm" color={project.progress > 70 ? "emerald" : "amber"} />
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-gray-500">
                  <span>📋</span>
                  <span>{project.completedTasks}/{project.tasks} tasks</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <span>📅</span>
                  <span>Due {formatDate(project.dueDate)}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t flex items-center justify-between">
                <span className="font-bold text-gray-900">{formatCurrency(project.budget)}</span>
                <Button variant="secondary" size="sm">Open</Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "tasks" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["To Do", "In Progress", "Done"].map((column) => (
              <div key={column} className="bg-gray-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">{column}</h3>
                  <Badge>{column === "To Do" ? 5 : column === "In Progress" ? 3 : 8}</Badge>
                </div>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} padding="sm" className="cursor-move hover:shadow-md">
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          column === "To Do" ? "bg-gray-400" : column === "In Progress" ? "bg-amber-500" : "bg-emerald-500"
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {column === "To Do" ? "Review design mockups" : column === "In Progress" ? "Implement API endpoints" : "Setup CI/CD pipeline"}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Avatar name={users[i].name} size="sm" />
                            <span className="text-xs text-gray-500">{users[i].name.split(" ")[0]}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === "billing" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <h3 className="font-bold text-gray-900 mb-4">Recent Invoices</h3>
              <div className="space-y-3">
                {[
                  { id: "INV-001", client: "TechCorp Inc", amount: 12500, status: "paid", date: "2024-12-01" },
                  { id: "INV-002", client: "StartupXYZ", amount: 8000, status: "pending", date: "2024-12-05" },
                  { id: "INV-003", client: "RetailMax", amount: 15000, status: "paid", date: "2024-11-28" },
                  { id: "INV-004", client: "DataFlow Ltd", amount: 5000, status: "overdue", date: "2024-11-15" },
                ].map((invoice) => (
                  <div key={invoice.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">{invoice.id}</span>
                        <Badge variant={invoice.status === "paid" ? "success" : invoice.status === "pending" ? "warning" : "danger"}>
                          {invoice.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">{invoice.client} • {formatDate(invoice.date)}</p>
                    </div>
                    <span className="font-bold text-gray-900">{formatCurrency(invoice.amount)}</span>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <h3 className="font-bold text-gray-900 mb-4">Revenue Summary</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(45500)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Outstanding</p>
                  <p className="text-2xl font-bold text-amber-600">{formatCurrency(13000)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Overdue</p>
                  <p className="text-2xl font-bold text-red-600">{formatCurrency(5000)}</p>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="secondary" className="w-full justify-start">📄 Create Invoice</Button>
                <Button variant="secondary" className="w-full justify-start">📊 Generate Report</Button>
                <Button variant="secondary" className="w-full justify-start">💳 Process Payment</Button>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Add New {activeTab.slice(0, -1)}</h3>
            <div className="space-y-4">
              <Input placeholder="Name" />
              <Input placeholder="Email" />
              <Input placeholder="Additional info" />
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="secondary" className="flex-1" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button className="flex-1" onClick={() => setShowModal(false)}>Create</Button>
            </div>
          </Card>
        </div>
      )}
    </DemoLayout>
  );
}
