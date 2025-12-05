"use client";

import { useState, useEffect, useRef } from "react";
import { DEMOS } from "@/lib/constants";
import { DemoLayout, DemoSection } from "@/components/demos/DemoLayout";
import { Button, Card, Badge } from "@/components/ui";

const demo = DEMOS.find((d) => d.id === "3d-experience")!;

export default function CreativeDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isInteractive, setIsInteractive] = useState(true);
  const [theme, setTheme] = useState<"purple" | "blue" | "green">("purple");
  const [particleCount, setParticleCount] = useState(100);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const colors = {
      purple: ["#8b5cf6", "#6366f1", "#a855f7"],
      blue: ["#3b82f6", "#06b6d4", "#0ea5e9"],
      green: ["#10b981", "#34d399", "#22c55e"],
    };

    interface Particle {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      color: string;
    }

    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        color: colors[theme][Math.floor(Math.random() * colors[theme].length)],
      });
    }

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    if (isInteractive) {
      canvas.addEventListener("mousemove", handleMouseMove);
    }

    let animationId: number;

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        if (isInteractive) {
          const dx = mouseX - particle.x;
          const dy = mouseY - particle.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 150) {
            particle.vx += dx * 0.001;
            particle.vy += dy * 0.001;
          }
        }

        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Draw connections
        particles.slice(i + 1).forEach((other) => {
          const dx = other.x - particle.x;
          const dy = other.y - particle.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 80) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${1 - dist / 80})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isInteractive, theme, particleCount]);

  return (
    <DemoLayout demo={demo}>
      {/* Interactive Canvas */}
      <Card className="relative overflow-hidden mb-8" padding="none">
        <canvas
          ref={canvasRef}
          className="w-full h-[500px] bg-gray-900 cursor-crosshair"
        />
        
        {/* Overlay Content */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Immersive
              <span className="block gradient-text">Experiences</span>
            </h2>
            <p className="text-white/60 text-lg">Move your mouse to interact</p>
          </div>
        </div>

        {/* Controls */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-white/60 text-sm">Theme:</span>
            {(["purple", "blue", "green"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`w-8 h-8 rounded-full transition-transform ${
                  theme === t ? "scale-110 ring-2 ring-white" : ""
                } ${
                  t === "purple" ? "bg-violet-500" : t === "blue" ? "bg-blue-500" : "bg-emerald-500"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-white/60 text-sm">Particles:</span>
              <input
                type="range"
                min="50"
                max="200"
                value={particleCount}
                onChange={(e) => setParticleCount(Number(e.target.value))}
                className="w-24"
              />
            </div>
            <Button
              variant={isInteractive ? "primary" : "secondary"}
              size="sm"
              onClick={() => setIsInteractive(!isInteractive)}
            >
              {isInteractive ? "Interactive: ON" : "Interactive: OFF"}
            </Button>
          </div>
        </div>
      </Card>

      {/* 3D Card Gallery */}
      <DemoSection title="3D Card Effects">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "WebGL", icon: "🌐", desc: "Hardware-accelerated graphics" },
            { title: "Three.js", icon: "🎲", desc: "3D library for the web" },
            { title: "GSAP", icon: "✨", desc: "Professional animations" },
          ].map((card) => (
            <div
              key={card.title}
              className="group perspective-1000"
            >
              <Card
                className="bg-gradient-to-br from-gray-900 to-gray-800 text-white border-0 transform transition-all duration-500 group-hover:rotate-y-12 group-hover:scale-105"
                hover
              >
                <div className="text-5xl mb-4">{card.icon}</div>
                <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                <p className="text-gray-400">{card.desc}</p>
              </Card>
            </div>
          ))}
        </div>
      </DemoSection>

      {/* Scroll Animation Preview */}
      <DemoSection title="Scroll-Triggered Animations">
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <Card
              key={i}
              className="transform transition-all duration-700 hover:translate-x-4"
              hover
            >
              <div className="flex items-center gap-6">
                <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${
                  i === 1 ? "from-violet-500 to-purple-600" :
                  i === 2 ? "from-blue-500 to-cyan-600" :
                  "from-emerald-500 to-teal-600"
                } flex items-center justify-center text-3xl text-white`}>
                  {i === 1 ? "📱" : i === 2 ? "💻" : "🚀"}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">
                    {i === 1 ? "Mobile First Design" : i === 2 ? "Cross-Platform Ready" : "Performance Optimized"}
                  </h3>
                  <p className="text-gray-600">
                    {i === 1 ? "Responsive layouts that work everywhere" :
                     i === 2 ? "Build once, deploy anywhere" :
                     "60fps animations and smooth interactions"}
                  </p>
                </div>
                <Badge variant="success">Live</Badge>
              </div>
            </Card>
          ))}
        </div>
      </DemoSection>

      {/* Tech Showcase */}
      <DemoSection title="Technologies">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "WebGL", level: 90 },
            { name: "Canvas API", level: 95 },
            { name: "Three.js", level: 85 },
            { name: "GSAP", level: 90 },
            { name: "Framer Motion", level: 95 },
            { name: "CSS Animations", level: 100 },
            { name: "SVG Animation", level: 85 },
            { name: "Lottie", level: 80 },
          ].map((tech) => (
            <Card key={tech.name} hover padding="sm" className="text-center">
              <h4 className="font-medium text-gray-900 mb-2">{tech.name}</h4>
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-purple-600 rounded-full transition-all duration-1000"
                  style={{ width: `${tech.level}%` }}
                />
              </div>
            </Card>
          ))}
        </div>
      </DemoSection>
    </DemoLayout>
  );
}
