"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SquareMenu, Wallet, SearchX, PanelLeft, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface SearchSuggestion {
  id: string;
  text: string;
  type: "artist" | "collection" | "nft";
}

interface HeaderBarProps {
  onSearch?: (query: string) => void;
  className?: string;
}

export default function HeaderBar({
  onSearch,
  className = "",
}: HeaderBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);

  const searchRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Mock suggestions data
  const mockSuggestions: SearchSuggestion[] = [
    { id: "1", text: "Bored Ape Yacht Club", type: "collection" },
    { id: "2", text: "CryptoPunks", type: "collection" },
    { id: "3", text: "Azuki", type: "collection" },
    { id: "4", text: "Pak", type: "artist" },
    { id: "5", text: "Beeple", type: "artist" },
    { id: "6", text: "The Merge", type: "nft" },
  ];

  const handleWalletConnect = useCallback(async () => {
    if (isWalletConnected) return;

    setIsConnecting(true);
    try {
      // Simulate wallet connection
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const mockAddress = "0x742d35Cc6634C0532925a3b8D404d29D4f1392b8";
      setWalletAddress(mockAddress);
      setIsWalletConnected(true);
      toast.success("Wallet connected successfully");
    } catch (error) {
      toast.error("Failed to connect wallet");
    } finally {
      setIsConnecting(false);
    }
  }, [isWalletConnected]);

  const handleWalletDisconnect = useCallback(() => {
    setIsWalletConnected(false);
    setWalletAddress("");
    toast.success("Wallet disconnected");
  }, []);

  const handleCopyAddress = useCallback(() => {
    if (
      walletAddress &&
      typeof navigator !== "undefined" &&
      navigator.clipboard
    ) {
      navigator.clipboard.writeText(walletAddress);
      toast.success("Address copied to clipboard");
    }
  }, [walletAddress]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (value.trim()) {
      debounceRef.current = setTimeout(() => {
        const filtered = mockSuggestions
          .filter((suggestion) =>
            suggestion.text.toLowerCase().includes(value.toLowerCase())
          )
          .slice(0, 5);
        setSuggestions(filtered);
        setShowSuggestions(true);
        setSelectedSuggestionIndex(-1);
      }, 150);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, []);

  const handleSearchSubmit = useCallback(
    (query?: string) => {
      const searchTerm = query || searchQuery;
      if (searchTerm.trim()) {
        onSearch?.(searchTerm);
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
      }
    },
    [searchQuery, onSearch]
  );

  const handleSuggestionSelect = useCallback(
    (suggestion: SearchSuggestion) => {
      setSearchQuery(suggestion.text);
      handleSearchSubmit(suggestion.text);
    },
    [handleSearchSubmit]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!showSuggestions) {
        if (e.key === "Enter") {
          handleSearchSubmit();
        }
        return;
      }

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedSuggestionIndex((prev) =>
            prev < searchSuggestions.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedSuggestionIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case "Enter":
          e.preventDefault();
          if (selectedSuggestionIndex >= 0) {
            handleSuggestionSelect(searchSuggestions[selectedSuggestionIndex]);
          } else {
            handleSearchSubmit();
          }
          break;
        case "Escape":
          setShowSuggestions(false);
          setSelectedSuggestionIndex(-1);
          break;
      }
    },
    [
      showSuggestions,
      searchSuggestions,
      selectedSuggestionIndex,
      handleSearchSubmit,
      handleSuggestionSelect,
    ]
  );

  // Global keyboard shortcut for search
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        if (
          document.activeElement?.tagName !== "INPUT" &&
          document.activeElement?.tagName !== "TEXTAREA"
        ) {
          e.preventDefault();
          searchRef.current?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => document.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getSuggestionIcon = (type: SearchSuggestion["type"]) => {
    switch (type) {
      case "collection":
        return "🎨";
      case "artist":
        return "👤";
      case "nft":
        return "🖼️";
      default:
        return "🔍";
    }
  };

  return (
    <header
      className={`bg-black/95 backdrop-blur border-b border-border shadow-lg sticky top-0 z-[99999] ${className}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3 blur-slide-up">
              <div className="w-10 h-10 blur-orange-gradient rounded-xl flex items-center justify-center blur-glow">
                <Sparkles className="w-5 h-5 text-black font-bold" />
              </div>
              <h1 className="text-2xl font-heading font-bold text-white tracking-tight">
                CurateAI
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              <Button
                variant="ghost"
                className="text-sm font-medium text-white hover:text-primary hover:bg-primary/10 transition-all duration-200"
              >
                Discover
              </Button>
              <Button
                variant="ghost"
                className="text-sm font-medium text-white hover:text-primary hover:bg-primary/10 transition-all duration-200"
              >
                Playlists
              </Button>
              <Button
                variant="ghost"
                className="text-sm font-medium text-white hover:text-primary hover:bg-primary/10 transition-all duration-200"
              >
                Activity
              </Button>
              <Button
                variant="ghost"
                className="text-sm font-medium text-white hover:text-primary hover:bg-primary/10 transition-all duration-200"
              >
                Settings
              </Button>
            </nav>
          </div>

          {/* Center Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8 relative z-[999999]">
            <div className="relative w-full">
              <Input
                ref={searchRef}
                type="text"
                placeholder="Search artists, collections, NFTs…"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full pr-12 bg-black/50 border-border focus:ring-primary focus:border-primary text-white placeholder:text-gray-400"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => {
                      setSearchQuery("");
                      setShowSuggestions(false);
                    }}
                  >
                    <SearchX className="h-3 w-3" />
                  </Button>
                )}
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  /
                </kbd>
              </div>
            </div>

            {/* Search Suggestions */}
            {showSuggestions && searchSuggestions.length > 0 && (
              <div
                ref={suggestionsRef}
                className="absolute top-full mt-2 w-full bg-black/95 border border-orange-500/20 rounded-lg shadow-2xl z-[9999999] overflow-hidden backdrop-blur-md"
              >
                {searchSuggestions.map((suggestion, index) => (
                  <button
                    key={suggestion.id}
                    className={`w-full px-4 py-3 text-left flex items-center space-x-3 hover:bg-orange-500/10 transition-colors ${
                      index === selectedSuggestionIndex
                        ? "bg-orange-500/10"
                        : ""
                    }`}
                    onClick={() => handleSuggestionSelect(suggestion)}
                  >
                    <span className="text-sm">
                      {getSuggestionIcon(suggestion.type)}
                    </span>
                    <span className="flex-1 text-sm text-white">
                      {suggestion.text}
                    </span>
                    <Badge
                      variant="secondary"
                      className="text-xs bg-orange-500/20 text-orange-300 border-orange-500/30"
                    >
                      {suggestion.type}
                    </Badge>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-3 relative z-[99999999]">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <SquareMenu className="h-5 w-5" />
            </Button>

            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setHasUnreadNotifications(false)}
                aria-label="Notifications"
                className="relative"
              >
                <span className="text-lg">🔔</span>
                {hasUnreadNotifications && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
                )}
              </Button>
            </div>

            {/* Settings */}
            <Button variant="ghost" size="sm" aria-label="Settings">
              <span className="text-lg">⚙️</span>
            </Button>

            {/* Wallet Controls */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={isWalletConnected ? "outline" : "default"}
                  size="sm"
                  disabled={isConnecting}
                  className="flex items-center space-x-2"
                >
                  {isConnecting ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Wallet className="h-4 w-4" />
                  )}
                  <span className="hidden sm:inline">
                    {isWalletConnected
                      ? formatAddress(walletAddress)
                      : isConnecting
                      ? "Connecting..."
                      : "Connect"}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 z-[99999999]">
                {isWalletConnected ? (
                  <>
                    <div className="px-3 py-2">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {walletAddress.slice(2, 4).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">Connected</p>
                          <p className="text-xs text-muted-foreground">
                            {formatAddress(walletAddress)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleCopyAddress}>
                      Copy Address
                    </DropdownMenuItem>
                    <DropdownMenuItem>Switch Network</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleWalletDisconnect}
                      className="text-destructive"
                    >
                      Disconnect
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem onClick={handleWalletConnect}>
                    <Wallet className="h-4 w-4 mr-2" />
                    Connect Wallet
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border py-4">
            <nav className="flex flex-col space-y-2">
              <Button
                variant="ghost"
                className="justify-start text-sm font-medium"
              >
                Discover
              </Button>
              <Button
                variant="ghost"
                className="justify-start text-sm font-medium"
              >
                Playlists
              </Button>
              <Button
                variant="ghost"
                className="justify-start text-sm font-medium"
              >
                Activity
              </Button>
              <Button
                variant="ghost"
                className="justify-start text-sm font-medium"
              >
                Settings
              </Button>
            </nav>

            {/* Mobile Search */}
            <div className="mt-4 md:hidden">
              <Input
                type="text"
                placeholder="Search artists, collections, NFTs…"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-input border-border focus:ring-ring"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
