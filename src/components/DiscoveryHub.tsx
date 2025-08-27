"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Heart,
  X,
  Info,
  RotateCcw,
  ChevronDown,
  Filter,
  Sparkles,
  Play,
  Edit,
  Share,
  Plus,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Zap,
  Eye,
  TrendingUp,
  MoreHorizontal,
  Save,
  ExternalLink,
  DollarSign,
  Users,
  Clock,
  Star,
  Shuffle,
  Grid3x2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Toggle } from "@/components/ui/toggle";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

interface NFT {
  id: string;
  title: string;
  collection: string;
  image: string;
  floorPrice: number;
  aiSummary: string;
  aiConfidence: number;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  traits: string[];
  chain: string;
  tokenId: string;
  priceHistory: number[];
}

interface Playlist {
  id: string;
  title: string;
  description: string;
  nfts: NFT[];
  aiSummary: string;
  totalValue: number;
  isPublic: boolean;
  coverImages: string[];
  createdAt: Date;
}

interface NFTCollection {
  id: string;
  name: string;
  description: string;
  image: string;
  floorPrice: number;
  volume24h: number;
  items: number;
  owners: number;
  chain: string;
  verified: boolean;
  trending: boolean;
}

const mockNFTs: NFT[] = [
  {
    id: "1",
    title: "Bored Ape #1337",
    collection: "Bored Ape Yacht Club",
    image:
      "https://img-cdn.magiceden.dev/rs:fill:400:0:0/plain/https%3A%2F%2Fimg.reservoir.tools%2Fimages%2Fv2%2Fmainnet%2Fz9JRSpLYGu7%252BCZoKWtAuAA79K674Y2b4%252F48FTC1v%252BJ4rEwpjEK3D0qjUdzqyInvnSJFH5IaIgEk7pF0NEn6WqgSgbCdGL27rkoWAYjQhV2aH%252F8nBd9uVO2ymg2znWvbXJa379tKUzlm4lW4%252BFvX3Lkybz6boYKjCsVC4GCdwAv31e%252BCSMdhCyyVeL2Un9dcLa9vHbxG7s6856aXg5DQonA%253D%253D",
    floorPrice: 25.5,
    aiSummary:
      "Rare Bored Ape with golden fur and diamond eyes. High trading volume and strong community backing.",
    aiConfidence: 87,
    rarity: "Legendary",
    traits: ["Golden Fur", "Diamond Eyes", "Rare Background"],
    chain: "Ethereum",
    tokenId: "1337",
    priceHistory: [22.1, 23.3, 25.5, 24.4, 25.5],
  },
  {
    id: "2",
    title: "Doodle #892",
    collection: "Doodles",
    image:
      "https://img-cdn.magiceden.dev/autoquality:size:512000:20:80/rs:fill:250:0:0/plain/https%3A%2F%2Fimg.reservoir.tools%2Fimages%2Fv2%2Fmainnet%2Fz9JRSpLYGu7%252BCZoKWtAuAI8ipNM7MJ1GQZfU57rB7lIEyx%252FONfn5NjLUzG%252FzZsB4eeY3HDjf3tMPF6UwbHrdukfTbcGKOzKTrWrt4QMhDO5B9pTVyjYe3edM2bvcv6TJ",
    floorPrice: 8.2,
    aiSummary:
      "Colorful Doodle with rainbow skin and cosmic hat. Trending on OpenSea with increasing floor price.",
    aiConfidence: 92,
    rarity: "Epic",
    traits: ["Rainbow Skin", "Cosmic Hat", "Rare Expression"],
    chain: "Ethereum",
    tokenId: "892",
    priceHistory: [7.5, 7.8, 8.2, 8.0, 8.2],
  },
  {
    id: "3",
    title: "Azuki #456",
    collection: "Azuki",
    image:
      "https://img-cdn.magiceden.dev/rs:fill:400:0:0/plain/https%3A%2F%2Fimg.reservoir.tools%2Fimages%2Fv2%2Fmainnet%2Fz9JRSpLYGu7%252BCZoKWtAuAGpnDPPI%252BsrhYBKQuBYc6XZMHTg6SSHih%252BOpmF%252FwAS4qY4NdVw4CAhgA1Wbpkx5GEXUwbgPcTN51MGZZWQi4%252FXlqxGoEDq%252FdAAlbOf2MwsZeMqMtUcF4j9cSCSDQMIVxbE%252FH2GQQzLcaEiWTS7%252Br1jEJDCE%252BYyhgHNXRacqbg83%252BHjskso2DDPLf34X1aTpELQ%253D%253D",
    floorPrice: 12.8,
    aiSummary:
      "Legendary Azuki with Spirit trait and rare accessories. High demand in the marketplace.",
    aiConfidence: 95,
    rarity: "Legendary",
    traits: ["Spirit", "Rare Accessories", "Legendary Background"],
    chain: "Ethereum",
    tokenId: "456",
    priceHistory: [11.2, 12.0, 12.8, 12.5, 12.8],
  },
  {
    id: "4",
    title: "Moonbird #789",
    collection: "Moonbirds",
    image:
      "https://img-cdn.magiceden.dev/autoquality:size:512000:20:80/rs:fill:250:0:0/plain/https%3A%2F%2Fimg.reservoir.tools%2Fimages%2Fv2%2Fmainnet%2Fkhnv7QtJSsXhx7z5lxeoZ3cpmRNaSSEs5u2gRvbSuWIASnl9h4yweGkwQ6g18ZnvFfDTz2B9OeyWYgo2kX6Wxr2X6ntahPsPcZjMyBOm3v20QhGyAvk8CNhRviAZuQ3rAMjkV2uSWO%252BeaIA1AOMmlUZI8WJiL26d1CH6hO%252F%252FWkDpQFreTXdVSQIMJhKZsrBs",
    floorPrice: 15.5,
    aiSummary:
      "Rare Moonbird with cosmic wings and legendary traits. Strong holder community and staking rewards.",
    aiConfidence: 89,
    rarity: "Epic",
    traits: ["Cosmic Wings", "Legendary Eyes", "Rare Beak"],
    chain: "Ethereum",
    tokenId: "789",
    priceHistory: [14.2, 14.8, 15.5, 15.2, 15.5],
  },
  {
    id: "5",
    title: "CloneX #234",
    collection: "CloneX",
    image:
      "https://img-cdn.magiceden.dev/rs:fill:400:0:0/plain/https%3A%2F%2Fimg.reservoir.tools%2Fimages%2Fv2%2Fmainnet%2Fkhnv7QtJSsXhx7z5lxeoZwJAvo1Mq1y5%252B98smHuLyEQzZqFs4wUA5Nb4A0xJGqAaT96%252BId9tchrO080bCKr9KaODVvzjQNk7Jd0zEKr6BvOnmt484N%252BNeS%252Fwv60nQLXVBptDRFkMvXoBW23p5IdbXsT7H5CcEqdUQ%252FapuImnaNNHZPxddnJB6f5zO0G6lFGh",
    floorPrice: 6.8,
    aiSummary:
      "Unique CloneX with rare skin tone and accessories. Popular in the RTFKT ecosystem.",
    aiConfidence: 84,
    rarity: "Rare",
    traits: ["Rare Skin", "Unique Accessories", "Special Background"],
    chain: "Ethereum",
    tokenId: "234",
    priceHistory: [6.2, 6.5, 6.8, 6.6, 6.8],
  },
  {
    id: "6",
    title: "CryptoPunk #567",
    collection: "CryptoPunks",
    image:
      "https://img-cdn.magiceden.dev/rs:fill:400:0:0/plain/https%3A%2F%2Fimg.reservoir.tools%2Fimages%2Fv2%2Fmainnet%2Fkhnv7QtJSsXhx7z5lxeoZ%252FNcJsNimuresqAxpAzh3%252FiyNo41LR6e1kyJP0sKQQ7biGhv60VM5rZ6%252BxlAeX7sJowFEecLHoRuMW9MI%252FVRO52g2mS4ObL%252FkJ6IXSQ%252BA9bD7HfsSXBWAliwxq8bOSA4fEmqvMy0v%252Fhrpiva7xx1jeTb384bqQ3c0IvTx3v%252Bex74",
    floorPrice: 45.8,
    aiSummary:
      "Rare CryptoPunk with unique attributes. One of the most valuable and iconic NFT collections in the market.",
    aiConfidence: 98,
    rarity: "Legendary",
    traits: ["Rare Attributes", "Iconic Status", "High Value"],
    chain: "Ethereum",
    tokenId: "567",
    priceHistory: [42.1, 44.3, 45.8, 45.2, 45.8],
  },
  {
    id: "7",
    title: "Pudgy Penguin #890",
    collection: "Pudgy Penguins",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    floorPrice: 4.2,
    aiSummary:
      "Cute Pudgy Penguin with rare hat and background. Growing community and marketplace activity.",
    aiConfidence: 91,
    rarity: "Epic",
    traits: ["Rare Hat", "Special Background", "Unique Expression"],
    chain: "Ethereum",
    tokenId: "890",
    priceHistory: [3.8, 4.0, 4.2, 4.1, 4.2],
  },
];

// Mock playlists - commented out to start with empty state
// const mockPlaylists: Playlist[] = [
//   {
//     id: "1",
//     title: "Blue Chip Collections",
//     description: "Top-tier NFT collections with proven track record",
//     nfts: [mockNFTs[0]],
//     aiSummary:
//       "Premium blue chip NFTs including Bored Apes, CryptoPunks, and other high-value collections with strong market performance.",
//     totalValue: 25.5,
//     isPublic: true,
//     coverImages: [
//       "https://images.unsplash.com/photo-1634193295627-1cdddf751ebf?w=100&h=100&fit=crop",
//     ],
//     createdAt: new Date(),
//   },
//   {
//     id: "2",
//     title: "Trending Collections",
//     description: "Hot collections gaining momentum in the market",
//     nfts: [mockNFTs[1]],
//     aiSummary:
//       "Emerging NFT collections with growing community support and increasing trading volume across major marketplaces.",
//     totalValue: 8.2,
//     isPublic: true,
//     coverImages: [
//       "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop",
//     ],
//     createdAt: new Date(),
//   },
//   {
//     id: "3",
//     title: "Artistic Masterpieces",
//     description: "Premium digital art and creative expressions",
//     nfts: [mockNFTs[2]],
//     aiSummary:
//       "High-value artistic NFTs from renowned collections with strong market demand and collector appeal.",
//     totalValue: 12.8,
//     isPublic: true,
//     coverImages: [
//       "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=100&h=100&fit=crop",
//     ],
//     createdAt: new Date(),
//   },
//   {
//     id: "4",
//     title: "Gaming & Metaverse",
//     description: "Gaming NFTs and metaverse collectibles",
//     nfts: [mockNFTs[3]],
//     aiSummary:
//       "Popular gaming NFTs and metaverse assets with active trading communities and utility features.",
//     totalValue: 15.5,
//     isPublic: true,
//     coverImages: [
//       "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100&h=100&fit=crop",
//     ],
//     createdAt: new Date(),
//   },
// ];

const featuredCollections: NFTCollection[] = [
  {
    id: "1",
    name: "Bored Ape Yacht Club",
    description:
      "The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs",
    image:
      "https://img-cdn.magiceden.dev/rs:fill:400:0:0/plain/https%3A%2F%2Fimg.reservoir.tools%2Fimages%2Fv2%2Fmainnet%2Fz9JRSpLYGu7%252BCZoKWtAuAA79K674Y2b4%252F48FTC1v%252BJ4rEwpjEK3D0qjUdzqyInvnSJFH5IaIgEk7pF0NEn6WqgSgbCdGL27rkoWAYjQhV2aH%252F8nBd9uVO2ymg2znWvbXJa379tKUzlm4lW4%252BFvX3Lkybz6boYKjCsVC4GCdwAv31e%252BCSMdhCyyVeL2Un9dcLa9vHbxG7s6856aXg5DQonA%253D%253D",
    floorPrice: 15.2,
    volume24h: 245.8,
    items: 10000,
    owners: 6200,
    chain: "Ethereum",
    verified: true,
    trending: true,
  },
  {
    id: "2",
    name: "CryptoPunks",
    description:
      "CryptoPunks launched as a fixed set of 10,000 items in mid-2017",
    image:
      "https://img-cdn.magiceden.dev/rs:fill:400:0:0/plain/https%3A%2F%2Fimg.reservoir.tools%2Fimages%2Fv2%2Fmainnet%2Fkhnv7QtJSsXhx7z5lxeoZ%252FNcJsNimuresqAxpAzh3%252FiyNo41LR6e1kyJP0sKQQ7biGhv60VM5rZ6%252BxlAeX7sJowFEecLHoRuMW9MI%252FVRO52g2mS4ObL%252FkJ6IXSQ%252BA9bD7HfsSXBWAliwxq8bOSA4fEmqvMy0v%252Fhrpiva7xx1jeTb384bqQ3c0IvTx3v%252Bex74",
    floorPrice: 45.8,
    volume24h: 189.3,
    items: 10000,
    owners: 3300,
    chain: "Ethereum",
    verified: true,
    trending: false,
  },
  {
    id: "3",
    name: "Azuki",
    description: "A brand for the metaverse. Built by the community.",
    image:
      "https://img-cdn.magiceden.dev/rs:fill:400:0:0/plain/https%3A%2F%2Fimg.reservoir.tools%2Fimages%2Fv2%2Fmainnet%2Fz9JRSpLYGu7%252BCZoKWtAuAGpnDPPI%252BsrhYBKQuBYc6XZMHTg6SSHih%252BOpmF%252FwAS4qY4NdVw4CAhgA1Wbpkx5GEXUwbgPcTN51MGZZWQi4%252FXlqxGoEDq%252FdAAlbOf2MwsZeMqMtUcF4j9cSCSDQMIVxbE%252FH2GQQzLcaEiWTS7%252Br1jEJDCE%252BYyhgHNXRacqbg83%252BHjskso2DDPLf34X1aTpELQ%253D%253D",
    floorPrice: 8.9,
    volume24h: 156.7,
    items: 10000,
    owners: 4800,
    chain: "Ethereum",
    verified: true,
    trending: true,
  },
  {
    id: "4",
    name: "Doodles",
    description:
      "A community-driven collectibles project featuring art by Burnt Toast",
    image:
      "https://img-cdn.magiceden.dev/autoquality:size:512000:20:80/rs:fill:250:0:0/plain/https%3A%2F%2Fimg.reservoir.tools%2Fimages%2Fv2%2Fmainnet%2Fz9JRSpLYGu7%252BCZoKWtAuAI8ipNM7MJ1GQZfU57rB7lIEyx%252FONfn5NjLUzG%252FzZsB4eeY3HDjf3tMPF6UwbHrdukfTbcGKOzKTrWrt4QMhDO5B9pTVyjYe3edM2bvcv6TJ",
    floorPrice: 3.2,
    volume24h: 89.4,
    items: 10000,
    owners: 5200,
    chain: "Ethereum",
    verified: true,
    trending: false,
  },
  {
    id: "5",
    name: "Moonbirds",
    description:
      "A collection of 10,000 utility-enabled PFPs that feature a richly diverse",
    image:
      "https://img-cdn.magiceden.dev/autoquality:size:512000:20:80/rs:fill:250:0:0/plain/https%3A%2F%2Fimg.reservoir.tools%2Fimages%2Fv2%2Fmainnet%2Fkhnv7QtJSsXhx7z5lxeoZ3cpmRNaSSEs5u2gRvbSuWIASnl9h4yweGkwQ6g18ZnvFfDTz2B9OeyWYgo2kX6Wxr2X6ntahPsPcZjMyBOm3v20QhGyAvk8CNhRviAZuQ3rAMjkV2uSWO%252BeaIA1AOMmlUZI8WJiL26d1CH6hO%252F%252FWkDpQFreTXdVSQIMJhKZsrBs",
    floorPrice: 12.5,
    volume24h: 203.1,
    items: 10000,
    owners: 4100,
    chain: "Ethereum",
    verified: true,
    trending: true,
  },
  {
    id: "6",
    name: "CloneX",
    description: "20,000 next-gen Avatars, by RTFKT and Takashi Murakami",
    image:
      "https://img-cdn.magiceden.dev/rs:fill:400:0:0/plain/https%3A%2F%2Fimg.reservoir.tools%2Fimages%2Fv2%2Fmainnet%2Fkhnv7QtJSsXhx7z5lxeoZwJAvo1Mq1y5%252B98smHuLyEQzZqFs4wUA5Nb4A0xJGqAaT96%252BId9tchrO080bCKr9KaODVvzjQNk7Jd0zEKr6BvOnmt484N%252BNeS%252Fwv60nQLXVBptDRFkMvXoBW23p5IdbXsT7H5CcEqdUQ%252FapuImnaNNHZPxddnJB6f5zO0G6lFGh",
    floorPrice: 6.8,
    volume24h: 134.2,
    items: 20000,
    owners: 8900,
    chain: "Ethereum",
    verified: true,
    trending: false,
  },
];

export default function DiscoveryHub() {
  // Main state
  const [currentNFTIndex, setCurrentNFTIndex] = useState(0);
  const [nftDeck, setNftDeck] = useState<NFT[]>(mockNFTs);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [swipeHistory, setSwipeHistory] = useState<
    { nft: NFT; action: string }[]
  >([]);

  // UI state
  const [selectedChain, setSelectedChain] = useState("all");
  const [selectedRarity, setSelectedRarity] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 10]);
  const [aiRemixEnabled, setAiRemixEnabled] = useState(false);
  const [isGeneratingPlaylists, setIsGeneratingPlaylists] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [favoriteCollections, setFavoriteCollections] = useState<string[]>([]);
  const [lovingCollection, setLovingCollection] = useState<string | null>(null);

  // Modal/Drawer state
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const [showPlaylistDrawer, setShowPlaylistDrawer] = useState(false);
  const [editingPlaylist, setEditingPlaylist] = useState<Playlist | null>(null);
  const [showSaveMenu, setShowSaveMenu] = useState(false);

  // Loading states
  const [isLoadingDeck, setIsLoadingDeck] = useState(false);
  const [isLoadingPlaylists, setIsLoadingPlaylists] = useState(false);

  // Refs
  const cardRef = useRef<HTMLDivElement>(null);
  const startPosRef = useRef({ x: 0, y: 0 });

  // Current NFT
  const currentNFT = nftDeck[currentNFTIndex];

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (showDetailModal || showPlaylistDrawer) return;

      switch (e.key) {
        case "ArrowLeft":
          handleSwipe("left");
          break;
        case "ArrowRight":
          handleSwipe("right");
          break;
        case "ArrowUp":
          if (currentNFT) {
            setSelectedNFT(currentNFT);
            setShowDetailModal(true);
          }
          break;
        case "z":
        case "Z":
          handleUndo();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentNFTIndex, showDetailModal, showPlaylistDrawer, currentNFT]);

  // Swipe handling
  const handleSwipe = useCallback(
    (direction: "left" | "right" | "up" | "down") => {
      if (!currentNFT) return;

      const actions = {
        left: "dismissed",
        right: "saved",
        up: "details",
        down: "remix",
      };

      if (direction === "up") {
        setSelectedNFT(currentNFT);
        setShowDetailModal(true);
        return;
      }

      if (direction === "right") {
        setShowSaveMenu(true);
        return;
      }

      // Record action in history
      setSwipeHistory((prev) => [
        ...prev,
        { nft: currentNFT, action: actions[direction] },
      ]);

      // Move to next NFT
      setCurrentNFTIndex((prev) => {
        const next = prev + 1;
        if (next >= nftDeck.length - 2) {
          // Load more NFTs when approaching end
          loadMoreNFTs();
        }
        return next;
      });

      // Show toast
      const messages = {
        left: `Dismissed ${currentNFT.title}`,
        right: `Saved ${currentNFT.title} to Favorites`,
        down: `Added ${currentNFT.title} to Remix Queue`,
      };
      toast.success(messages[direction as keyof typeof messages]);
    },
    [currentNFT, nftDeck.length]
  );

  const handleUndo = useCallback(() => {
    if (swipeHistory.length === 0) return;

    const lastAction = swipeHistory[swipeHistory.length - 1];
    setSwipeHistory((prev) => prev.slice(0, -1));
    setCurrentNFTIndex((prev) => Math.max(0, prev - 1));

    toast.success(`Undid: ${lastAction.action} - ${lastAction.nft.title}`);
  }, [swipeHistory]);

  // Data fetching
  const loadMoreNFTs = useCallback(async () => {
    setIsLoadingDeck(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setNftDeck((prev) => [...prev, ...mockNFTs]);
    setIsLoadingDeck(false);
  }, []);

  const generatePlaylists = useCallback(async () => {
    setIsGeneratingPlaylists(true);
    try {
      // Check if we already have 5 playlists
      if (playlists.length >= 5) {
        toast.error(
          "Maximum of 5 playlists reached. Remove one to generate more."
        );
        setIsGeneratingPlaylists(false);
        return;
      }

      // Simulate AI playlist generation
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Define playlist themes with titles, descriptions, and summaries
      const playlistThemes = [
        {
          title: "Gaming Legends",
          description: "Epic gaming NFTs from top collections",
          summary:
            "Curated collection of legendary gaming NFTs including rare characters, weapons, and exclusive items from popular gaming universes.",
          category: "gaming",
        },
        {
          title: "Nature's Beauty",
          description: "Stunning nature and landscape NFTs",
          summary:
            "Breathtaking nature-inspired NFTs featuring landscapes, wildlife, and environmental art that captures the beauty of our world.",
          category: "nature",
        },
        {
          title: "Trading Champions",
          description: "High-performance trading NFTs",
          summary:
            "Premium trading-focused NFTs with strong market performance, high liquidity, and proven track records in the NFT market.",
          category: "trading",
        },
        {
          title: "Popular Hits",
          description: "Trending and viral NFT collections",
          summary:
            "Viral NFT collections that are currently trending across social media and gaining massive community attention.",
          category: "popular",
        },
        {
          title: "Art Masterpieces",
          description: "Exceptional digital art collections",
          summary:
            "Masterpiece-level digital art from renowned artists and emerging talents pushing the boundaries of creative expression.",
          category: "art",
        },
        {
          title: "Metaverse Dreams",
          description: "Virtual world and metaverse assets",
          summary:
            "Essential metaverse assets including virtual real estate, avatars, and digital items for the future of virtual living.",
          category: "metaverse",
        },
        {
          title: "Sports Legends",
          description: "Iconic sports and athlete NFTs",
          summary:
            "Legendary sports moments, athlete cards, and sports memorabilia immortalized as unique digital collectibles.",
          category: "sports",
        },
        {
          title: "Music Vibes",
          description: "Musical artist and album NFTs",
          summary:
            "Exclusive music NFTs from top artists, album covers, and musical moments that define generations.",
          category: "music",
        },
        {
          title: "Tech Innovation",
          description: "Cutting-edge technology NFTs",
          summary:
            "Innovative tech-themed NFTs representing the latest advancements in blockchain, AI, and digital technology.",
          category: "tech",
        },
        {
          title: "Cosmic Wonders",
          description: "Space and sci-fi themed NFTs",
          summary:
            "Out-of-this-world NFTs featuring space exploration, sci-fi themes, and cosmic art that takes you beyond the stars.",
          category: "cosmic",
        },
      ];

      // Randomly select a theme (avoiding duplicates)
      const usedThemes = playlists.map((p) => p.title);
      const availableThemes = playlistThemes.filter(
        (theme) => !usedThemes.includes(theme.title)
      );

      // If all themes are used, allow repeats but shuffle
      const themePool =
        availableThemes.length > 0 ? availableThemes : playlistThemes;
      const selectedTheme =
        themePool[Math.floor(Math.random() * themePool.length)];

      const newPlaylist: Playlist = {
        id: Date.now().toString(),
        title: selectedTheme.title,
        description: selectedTheme.description,
        nfts: mockNFTs.slice(playlists.length * 2, (playlists.length + 1) * 2),
        aiSummary: selectedTheme.summary,
        totalValue: 4.3 + playlists.length * 0.5,
        isPublic: Math.random() > 0.5, // Randomly make some public
        coverImages: mockNFTs
          .slice(playlists.length * 2, (playlists.length + 1) * 2)
          .map((nft) => nft.image),
        createdAt: new Date(),
      };

      // Add new playlist at the bottom and limit to 5 total
      setPlaylists((prev) => {
        const updatedPlaylists = [...prev, newPlaylist];
        const finalPlaylists = updatedPlaylists.slice(-5); // Keep only the last 5
        console.log(
          "Generated new playlist:",
          newPlaylist.title,
          "Total playlists:",
          finalPlaylists.length
        );
        return finalPlaylists;
      });

      toast.success(
        `🎵 Generated "${newPlaylist.title}" - ${selectedTheme.description}!`
      );
    } catch (error) {
      toast.error("Failed to generate playlist. Try again.");
    }
    setIsGeneratingPlaylists(false);
  }, [playlists.length]);

  // Playlist actions
  const playPlaylist = useCallback((playlist: Playlist) => {
    setNftDeck(playlist.nfts);
    setCurrentNFTIndex(0);
    toast.success(
      `🎵 Now playing: ${playlist.title} (${playlist.nfts.length} NFTs)`
    );
  }, []);

  const deletePlaylist = useCallback(
    (playlistId: string) => {
      const playlist = playlists.find((p) => p.id === playlistId);
      setPlaylists((prev) =>
        prev.filter((playlist) => playlist.id !== playlistId)
      );
      toast.error(
        `🗑️ Playlist "${playlist?.title || "Unknown"}" deleted successfully!`
      );
    },
    [playlists]
  );

  // Love collection functionality
  const handleLoveCollection = useCallback(
    async (collectionId: string, collectionName: string) => {
      setLovingCollection(collectionId);

      // Simulate animation delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      setFavoriteCollections((prev) => {
        const isAlreadyLoved = prev.includes(collectionId);
        if (isAlreadyLoved) {
          toast.info(`💔 Removed ${collectionName} from favorites`);
          return prev.filter((id) => id !== collectionId);
        } else {
          toast.success(`❤️ Added ${collectionName} to favorites!`);
          return [...prev, collectionId];
        }
      });

      setLovingCollection(null);
    },
    []
  );

  const saveToPlaylist = useCallback(
    (playlistId?: string) => {
      if (!currentNFT) return;

      if (playlistId) {
        setPlaylists((prev) =>
          prev.map((playlist) =>
            playlist.id === playlistId
              ? { ...playlist, nfts: [...playlist.nfts, currentNFT] }
              : playlist
          )
        );
        const playlist = playlists.find((p) => p.id === playlistId);
        toast.success(
          `Added ${currentNFT.title} to playlist "${playlist?.title}"`
        );
      } else {
        // Save to favorites (create new playlist)
        const newPlaylist: Playlist = {
          id: Date.now().toString(),
          title: "Favorites",
          description: "Your saved NFTs",
          nfts: [currentNFT],
          aiSummary: "Your personal collection of saved NFTs.",
          totalValue: currentNFT.floorPrice,
          isPublic: false,
          coverImages: [currentNFT.image],
          createdAt: new Date(),
        };
        setPlaylists((prev) => {
          const updatedPlaylists = [...prev, newPlaylist];
          return updatedPlaylists.slice(-5); // Keep only the last 5
        });
        toast.success(`Added ${currentNFT.title} to Favorites playlist`);
      }

      setShowSaveMenu(false);
      handleSwipe("right");
    },
    [currentNFT, playlists]
  );

  // Drag handlers
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true);
    startPosRef.current = { x: e.clientX, y: e.clientY };
    setDragOffset({ x: 0, y: 0 });
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;

      const deltaX = e.clientX - startPosRef.current.x;
      const deltaY = e.clientY - startPosRef.current.y;
      setDragOffset({ x: deltaX, y: deltaY });
    },
    [isDragging]
  );

  const handlePointerUp = useCallback(() => {
    if (!isDragging) return;

    const { x, y } = dragOffset;
    const threshold = 100;

    if (Math.abs(x) > threshold) {
      handleSwipe(x > 0 ? "right" : "left");
    } else if (Math.abs(y) > threshold) {
      handleSwipe(y > 0 ? "down" : "up");
    }

    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
  }, [isDragging, dragOffset, handleSwipe]);

  return (
    <div className="min-h-screen bg-black blur-gradient">
      {/* Top Toolbar */}
      <div className="border-b border-border/20 p-6 bg-black/50 backdrop-blur">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Select value={selectedChain} onValueChange={setSelectedChain}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Chain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Chains</SelectItem>
                <SelectItem value="ethereum">Ethereum</SelectItem>
                <SelectItem value="polygon">Polygon</SelectItem>
                <SelectItem value="solana">Solana</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedRarity} onValueChange={setSelectedRarity}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Rarity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Rarity</SelectItem>
                <SelectItem value="common">Common</SelectItem>
                <SelectItem value="rare">Rare</SelectItem>
                <SelectItem value="epic">Epic</SelectItem>
                <SelectItem value="legendary">Legendary</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Price:</span>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={20}
                step={0.1}
                className="w-32"
              />
              <span className="text-sm text-muted-foreground">
                {priceRange[0]}Ξ - {priceRange[1]}Ξ
              </span>
            </div>

            <Toggle
              pressed={aiRemixEnabled}
              onPressedChange={setAiRemixEnabled}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              AI Remix
            </Toggle>
          </div>

          <Button
            onClick={generatePlaylists}
            disabled={isGeneratingPlaylists}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:from-orange-600 hover:to-red-600 h-10 px-6 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50"
          >
            {isGeneratingPlaylists ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Playlists
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 relative z-10">
        {/* Decorative Side Elements */}

        {/* Matrix Star 3 */}
        <div className="absolute left-1/4 top-160 opacity-65 pointer-events-none z-0">
          <div className="relative w-6 h-6">
            <div className="absolute inset-0 bg-gradient-to-b from-orange-500/20 to-transparent rounded-full matrix-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/15 to-transparent rounded-full animate-ping"></div>
            <div className="absolute inset-0 rounded-full overflow-hidden border border-orange-400/30">
              <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-orange-400/60 to-transparent matrix-rain"></div>
            </div>
          </div>
        </div>

        {/* Matrix Star 4 */}
        <div className="absolute right-1/8 top-240 opacity-75 pointer-events-none z-0">
          <div className="relative w-11 h-11">
            <div className="absolute inset-0 bg-gradient-to-b from-orange-500/20 to-transparent rounded-full matrix-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/15 to-transparent rounded-full animate-ping"></div>
            <div className="absolute inset-0 rounded-full overflow-hidden border border-orange-400/30">
              <div className="absolute top-0 left-1/6 w-px h-full bg-gradient-to-b from-orange-400/60 to-transparent matrix-rain"></div>
              <div
                className="absolute top-0 left-2/6 w-px h-full bg-gradient-to-b from-orange-300/50 to-transparent matrix-rain"
                style={{ animationDelay: "0.3s" }}
              ></div>
              <div
                className="absolute top-0 left-3/6 w-px h-full bg-gradient-to-b from-orange-500/40 to-transparent matrix-rain"
                style={{ animationDelay: "0.7s" }}
              ></div>
              <div
                className="absolute top-0 left-4/6 w-px h-full bg-gradient-to-b from-orange-400/50 to-transparent matrix-rain"
                style={{ animationDelay: "1.3s" }}
              ></div>
              <div
                className="absolute top-0 left-5/6 w-px h-full bg-gradient-to-b from-orange-300/45 to-transparent matrix-rain"
                style={{ animationDelay: "1.6s" }}
              ></div>
            </div>
          </div>
        </div>
        {/* Matrix Star 6 */}
        <div className="absolute right-1/5 top-[800px] opacity-60 pointer-events-none z-0">
          <div className="relative w-7 h-7">
            <div className="absolute inset-0 bg-gradient-to-b from-orange-500/20 to-transparent rounded-full matrix-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/15 to-transparent rounded-full animate-ping"></div>
            <div className="absolute inset-0 rounded-full overflow-hidden border border-orange-400/30">
              <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-orange-400/60 to-transparent matrix-rain"></div>
              <div
                className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-orange-300/50 to-transparent matrix-rain"
                style={{ animationDelay: "0.6s" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Matrix Star 7 */}
        <div className="absolute left-1/12 top-[1000px] opacity-45 pointer-events-none z-0">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 bg-gradient-to-b from-orange-500/20 to-transparent rounded-full matrix-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/15 to-transparent rounded-full animate-ping"></div>
            <div className="absolute inset-0 rounded-full overflow-hidden border border-orange-400/30">
              <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-orange-400/60 to-transparent matrix-rain"></div>
              <div
                className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-orange-300/50 to-transparent matrix-rain"
                style={{ animationDelay: "0.8s" }}
              ></div>
              <div
                className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-orange-500/40 to-transparent matrix-rain"
                style={{ animationDelay: "1.2s" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Additional Crazy Elements */}
        <div className="absolute -left-16 bottom-1/4 opacity-50 pointer-events-none z-0">
          <div className="w-20 h-20 border border-primary/40 rounded-full relative animate-spin">
            <div className="absolute inset-2 border border-primary/30 rounded-full animate-ping"></div>
          </div>
        </div>

        <div className="absolute -left-12 bottom-1/4 opacity-50 pointer-events-none z-0">
          <div className="w-20 h-20 border border-primary/40 rounded-full relative animate-spin">
            <div className="absolute inset-2 border border-primary/30 rounded-full animate-ping"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Swipe Deck */}
          <div className="lg:col-span-1 space-y-8 blur-fade-in">
            <div className="text-center">
              <h2 className="text-4xl font-heading font-bold mb-4 text-white">
                Discover NFTs
              </h2>
              <p className="text-gray-400 text-lg">
                Swipe to explore AI-curated recommendations
              </p>
            </div>

            {/* Card Stack */}
            <div className="relative h-[600px] flex items-center justify-center">
              <AnimatePresence mode="popLayout">
                {currentNFT && (
                  <motion.div
                    key={currentNFT.id}
                    ref={cardRef}
                    className="absolute w-80 h-[500px] blur-card rounded-2xl cursor-grab active:cursor-grabbing blur-scale-in"
                    style={{
                      transform: `translate(${dragOffset.x}px, ${
                        dragOffset.y
                      }px) rotate(${dragOffset.x * 0.1}deg)`,
                    }}
                    initial={{ scale: 0.8, opacity: 0, y: 50 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{
                      scale: 0.8,
                      opacity: 0,
                      x: dragOffset.x > 0 ? 300 : dragOffset.x < 0 ? -300 : 0,
                      y: dragOffset.y > 0 ? 300 : dragOffset.y < 0 ? -300 : 0,
                    }}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerLeave={handlePointerUp}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                  >
                    <div className="relative h-full flex flex-col">
                      {/* NFT Image */}
                      <div className="relative h-64 rounded-t-2xl overflow-hidden bg-muted">
                        <img
                          src={currentNFT.image}
                          alt={currentNFT.title}
                          className="w-full h-full object-cover object-center"
                          loading="lazy"
                        />
                        <div className="absolute top-4 right-4">
                          <Badge
                            variant="secondary"
                            className="bg-background/80 text-xs"
                          >
                            AI: {currentNFT.aiConfidence}%
                          </Badge>
                        </div>
                        <div className="absolute bottom-4 left-4">
                          <Badge
                            variant="outline"
                            className={`
                            ${
                              currentNFT.rarity === "Legendary"
                                ? "border-accent text-accent"
                                : ""
                            }
                            ${
                              currentNFT.rarity === "Epic"
                                ? "border-primary text-primary"
                                : ""
                            }
                            ${
                              currentNFT.rarity === "Rare"
                                ? "border-blue-400 text-blue-400"
                                : ""
                            }
                          `}
                          >
                            {currentNFT.rarity}
                          </Badge>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="flex-1 p-6 space-y-4">
                        <div>
                          <h3 className="text-xl font-heading font-bold">
                            {currentNFT.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {currentNFT.collection}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Floor Price
                            </p>
                            <p className="text-lg font-bold">
                              {currentNFT.floorPrice} ETH
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">
                              Chain
                            </p>
                            <p className="text-sm font-medium">
                              {currentNFT.chain}
                            </p>
                          </div>
                        </div>

                        <p className="text-sm leading-relaxed">
                          {currentNFT.aiSummary}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {currentNFT.traits.slice(0, 3).map((trait) => (
                            <Badge
                              key={trait}
                              variant="secondary"
                              className="text-xs"
                            >
                              {trait}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Stack Preview */}
              {nftDeck
                .slice(currentNFTIndex + 1, currentNFTIndex + 4)
                .map((nft, index) => (
                  <div
                    key={nft.id}
                    className="absolute w-80 h-[500px] bg-muted rounded-2xl border border-border"
                    style={{
                      zIndex: -(index + 1),
                      transform: `scale(${0.95 - index * 0.05}) translateY(${
                        (index + 1) * 8
                      }px)`,
                      opacity: 0.5 - index * 0.15,
                    }}
                  />
                ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full w-16 h-16 p-0"
                onClick={() => {
                  handleSwipe("left");
                  if (currentNFT) {
                    toast.error(`👎 Dismissed ${currentNFT.title}`);
                  }
                }}
              >
                <X className="h-6 w-6" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full w-16 h-16 p-0"
                onClick={() => {
                  handleUndo();
                  if (swipeHistory.length > 0) {
                    const lastAction = swipeHistory[swipeHistory.length - 1];
                    toast.info(`↩️ Undid last action: ${lastAction.action}`);
                  }
                }}
                disabled={swipeHistory.length === 0}
              >
                <RotateCcw className="h-6 w-6" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full w-16 h-16 p-0"
                onClick={() => {
                  if (currentNFT) {
                    setSelectedNFT(currentNFT);
                    setShowDetailModal(true);
                    toast.info(`ℹ️ Viewing details for ${currentNFT.title}`);
                  }
                }}
              >
                <Info className="h-6 w-6" />
              </Button>
              <Button
                size="lg"
                className="rounded-full w-16 h-16 p-0 bg-primary text-primary-foreground"
                onClick={() => {
                  handleSwipe("right");
                  if (currentNFT) {
                    toast.success(`❤️ Loved ${currentNFT.title}!`);
                  }
                }}
              >
                <Heart className="h-6 w-6" />
              </Button>
            </div>
          </div>

          {/* Right Column - Playlist Grid */}
          <div className="lg:col-span-2 space-y-8 blur-fade-in">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-4xl font-heading font-bold mb-2 text-white">
                  AI Trading Playlists
                </h2>
                <p className="text-gray-400 text-lg">
                  Featured Marketplace Collections
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm text-gray-400">
                    {playlists.length}/5 Playlists
                  </div>
                  {playlists.length >= 5 && (
                    <div className="text-xs text-primary bg-primary/10 px-2 py-1 rounded mt-1">
                      Max limit reached
                    </div>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary text-primary hover:bg-primary/10 hover:scale-105 transition-all duration-200"
                  onClick={() => {
                    // Create a simple new playlist
                    const newPlaylist = {
                      id: Date.now().toString(),
                      title: `My Playlist ${Math.floor(Math.random() * 1000)}`,
                      description: "A new playlist for your favorite NFTs",
                      nfts: [],
                      aiSummary: "Your personal collection of curated NFTs.",
                      totalValue: 0,
                      isPublic: false,
                      coverImages: [],
                      createdAt: new Date(),
                    };

                    // Add to playlists
                    setPlaylists((prev) => {
                      const updatedPlaylists = [...prev, newPlaylist];
                      return updatedPlaylists.slice(-5); // Keep only the last 5
                    });

                    // Show success notification
                    toast.success(
                      `🎵 Created new playlist: "${newPlaylist.title}"`
                    );
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Playlist
                </Button>
              </div>
            </div>

            {/* Playlist Content */}
            {playlists.length === 0 ? (
              <Card className="p-12 text-center blur-card border border-orange-500/20">
                <div className="space-y-8">
                  <div className="relative">
                    <Grid3x2 className="h-20 w-20 mx-auto text-primary" />
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-transparent rounded-full blur-xl"></div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-heading font-bold text-white mb-3">
                      No Playlists Yet
                    </h3>
                    <p className="text-gray-400 text-lg max-w-md mx-auto leading-relaxed">
                      Generate AI playlists to discover curated NFT collections
                      from top marketplaces tailored to your trading preferences
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      if (!isGeneratingPlaylists && playlists.length < 5) {
                        toast.info("🤖 Generating AI trading playlists...");
                        generatePlaylists();
                      }
                    }}
                    disabled={isGeneratingPlaylists || playlists.length >= 5}
                    size="lg"
                    className={`font-semibold hover:scale-105 transition-transform ${
                      playlists.length >= 5
                        ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                        : "blur-orange-gradient text-black"
                    }`}
                  >
                    <Sparkles className="h-5 w-5 mr-2" />
                    {playlists.length >= 5
                      ? "Max Playlists Reached"
                      : "Generate Trading Playlists"}
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {playlists.map((playlist) => (
                  <Card
                    key={playlist.id}
                    className="group bg-zinc-900/80 hover:bg-zinc-800/80 transition-all duration-300 hover:-translate-y-2 border border-zinc-800 hover:border-zinc-700 overflow-hidden cursor-pointer hover:shadow-[0_0_30px_rgba(255,107,53,0.3)] hover:shadow-orange-500/20 hover:scale-[1.02]"
                  >
                    <CardContent className="p-4">
                      {/* Cover Image */}
                      <div className="relative mb-4">
                        <div className="w-full aspect-square rounded-lg overflow-hidden bg-zinc-800 shadow-lg group-hover:shadow-orange-500/20 transition-all duration-300 group-hover:scale-105">
                          <img
                            src={
                              playlist.coverImages[0] ||
                              "https://images.unsplash.com/photo-1653622139972-e7f937344c19?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            }
                            alt={playlist.title}
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              playPlaylist(playlist);
                            }}
                            className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-orange-500/30 hover:scale-110 transition-all duration-200 animate-pulse"
                          >
                            <Play className="h-5 w-5 ml-0.5" />
                          </Button>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-2">
                        <h3 className="font-bold text-white text-base leading-tight truncate group-hover:text-green-400 transition-colors group-hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.3)]">
                          {playlist.title}
                        </h3>
                        <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed">
                          {playlist.aiSummary}
                        </p>

                        <div className="flex items-center justify-between text-xs text-zinc-500">
                          <span>{playlist.nfts.length} NFTs</span>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white">
                              {playlist.totalValue.toFixed(1)} ETH
                            </span>
                            {playlist.isPublic && (
                              <Badge
                                variant="outline"
                                className="text-xs border-green-500/30 text-green-400"
                              >
                                Public
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Category Badge */}
                        <div className="flex items-center gap-1">
                          <Badge
                            variant="secondary"
                            className={`text-xs ${
                              playlist.title.includes("Gaming")
                                ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                                : playlist.title.includes("Nature")
                                ? "bg-green-500/20 text-green-300 border-green-500/30"
                                : playlist.title.includes("Trading")
                                ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                                : playlist.title.includes("Popular")
                                ? "bg-pink-500/20 text-pink-300 border-pink-500/30"
                                : playlist.title.includes("Art")
                                ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                                : playlist.title.includes("Metaverse")
                                ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/30"
                                : playlist.title.includes("Sports")
                                ? "bg-red-500/20 text-red-300 border-red-500/30"
                                : playlist.title.includes("Music")
                                ? "bg-orange-500/20 text-orange-300 border-orange-500/30"
                                : playlist.title.includes("Tech")
                                ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
                                : playlist.title.includes("Cosmic")
                                ? "bg-violet-500/20 text-violet-300 border-violet-500/30"
                                : "bg-zinc-500/20 text-zinc-300 border-zinc-500/30"
                            }`}
                          >
                            {playlist.title.includes("Gaming")
                              ? "🎮 Gaming"
                              : playlist.title.includes("Nature")
                              ? "🌿 Nature"
                              : playlist.title.includes("Trading")
                              ? "📈 Trading"
                              : playlist.title.includes("Popular")
                              ? "🔥 Popular"
                              : playlist.title.includes("Art")
                              ? "🎨 Art"
                              : playlist.title.includes("Metaverse")
                              ? "🌐 Metaverse"
                              : playlist.title.includes("Sports")
                              ? "⚽ Sports"
                              : playlist.title.includes("Music")
                              ? "🎵 Music"
                              : playlist.title.includes("Tech")
                              ? "💻 Tech"
                              : playlist.title.includes("Cosmic")
                              ? "🚀 Cosmic"
                              : "🎯 Mixed"}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-1 pt-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="flex-1 h-8 text-xs text-zinc-400 hover:text-white hover:bg-zinc-800 hover:shadow-orange-500/20"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingPlaylist(playlist);
                              setShowPlaylistDrawer(true);
                            }}
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-zinc-400 hover:text-white hover:bg-zinc-800 hover:shadow-orange-500/20"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Share functionality
                            }}
                          >
                            <Share className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-zinc-400 hover:text-white hover:bg-zinc-800 hover:shadow-orange-500/20"
                            onClick={(e) => {
                              e.stopPropagation();
                              deletePlaylist(playlist.id);
                            }}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Featured Collections Carousel Section */}
      <div className="max-w-6xl mx-auto p-6 mt-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold mb-4 text-white">
            Featured Collections
          </h2>
          <p className="text-gray-400 text-lg">
            Discover the most popular NFT collections from OpenSea
          </p>
        </div>

        <div className="relative overflow-hidden">
          {/* Carousel Container with Animation */}
          <div
            className="flex gap-4 pb-4 animate-scroll"
            style={{
              animation: "scroll 45s linear infinite",
              width: `${featuredCollections.length * 2 * 320}px`,
              transform: "translateX(0)",
            }}
          >
            {/* Duplicate items for seamless loop */}
            {[...featuredCollections, ...featuredCollections].map(
              (collection, index) => (
                <Card
                  key={`${collection.id}-${index}`}
                  className="group blur-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 blur-fade-in flex-shrink-0"
                  style={{ minWidth: "280px", maxWidth: "280px" }}
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <div className="aspect-square overflow-hidden rounded-t-lg bg-muted">
                        <img
                          src={collection.image}
                          alt={collection.name}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                      <div className="absolute top-3 right-3 flex gap-1">
                        {collection.verified && (
                          <Badge
                            variant="secondary"
                            className="bg-background/80 text-xs px-2 py-1"
                          >
                            ✓ Verified
                          </Badge>
                        )}
                        {collection.trending && (
                          <Badge
                            variant="destructive"
                            className="text-xs px-2 py-1"
                          >
                            🔥 Trending
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="text-lg font-heading font-bold mb-1 flex items-center gap-2 text-white">
                          {collection.name}
                          {collection.verified && (
                            <span className="text-primary">✓</span>
                          )}
                        </h3>
                        <p className="text-xs text-gray-400 line-clamp-2">
                          {collection.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <p className="text-gray-400">Floor Price</p>
                          <p className="font-bold text-sm text-primary">
                            {collection.floorPrice} ETH
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400">24h Volume</p>
                          <p className="font-semibold text-sm text-white">
                            {collection.volume24h} ETH
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{collection.items.toLocaleString()} items</span>
                        <span>{collection.owners.toLocaleString()} owners</span>
                        <span>{collection.chain}</span>
                      </div>

                      <div className="flex gap-2">
                        <Button className="flex-1 blur-orange-gradient text-black font-semibold hover:scale-105 transition-transform text-xs py-2">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          View Collection
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className={`px-2 transition-all duration-300 ${
                            favoriteCollections.includes(collection.id)
                              ? "border-red-500 text-red-500 bg-red-500/10 hover:bg-red-500/20"
                              : "border-primary text-primary hover:bg-primary/10"
                          } ${
                            lovingCollection === collection.id
                              ? "scale-110 animate-pulse"
                              : "hover:scale-105"
                          }`}
                          onClick={() =>
                            handleLoveCollection(collection.id, collection.name)
                          }
                          disabled={lovingCollection === collection.id}
                        >
                          <Heart
                            className={`h-3 w-3 transition-all duration-300 ${
                              favoriteCollections.includes(collection.id)
                                ? "fill-current"
                                : ""
                            } ${
                              lovingCollection === collection.id
                                ? "animate-bounce"
                                : ""
                            }`}
                          />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            )}
          </div>

          {/* Carousel Status Indicator */}
          <div className="flex justify-center mt-6">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <span>Auto-scrolling collections</span>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Button
            variant="outline"
            className="px-8 py-3 text-base border-primary text-primary hover:bg-primary/10 hover:scale-105 transition-all duration-300"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Explore More Collections
          </Button>
        </div>
      </div>

      {/* Favorites Section */}
      {favoriteCollections.length > 0 && (
        <div className="max-w-6xl mx-auto p-6 mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4 text-white">
              ❤️ Your Favorites
            </h2>
            <p className="text-gray-400 text-lg">
              Collections you've loved and saved
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCollections
              .filter((collection) =>
                favoriteCollections.includes(collection.id)
              )
              .map((collection) => (
                <Card
                  key={collection.id}
                  className="group blur-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 blur-fade-in"
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <div className="aspect-square overflow-hidden rounded-t-lg bg-muted">
                        <img
                          src={collection.image}
                          alt={collection.name}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                      <div className="absolute top-3 right-3 flex gap-1">
                        {collection.verified && (
                          <Badge
                            variant="secondary"
                            className="bg-background/80 text-xs px-2 py-1"
                          >
                            ✓ Verified
                          </Badge>
                        )}
                        <Badge
                          variant="destructive"
                          className="text-xs px-2 py-1"
                        >
                          ❤️ Loved
                        </Badge>
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="text-lg font-heading font-bold mb-1 flex items-center gap-2 text-white">
                          {collection.name}
                          {collection.verified && (
                            <span className="text-primary">✓</span>
                          )}
                        </h3>
                        <p className="text-xs text-gray-400 line-clamp-2">
                          {collection.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <p className="text-gray-400">Floor Price</p>
                          <p className="font-bold text-sm text-primary">
                            {collection.floorPrice} ETH
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400">24h Volume</p>
                          <p className="font-semibold text-sm text-white">
                            {collection.volume24h} ETH
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{collection.items.toLocaleString()} items</span>
                        <span>{collection.owners.toLocaleString()} owners</span>
                        <span>{collection.chain}</span>
                      </div>

                      <div className="flex gap-2">
                        <Button className="flex-1 blur-orange-gradient text-black font-semibold hover:scale-105 transition-transform text-xs py-2">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          View Collection
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-500 text-red-500 bg-red-500/10 hover:bg-red-500/20 px-2 hover:scale-105 transition-all duration-300"
                          onClick={() =>
                            handleLoveCollection(collection.id, collection.name)
                          }
                        >
                          <Heart className="h-3 w-3 fill-current" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      )}

      {/* Save Menu */}
      <AnimatePresence>
        {showSaveMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center"
            onClick={() => setShowSaveMenu(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card border border-border rounded-xl p-6 shadow-xl max-w-sm w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-heading font-semibold mb-4">
                Save NFT
              </h3>
              <div className="space-y-3">
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() => saveToPlaylist()}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Save to Favorites
                </Button>
                {playlists.map((playlist) => (
                  <Button
                    key={playlist.id}
                    className="w-full justify-start"
                    variant="outline"
                    onClick={() => saveToPlaylist(playlist.id)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add to {playlist.title}
                  </Button>
                ))}
                <Button
                  className="w-full justify-start"
                  onClick={() => {
                    setShowSaveMenu(false);
                    setEditingPlaylist({
                      id: "",
                      title: "",
                      description: "",
                      nfts: currentNFT ? [currentNFT] : [],
                      aiSummary: "",
                      totalValue: 0,
                      isPublic: false,
                      coverImages: [],
                      createdAt: new Date(),
                    });
                    setShowPlaylistDrawer(true);
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Playlist
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail Modal */}
      <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          {selectedNFT ? (
            <motion.div
              className="flex"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {/* Left Side - Image */}
              <motion.div
                className="w-1/2 flex items-center justify-center p-8"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <div className="relative">
                  <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-orange-500/20 shadow-2xl">
                    <motion.img
                      src={selectedNFT.image}
                      alt={selectedNFT.title}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </div>
                  <motion.div
                    className="absolute -top-2 -right-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.2 }}
                  >
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-black/80 backdrop-blur-sm hover:bg-black/90 transition-all duration-200 hover:scale-110 rounded-full w-10 h-10 p-0"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </div>
              </motion.div>

              {/* Right Side - Content */}
              <motion.div
                className="w-1/2 p-6 space-y-4"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                {/* Header */}
                <motion.div
                  className="space-y-3"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.2 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h2 className="text-xl font-heading font-bold text-white">
                        {selectedNFT.title}
                      </h2>
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.2 }}
                      >
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            selectedNFT.rarity === "Legendary"
                              ? "border-accent text-accent"
                              : selectedNFT.rarity === "Epic"
                              ? "border-primary text-primary"
                              : selectedNFT.rarity === "Rare"
                              ? "border-blue-400 text-blue-400"
                              : "border-gray-400 text-gray-400"
                          }`}
                        >
                          {selectedNFT.rarity}
                        </Badge>
                      </motion.div>
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.2 }}
                      >
                        <Badge
                          variant="secondary"
                          className="bg-orange-500/20 text-orange-300 text-xs"
                        >
                          AI: {selectedNFT.aiConfidence}%
                        </Badge>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* Stats */}
                <motion.div
                  className="grid grid-cols-2 gap-4 py-4 bg-gradient-to-r from-muted/20 to-muted/10 rounded-xl border border-orange-500/10 backdrop-blur-sm"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.2 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-center">
                    <p className="text-xs text-gray-400 mb-1">Floor Price</p>
                    <p className="text-lg font-bold text-primary">
                      {selectedNFT.floorPrice} ETH
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400 mb-1">Chain</p>
                    <p className="text-sm font-semibold text-white">
                      {selectedNFT.chain}
                    </p>
                  </div>
                </motion.div>

                {/* AI Summary */}
                <motion.div
                  className="space-y-2"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.2 }}
                >
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Sparkles className="h-4 w-4 text-primary" />
                    </motion.div>
                    AI Summary
                  </h3>
                  <p className="text-xs leading-relaxed text-gray-300 line-clamp-3">
                    {selectedNFT.aiSummary}
                  </p>
                </motion.div>

                {/* Traits */}
                <motion.div
                  className="space-y-2"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.2 }}
                >
                  <h3 className="text-sm font-semibold text-white">Traits</h3>
                  <div className="flex flex-wrap gap-1">
                    {selectedNFT.traits.slice(0, 4).map((trait, index) => (
                      <motion.div
                        key={trait}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.7 + index * 0.1, duration: 0.2 }}
                      >
                        <Badge
                          variant="outline"
                          className="text-xs border-orange-500/30 text-orange-300 hover:bg-orange-500/10 transition-all duration-200 hover:scale-105"
                        >
                          {trait}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Actions */}
                <motion.div
                  className="flex gap-2 pt-4 border-t border-border/50"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.2 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={() => {
                        if (selectedNFT) {
                          saveToPlaylist();
                          setShowDetailModal(false);
                        }
                      }}
                      size="sm"
                      className="flex-1 blur-orange-gradient text-black font-semibold text-xs transition-all duration-200"
                    >
                      <Heart className="h-3 w-3 mr-1" />
                      Save
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-primary text-primary hover:bg-primary/10 text-xs transition-all duration-200"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No NFT selected</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Playlist Editor Drawer */}
      <Drawer open={showPlaylistDrawer} onOpenChange={setShowPlaylistDrawer}>
        <DrawerContent className="max-h-[85vh] bg-zinc-900 border-zinc-800">
          {editingPlaylist && (
            <>
              <DrawerHeader className="pb-6 border-b border-zinc-800">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/30">
                    <Play className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <DrawerTitle className="text-2xl font-bold text-white">
                      {editingPlaylist.id ? "Edit Playlist" : "Create Playlist"}
                    </DrawerTitle>
                    <DrawerDescription className="text-zinc-400 mt-1">
                      Organize your NFT collection into curated playlists
                    </DrawerDescription>
                  </div>
                </div>
              </DrawerHeader>

              <div className="px-6 pb-6 space-y-6 overflow-y-auto max-h-[calc(85vh-200px)]">
                <div className="grid gap-4">
                  <div>
                    <label className="text-sm font-semibold mb-2 block text-white">
                      Playlist Title
                    </label>
                    <Input
                      value={editingPlaylist.title}
                      onChange={(e) =>
                        setEditingPlaylist((prev) =>
                          prev
                            ? {
                                ...prev,
                                title: e.target.value,
                              }
                            : null
                        )
                      }
                      placeholder="Enter playlist title"
                      className="h-12 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-orange-500 focus:ring-orange-500 focus:shadow-orange-500/20"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold mb-2 block text-white">
                      Description
                    </label>
                    <Textarea
                      value={editingPlaylist.description}
                      onChange={(e) =>
                        setEditingPlaylist((prev) =>
                          prev
                            ? {
                                ...prev,
                                description: e.target.value,
                              }
                            : null
                        )
                      }
                      placeholder="Describe your playlist"
                      rows={3}
                      className="resize-none bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-orange-500 focus:ring-orange-500 focus:shadow-orange-500/20"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="public"
                        checked={editingPlaylist.isPublic}
                        onChange={(e) =>
                          setEditingPlaylist((prev) =>
                            prev
                              ? {
                                  ...prev,
                                  isPublic: e.target.checked,
                                }
                              : null
                          )
                        }
                        className="rounded border-zinc-600 bg-zinc-800 text-orange-500 focus:ring-orange-500 focus:shadow-orange-500/20"
                      />
                      <label
                        htmlFor="public"
                        className="text-sm font-medium text-white"
                      >
                        Make playlist public
                      </label>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700 hover:border-zinc-600 hover:shadow-orange-500/20"
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      AI Rewrite
                    </Button>
                  </div>
                </div>

                {editingPlaylist.nfts.length > 0 && (
                  <div className="border-t border-zinc-800 pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-md flex items-center justify-center shadow-lg shadow-orange-500/30">
                          <Play className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-white">
                          {editingPlaylist.nfts.length} NFTs
                        </h3>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setEditingPlaylist((prev) =>
                            prev ? { ...prev, nfts: [] } : null
                          )
                        }
                        className="text-zinc-400 hover:text-white hover:bg-zinc-800 hover:shadow-orange-500/20"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Clear All
                      </Button>
                    </div>

                    <div className="space-y-1 max-h-80 overflow-y-auto pr-2">
                      {editingPlaylist.nfts.map((nft, index) => (
                        <div
                          key={nft.id}
                          className="flex items-center gap-4 p-3 rounded-lg hover:bg-zinc-800/50 hover:shadow-orange-500/10 transition-all duration-200 group cursor-pointer"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="relative">
                              <div className="w-12 h-12 rounded-md overflow-hidden bg-zinc-700 flex-shrink-0 group-hover:shadow-orange-500/20 transition-all duration-200">
                                <img
                                  src={nft.image}
                                  alt={nft.title}
                                  className="w-full h-full object-cover object-center"
                                  loading="lazy"
                                />
                              </div>
                              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                                <Play className="h-5 w-5 text-white" />
                              </div>
                            </div>

                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-white truncate group-hover:text-green-400 transition-colors">
                                {nft.title}
                              </p>
                              <p className="text-xs text-zinc-400 truncate">
                                {nft.collection}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="text-right">
                              <p className="text-xs text-zinc-400">
                                {nft.floorPrice} ETH
                              </p>
                              <div className="flex items-center gap-1 mt-1">
                                <div
                                  className={`w-2 h-2 rounded-full ${
                                    nft.rarity === "Legendary"
                                      ? "bg-yellow-500"
                                      : nft.rarity === "Epic"
                                      ? "bg-purple-500"
                                      : nft.rarity === "Rare"
                                      ? "bg-blue-500"
                                      : "bg-gray-500"
                                  }`}
                                />
                                <span className="text-xs text-zinc-500">
                                  {nft.rarity}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="w-8 h-8 p-0 text-zinc-400 hover:text-white hover:bg-zinc-700"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (index > 0) {
                                    setEditingPlaylist((prev) =>
                                      prev
                                        ? {
                                            ...prev,
                                            nfts: [
                                              ...prev.nfts.slice(0, index - 1),
                                              prev.nfts[index],
                                              prev.nfts[index - 1],
                                              ...prev.nfts.slice(index + 1),
                                            ],
                                          }
                                        : null
                                    );
                                  }
                                }}
                                disabled={index === 0}
                              >
                                <ArrowUp className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="w-8 h-8 p-0 text-zinc-400 hover:text-white hover:bg-zinc-700"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (index < editingPlaylist.nfts.length - 1) {
                                    setEditingPlaylist((prev) =>
                                      prev
                                        ? {
                                            ...prev,
                                            nfts: [
                                              ...prev.nfts.slice(0, index),
                                              prev.nfts[index + 1],
                                              prev.nfts[index],
                                              ...prev.nfts.slice(index + 2),
                                            ],
                                          }
                                        : null
                                    );
                                  }
                                }}
                                disabled={
                                  index === editingPlaylist.nfts.length - 1
                                }
                              >
                                <ArrowDown className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="w-8 h-8 p-0 text-zinc-400 hover:text-white hover:bg-zinc-700"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditingPlaylist((prev) =>
                                    prev
                                      ? {
                                          ...prev,
                                          nfts: prev.nfts.filter(
                                            (_, i) => i !== index
                                          ),
                                        }
                                      : null
                                  );
                                }}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <DrawerFooter className="border-t border-zinc-800 pt-6">
                <div className="flex gap-3">
                  <Button
                    onClick={() => {
                      if (editingPlaylist) {
                        if (editingPlaylist.id) {
                          // Update existing playlist
                          setPlaylists((prev) =>
                            prev.map((p) =>
                              p.id === editingPlaylist.id ? editingPlaylist : p
                            )
                          );
                          toast.success(
                            `Playlist "${editingPlaylist.title}" updated successfully!`
                          );
                        } else {
                          // Create new playlist
                          const newPlaylist: Playlist = {
                            ...editingPlaylist,
                            id: Date.now().toString(),
                            aiSummary:
                              editingPlaylist.description || "Custom playlist",
                            totalValue: editingPlaylist.nfts.reduce(
                              (sum, nft) => sum + nft.floorPrice,
                              0
                            ),
                            coverImages: editingPlaylist.nfts
                              .slice(0, 4)
                              .map((nft) => nft.image),
                          };
                          setPlaylists((prev) => [newPlaylist, ...prev]);
                          toast.success(
                            `Playlist "${editingPlaylist.title}" created successfully!`
                          );
                        }
                        setShowPlaylistDrawer(false);
                        setEditingPlaylist(null);
                      }
                    }}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:from-orange-600 hover:to-red-600 h-12 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50"
                  >
                    <Save className="h-5 w-5 mr-2" />
                    {editingPlaylist.id ? "Update Playlist" : "Create Playlist"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowPlaylistDrawer(false);
                      setEditingPlaylist(null);
                    }}
                    className="h-12 bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700 hover:border-zinc-600 hover:shadow-orange-500/20"
                  >
                    Cancel
                  </Button>
                </div>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}
