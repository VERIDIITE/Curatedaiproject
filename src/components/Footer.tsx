"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Github,
  Twitter,
  MessageCircle,
  Mail,
  Heart,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-border/20 mt-auto relative overflow-hidden">
      {/* Left Decorative Symbol */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 opacity-20">
        <div className="w-16 h-16 border border-primary/30 rounded-full relative">
          <div className="absolute inset-2 border border-primary/20 rounded-full"></div>
          <div className="absolute inset-4 border border-primary/10 rounded-full"></div>
        </div>
      </div>

      {/* Right Decorative Symbol */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-20">
        <div className="w-12 h-12 border border-primary/30 relative">
          <div className="absolute top-0 left-0 w-6 h-6 border-r border-b border-primary/20"></div>
          <div className="absolute top-0 right-0 w-6 h-6 border-l border-b border-primary/20"></div>
          <div className="absolute bottom-0 left-0 w-6 h-6 border-r border-t border-primary/20"></div>
          <div className="absolute bottom-0 right-0 w-6 h-6 border-l border-t border-primary/20"></div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-6">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 blur-orange-gradient rounded-xl flex items-center justify-center blur-glow">
              <Sparkles className="w-4 h-4 text-black font-bold" />
            </div>
            <h3 className="text-lg font-heading font-bold text-white tracking-tight">
              CurateAI
            </h3>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-6">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://discord.gg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="mailto:hello@curateai.com"
              className="text-gray-400 hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-xs font-sans text-gray-500 tracking-wide">
              © {currentYear} CurateAI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
