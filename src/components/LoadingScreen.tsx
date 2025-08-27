"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({
  onLoadingComplete,
}: LoadingScreenProps) {
  const [loadingPercentage, setLoadingPercentage] = useState(0);

  useEffect(() => {
    // Load Unicorn Studio script
    if (!window.UnicornStudio) {
      window.UnicornStudio = { isInitialized: false, init: () => {} };
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js";
      script.onload = function () {
        if (!window.UnicornStudio.isInitialized) {
          window.UnicornStudio.init();
          window.UnicornStudio.isInitialized = true;
        }
      };
      (document.head || document.body).appendChild(script);
    }

    // Simulate loading progress - synchronized with circle animation
    const interval = setInterval(() => {
      setLoadingPercentage((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Add 2 second delay before transition
          setTimeout(() => {
            onLoadingComplete();
          }, 2000);
          return 100;
        }
        // Slower, more controlled increment to match 2.5s circle animation
        return prev + Math.random() * 8 + 4; // Increment between 4-12
      });
    }, 60); // Faster updates for smoother progress

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{
          opacity: 0,
          scale: 1.05,
          filter: "blur(10px)",
        }}
        transition={{
          duration: 1.2,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="fixed inset-0 z-[999999] bg-black flex items-center justify-center"
      >
        {/* Unicorn Studio Moving Effect */}
        <div
          data-us-project="ODnd4QO1YxC2jW2uOKFh"
          style={{
            width: "100vw",
            height: "100vh",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
            opacity: 0.3,
          }}
        />

        {/* NFT Marketplace Loading Design */}
        <div className="relative z-10 flex flex-col items-center justify-center space-y-8">
          {/* Hexagonal NFT Frame */}
          <motion.div
            initial={{ scale: 0, opacity: 0, rotateY: 180 }}
            animate={{
              scale: [0, 1, 0.95, 1],
              opacity: [0, 1, 0.9, 1],
              rotateY: [180, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: 0,
              ease: "easeInOut",
            }}
            className="relative"
          >
            {/* Outer Hexagon Border */}
            <div className="w-64 h-64 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500 rounded-3xl p-1">
                <div className="w-full h-full bg-black rounded-3xl flex items-center justify-center relative overflow-hidden">
                  {/* Animated Grid Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent"
                        style={{
                          top: `${(i + 1) * 16.66}%`,
                          left: 0,
                          right: 0,
                        }}
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{
                          duration: 1.5,
                          delay: i * 0.1,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                      />
                    ))}
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-px bg-gradient-to-b from-transparent via-orange-400 to-transparent"
                        style={{
                          left: `${(i + 1) * 16.66}%`,
                          top: 0,
                          bottom: 0,
                        }}
                        initial={{ scaleY: 0, opacity: 0 }}
                        animate={{ scaleY: 1, opacity: 1 }}
                        transition={{
                          duration: 1.5,
                          delay: i * 0.1 + 0.5,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                      />
                    ))}
                  </div>

                  {/* NFT Logo Container */}
                  <div className="relative z-10 flex flex-col items-center justify-center">
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        rotateY: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="w-20 h-20 bg-gradient-to-br from-orange-400 via-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-orange-500/30 border-2 border-white/20"
                    >
                      <motion.div
                        animate={{
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Sparkles className="w-10 h-10 text-white drop-shadow-lg" />
                      </motion.div>
                    </motion.div>

                    {/* NFT Metadata Display */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 1 }}
                      className="mt-6 text-center space-y-2"
                    >
                      <motion.h1
                        animate={{
                          textShadow: [
                            "0 0 10px rgba(249, 115, 22, 0.5)",
                            "0 0 20px rgba(249, 115, 22, 0.8)",
                            "0 0 10px rgba(249, 115, 22, 0.5)",
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="text-white text-xl font-black tracking-wider"
                      >
                        CurateAI
                      </motion.h1>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 0.8 }}
                        className="space-y-1"
                      >
                        <p className="text-orange-300 text-xs font-medium tracking-widest">
                          NFT DISCOVERY PLATFORM
                        </p>
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                          <span className="text-green-400 text-xs font-mono">
                            BLOCKCHAIN CONNECTED
                          </span>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Loading Progress Bar */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="w-80 space-y-3"
          >
            <div className="flex justify-between text-xs text-gray-400 font-mono">
              <span>INITIALIZING</span>
              <span>{Math.round(loadingPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-800/50 rounded-full h-2 overflow-hidden border border-gray-700">
              <motion.div
                className="h-full bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500 rounded-full relative"
                initial={{ width: 0 }}
                animate={{ width: `${loadingPercentage}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// Add UnicornStudio to global window object
declare global {
  interface Window {
    UnicornStudio: {
      isInitialized: boolean;
      init: () => void;
    };
  }
}
