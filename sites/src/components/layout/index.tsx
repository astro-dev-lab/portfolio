"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { SITE_CONFIG } from "@/lib/constants";
import { useAuth, AuthModal } from "@/lib/auth";

export function Header() {
  const pathname = usePathname();
  const isDemo = pathname.startsWith("/demos/");
  const { user, isAuthenticated, logout } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#0A0A0A] rounded flex items-center justify-center">
                <span className="text-white font-semibold text-sm">D</span>
              </div>
              <span className="font-semibold text-[#0A0A0A] tracking-tight">{SITE_CONFIG.name}</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                className={`text-sm font-medium transition-colors ${
                  pathname === "/" ? "text-[#0A0A0A]" : "text-[#6B7280] hover:text-[#0A0A0A]"
                }`}
              >
                Work
              </Link>
              <Link
                href="/#capabilities"
                className="text-sm font-medium text-[#6B7280] hover:text-[#0A0A0A] transition-colors"
              >
                Capabilities
              </Link>
              <Link
                href="/#about"
                className="text-sm font-medium text-[#6B7280] hover:text-[#0A0A0A] transition-colors"
              >
                About
              </Link>
              <Link
                href="/#contact"
                className="text-sm font-medium text-[#6B7280] hover:text-[#0A0A0A] transition-colors"
              >
                Contact
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              {isDemo && (
                <Link
                  href="/"
                  className="text-sm text-[#6B7280] hover:text-[#0A0A0A] flex items-center gap-1.5 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back
                </Link>
              )}
              
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#0A0A0A] rounded-full flex items-center justify-center text-white text-xs font-medium">
                      {user?.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <span className="text-sm font-medium text-[#374151] hidden sm:block">{user?.name}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="text-sm text-[#6B7280] hover:text-[#0A0A0A] transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuth(true)}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#0A0A0A] rounded hover:bg-[#1F2937] transition-colors"
                >
                  Sign In
                </button>
              )}
              
              <a
                href={SITE_CONFIG.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-[#6B7280] hover:text-[#0A0A0A] transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-[#6B7280] hover:text-[#0A0A0A]"
                aria-label="Menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden border-t border-[#E5E7EB] py-4">
              <nav className="flex flex-col gap-4">
                <Link href="/" className="text-sm font-medium text-[#374151]" onClick={() => setMobileMenuOpen(false)}>Work</Link>
                <Link href="/#capabilities" className="text-sm font-medium text-[#374151]" onClick={() => setMobileMenuOpen(false)}>Capabilities</Link>
                <Link href="/#about" className="text-sm font-medium text-[#374151]" onClick={() => setMobileMenuOpen(false)}>About</Link>
                <Link href="/#contact" className="text-sm font-medium text-[#374151]" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
              </nav>
            </div>
          )}
        </div>
      </header>
      
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#0A0A0A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-[#1F2937] to-[#111827] rounded-xl p-8 md:p-12 mb-16 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Build Something Great?</h3>
          <p className="text-[#9CA3AF] mb-6 max-w-xl mx-auto">
            Let&apos;s discuss how I can help bring your next project to life.
          </p>
          <a 
            href={`mailto:${SITE_CONFIG.email}`}
            className="inline-flex items-center justify-center px-6 py-3 font-semibold bg-white text-[#0A0A0A] rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Start a Conversation
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <span className="text-[#0A0A0A] font-semibold text-sm">D</span>
              </div>
              <span className="font-semibold tracking-tight">{SITE_CONFIG.name}</span>
            </div>
            <p className="text-[#9CA3AF] text-sm max-w-sm leading-relaxed">
              Senior full-stack engineer specializing in enterprise-grade systems. 
              Building scalable, maintainable solutions for complex business requirements.
            </p>
          </div>
          
          <div className="md:col-span-3">
            <h4 className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="text-[#D1D5DB] hover:text-white transition-colors">Work</Link></li>
              <li><Link href="/#capabilities" className="text-[#D1D5DB] hover:text-white transition-colors">Capabilities</Link></li>
              <li><Link href="/#about" className="text-[#D1D5DB] hover:text-white transition-colors">About</Link></li>
              <li><Link href="/#contact" className="text-[#D1D5DB] hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-4">
            <h4 className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wider mb-4">Connect</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={SITE_CONFIG.github} target="_blank" rel="noopener noreferrer" className="text-[#D1D5DB] hover:text-white transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE_CONFIG.email}`} className="text-[#D1D5DB] hover:text-white transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {SITE_CONFIG.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#1F2937] mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#6B7280]">
            {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p className="text-xs text-[#6B7280]">
            Built with Next.js and TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
}
