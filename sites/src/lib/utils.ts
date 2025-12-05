// Mock data generators and utilities

export const generateMockUsers = (count: number) => {
  const names = ["Alex Johnson", "Sarah Chen", "Mike Williams", "Emma Davis", "James Brown", "Olivia Miller", "David Wilson", "Sophia Anderson"];
  return Array.from({ length: count }, (_, i) => ({
    id: `user-${i + 1}`,
    name: names[i % names.length],
    email: `${names[i % names.length].toLowerCase().replace(" ", ".")}@example.com`,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
    role: i === 0 ? "Admin" : i < 3 ? "Manager" : "Member",
  }));
};

export const generateMockProducts = (count: number) => {
  const products = [
    { name: "Premium Wireless Headphones", category: "Electronics", basePrice: 299 },
    { name: "Minimalist Leather Wallet", category: "Accessories", basePrice: 79 },
    { name: "Smart Fitness Watch", category: "Electronics", basePrice: 249 },
    { name: "Organic Cotton T-Shirt", category: "Clothing", basePrice: 45 },
    { name: "Ceramic Pour-Over Set", category: "Home", basePrice: 65 },
    { name: "Laptop Sleeve Premium", category: "Accessories", basePrice: 55 },
    { name: "Noise-Canceling Earbuds", category: "Electronics", basePrice: 179 },
    { name: "Merino Wool Sweater", category: "Clothing", basePrice: 129 },
  ];
  return Array.from({ length: count }, (_, i) => ({
    id: `prod-${i + 1}`,
    ...products[i % products.length],
    price: products[i % products.length].basePrice + (i * 10),
    rating: 4 + Math.random(),
    reviews: Math.floor(Math.random() * 500) + 10,
    stock: Math.floor(Math.random() * 100) + 5,
    image: `https://picsum.photos/seed/${i + 100}/400/400`,
  }));
};

export const generateMockChartData = (days: number) => {
  const data = [];
  let value = 1000;
  for (let i = 0; i < days; i++) {
    value += (Math.random() - 0.4) * 100;
    data.push({
      date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      value: Math.max(0, Math.round(value)),
      visits: Math.floor(Math.random() * 1000) + 200,
      conversions: Math.floor(Math.random() * 50) + 5,
    });
  }
  return data;
};

export const generateMockProjects = (count: number) => {
  const projects = [
    { name: "Website Redesign", client: "TechCorp Inc", status: "active" },
    { name: "Mobile App Development", client: "StartupXYZ", status: "active" },
    { name: "E-commerce Platform", client: "RetailMax", status: "completed" },
    { name: "Dashboard Analytics", client: "DataFlow Ltd", status: "active" },
    { name: "API Integration", client: "ConnectHub", status: "pending" },
  ];
  return Array.from({ length: count }, (_, i) => ({
    id: `proj-${i + 1}`,
    ...projects[i % projects.length],
    budget: (i + 1) * 5000 + 10000,
    progress: Math.floor(Math.random() * 100),
    dueDate: new Date(Date.now() + (i + 1) * 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    tasks: Math.floor(Math.random() * 20) + 5,
    completedTasks: Math.floor(Math.random() * 15),
  }));
};

export const generateMockMessages = (count: number) => {
  const messages = [
    "Hey, how's the project going?",
    "Just pushed the latest changes to main",
    "Can we schedule a quick sync?",
    "The client loved the new design!",
    "Don't forget about the meeting at 3pm",
    "Great work on the dashboard!",
  ];
  const users = generateMockUsers(5);
  return Array.from({ length: count }, (_, i) => ({
    id: `msg-${i + 1}`,
    content: messages[i % messages.length],
    user: users[i % users.length],
    timestamp: new Date(Date.now() - i * 60 * 1000 * Math.random() * 60).toISOString(),
    reactions: Math.random() > 0.7 ? ["👍", "🎉"] : [],
  }));
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
};

export const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};
