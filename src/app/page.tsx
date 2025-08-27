"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import HeaderBar from "@/components/HeaderBar";
import DiscoveryHub from "@/components/DiscoveryHub";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import { Toaster } from "sonner";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  const handleSearch = (query: string) => {
    console.log("Search query:", query);
  };

  const handleCreatePlaylist = () => {
    console.log("Create playlist clicked");
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <motion.div
      className="min-h-screen bg-background flex flex-col"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1.5,
        delay: 0.3,
        ease: [0.4, 0.0, 0.2, 1],
      }}
    >
      <HeaderBar onSearch={handleSearch} />

      <main className="flex-1">
        <DiscoveryHub />
      </main>

      <Footer />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          className: "bg-background border-border text-foreground",
        }}
      />
    </motion.div>
  );
}
