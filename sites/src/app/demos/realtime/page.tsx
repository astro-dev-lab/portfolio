"use client";

import { useState, useEffect } from "react";
import { DEMOS } from "@/lib/constants";
import { DemoLayout, DemoSection } from "@/components/demos/DemoLayout";
import { Button, Card, Badge, Input, Avatar } from "@/components/ui";
import { generateMockMessages, generateMockUsers } from "@/lib/utils";

const demo = DEMOS.find((d) => d.id === "realtime-chat")!;
const users = generateMockUsers(6);
const initialMessages = generateMockMessages(10);

const channels = [
  { id: "general", name: "General", icon: "#", unread: 3 },
  { id: "design", name: "Design", icon: "#", unread: 0 },
  { id: "dev", name: "Development", icon: "#", unread: 7 },
  { id: "random", name: "Random", icon: "#", unread: 0 },
];

const directMessages = [
  { user: users[0], online: true, unread: 2 },
  { user: users[1], online: true, unread: 0 },
  { user: users[2], online: false, unread: 0 },
  { user: users[3], online: true, unread: 1 },
];

export default function RealtimeDemo() {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [activeChannel, setActiveChannel] = useState("general");
  const [isTyping, setIsTyping] = useState(false);

  // Simulate incoming messages
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [
            {
              id: `msg-${Date.now()}`,
              content: ["Great work! 🎉", "Let's sync up later", "Sounds good to me", "I'll take a look"][Math.floor(Math.random() * 4)],
              user: users[Math.floor(Math.random() * users.length)],
              timestamp: new Date().toISOString(),
              reactions: [],
            },
            ...prev,
          ]);
        }, 2000);
      }
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages((prev) => [
      {
        id: `msg-${Date.now()}`,
        content: newMessage,
        user: { ...users[0], name: "You" },
        timestamp: new Date().toISOString(),
        reactions: [],
      },
      ...prev,
    ]);
    setNewMessage("");
  };

  return (
    <DemoLayout demo={demo}>
      <div className="flex gap-0 bg-white rounded-xl overflow-hidden border shadow-lg h-[600px]">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 text-white flex flex-col">
          {/* Workspace */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center font-bold">
                T
              </div>
              <div>
                <h2 className="font-bold">TeamSync</h2>
                <p className="text-xs text-gray-400">5 online</p>
              </div>
            </div>
          </div>

          {/* Channels */}
          <div className="flex-1 overflow-y-auto p-3">
            <div className="mb-4">
              <div className="flex items-center justify-between px-2 py-1">
                <span className="text-xs font-semibold text-gray-400 uppercase">Channels</span>
                <button className="text-gray-400 hover:text-white">+</button>
              </div>
              {channels.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => setActiveChannel(channel.id)}
                  className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm ${
                    activeChannel === channel.id ? "bg-blue-600" : "hover:bg-gray-800"
                  }`}
                >
                  <span className="text-gray-400">{channel.icon}</span>
                  <span className="flex-1 text-left">{channel.name}</span>
                  {channel.unread > 0 && (
                    <span className="bg-red-500 text-xs px-1.5 py-0.5 rounded-full">{channel.unread}</span>
                  )}
                </button>
              ))}
            </div>

            <div>
              <div className="flex items-center justify-between px-2 py-1">
                <span className="text-xs font-semibold text-gray-400 uppercase">Direct Messages</span>
                <button className="text-gray-400 hover:text-white">+</button>
              </div>
              {directMessages.map((dm) => (
                <button
                  key={dm.user.id}
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm hover:bg-gray-800"
                >
                  <div className="relative">
                    <Avatar name={dm.user.name} size="sm" />
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-gray-900 ${
                      dm.online ? "bg-emerald-500" : "bg-gray-500"
                    }`} />
                  </div>
                  <span className="flex-1 text-left truncate">{dm.user.name}</span>
                  {dm.unread > 0 && (
                    <span className="bg-red-500 text-xs px-1.5 py-0.5 rounded-full">{dm.unread}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* User */}
          <div className="p-3 border-t border-gray-700">
            <div className="flex items-center gap-2">
              <Avatar name="You" size="sm" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Your Name</p>
                <p className="text-xs text-emerald-400">● Online</p>
              </div>
              <button className="text-gray-400 hover:text-white">⚙️</button>
            </div>
          </div>
        </div>

        {/* Main Chat */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="px-4 py-3 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-xl">#</span>
              <h3 className="font-bold text-gray-900">{channels.find(c => c.id === activeChannel)?.name}</h3>
            </div>
            <div className="flex items-center gap-3">
              <button className="text-gray-400 hover:text-gray-600">🔍</button>
              <button className="text-gray-400 hover:text-gray-600">📌</button>
              <button className="text-gray-400 hover:text-gray-600">👥</button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col-reverse gap-4">
            {isTyping && (
              <div className="flex items-center gap-3 text-gray-500 text-sm">
                <Avatar name={users[1].name} size="sm" />
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
                <span>{users[1].name} is typing...</span>
              </div>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className="flex items-start gap-3 group">
                <Avatar name={msg.user.name} size="md" />
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-gray-900">{msg.user.name}</span>
                    <span className="text-xs text-gray-400">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <p className="text-gray-700">{msg.content}</p>
                  {msg.reactions.length > 0 && (
                    <div className="flex gap-1 mt-1">
                      {msg.reactions.map((r, i) => (
                        <span key={i} className="text-sm bg-gray-100 px-1.5 py-0.5 rounded">{r}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="opacity-0 group-hover:opacity-100 flex gap-1">
                  <button className="p-1 hover:bg-gray-100 rounded">😀</button>
                  <button className="p-1 hover:bg-gray-100 rounded">💬</button>
                  <button className="p-1 hover:bg-gray-100 rounded">⋮</button>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
              <button className="text-gray-400 hover:text-gray-600">➕</button>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder={`Message #${channels.find(c => c.id === activeChannel)?.name}`}
                className="flex-1 bg-transparent outline-none"
              />
              <button className="text-gray-400 hover:text-gray-600">😀</button>
              <button className="text-gray-400 hover:text-gray-600">📎</button>
              <button onClick={sendMessage} className="text-blue-500 hover:text-blue-600 font-medium">
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-64 border-l p-4 hidden lg:block">
          <h4 className="font-bold text-gray-900 mb-4">Channel Details</h4>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-2">About</p>
              <p className="text-sm text-gray-700">General discussions and announcements for the team.</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Members ({users.length})</p>
              <div className="flex -space-x-2">
                {users.slice(0, 5).map((user) => (
                  <Avatar key={user.id} name={user.name} size="sm" />
                ))}
                {users.length > 5 && (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                    +{users.length - 5}
                  </div>
                )}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Pinned</p>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 text-sm">
                📌 Weekly standup every Monday at 10am
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <DemoSection title="Real-Time Features" className="mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "⚡", title: "Instant Messaging", desc: "WebSocket powered" },
            { icon: "👥", title: "Presence", desc: "See who's online" },
            { icon: "📎", title: "File Sharing", desc: "Drag and drop" },
            { icon: "🔔", title: "Notifications", desc: "Never miss a message" },
          ].map((f) => (
            <Card key={f.title} hover padding="sm" className="text-center">
              <div className="text-3xl mb-2">{f.icon}</div>
              <h4 className="font-medium text-gray-900">{f.title}</h4>
              <p className="text-xs text-gray-500">{f.desc}</p>
            </Card>
          ))}
        </div>
      </DemoSection>
    </DemoLayout>
  );
}
