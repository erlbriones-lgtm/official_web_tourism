import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Download, 
  FileDown, 
  Search, 
  Sparkles, 
  CheckCircle,
  Award,
  BookOpen,
  Image as ImageIcon,
  MapPin,
  Check,
  Compass
} from "lucide-react";

interface DownloadableItem {
  id: string;
  title: string;
  description: string;
  category: "Guides" | "Campaigns" | "Assets";
  fileSize: string;
  fileType: "PDF" | "ZIP" | "PNG";
  downloadsCount: number;
  fileName: string;
  content: string;
}

const downloadablesList: DownloadableItem[] = [
  {
    id: "heritage-brochure",
    title: "Official Tagbilaran Heritage Guide",
    description: "An extensive curated guide exploring Spanish colonial ancestral homes across Poblacion I & II, the Sandugo covenant monument of National Artist Napoleon Abueva, and centuries-old local narratives.",
    category: "Guides",
    fileSize: "4.8 MB",
    fileType: "PDF",
    downloadsCount: 1248,
    fileName: "Tagbilaran_Heritage_Brochure.pdf",
    content: `TAGBILARAN CITY OFFICIAL HERITAGE & TOURISM GUIDE
=====================================================
Welcome to the prestige Capital of Peace and Friendship!

UNESCO CREATIVE CITIES NOMINATION DEEP-DIVE
-------------------------------------------
Tagbilaran City is proudly nominated for the UNESCO Creative Cities Network 
in Crafts and Folk Arts. This official guide documents our rich tapestry 
of historical markers, living heritage, and local artistic practices.

HISTORICAL CORNERSTONES
-----------------------
1. Spanish-Era Colonial Ancestral Houses (Poblacion I & II)
   Magnificent Bahay-na-Bato homes featuring beautiful capiz window shutters, 
   sturdy native hardwoods, and century-old local narratives.
2. The Bohol Sandugo Shrine (Barangay Bool)
   Commemorating the blood compact between Chieftain Datu Sikatuna and Spanish 
   General Legazpi on March 16, 1565.
3. Cathedral of St. Joseph the Worker
   A cornerstone of Jesuit and Recollect architecture originally built in 1724, 
   featuring glorious restored neoclassical frescoes.

We hope you appreciate and preserve the living legacy of Tagbilaran City!`
  },
  {
    id: "unesco-campaign",
    title: "UNESCO Creative Candidate Dossier",
    description: "Discover the specific details of Tagbilaran's application to the UNESCO Creative Cities Network, emphasizing the heritage clay potteries of Barangay Manga and Dampas hand-weaving guilds.",
    category: "Campaigns",
    fileSize: "3.2 MB",
    fileType: "PDF",
    downloadsCount: 842,
    fileName: "Tagbilaran_UNESCO_Nomination_Dossier.pdf",
    content: `TAGBILARAN CITY: UNESCO CREATIVE CITIES CANDIDACY
===================================================
Application Focus: Crafts & Folk Arts

INTRODUCTION
------------
Tagbilaran acts as the premier creative and cultural gateway to Bohol. 
Through a synthesis of traditional indigenous methods and modern design assets, 
we preserve and uplift our localized creative industry.

OUR CRAFTS & ARTISAN SECTORS:
1. Terracotta Clay Pottery (Barangay Manga & San Isidro)
   Upholding century-old clay craftsmanship through functional and decorative pottery.
2. Dampas Hand-Weaving Guilds (Barangay Dampas)
   Preserving ancestral loom-weaving methods utilizing organic, local fibers.
3. Digital Artisanship Alliance
   Empowering local youths to merge physical arts with modern web resources.

Support the Tagbilaran UNESCO Creative Cities Network Campaign!`
  },
  {
    id: "sikatuna-companion-map",
    title: "Sikatuna Transit & Walking Map",
    description: "Curated coordinates, walking pathways, and location indices for the 15 barangays. Perfect for eco-tourists exploring the Tubig Dako lagoon and the Sandugo monument.",
    category: "Guides",
    fileSize: "2.5 MB",
    fileType: "PDF",
    downloadsCount: 1935,
    fileName: "Sikatuna_Walking_Itinerary_Map.pdf",
    content: `SIKATUNA CONCIERGE: WALKING ITINERARY & TRANSIT MAP
======================================================
Explore pristine cultural and environmental sanctuaries in Tagbilaran City.

CURATED TOURIST WALKING PATHS:
-----------------------------
Route 1: The Historical Core (Poblacion I & II)
   - Start: St. Joseph the Worker Cathedral
   - Stop 2: Old Provincial Capitol (Bohol National Museum)
   - End: Spanish-Era Ancestral Homes row

Route 2: The Artisan & Nature Trail (Northern Districts)
   - Start: Tubig Dako Lagoon (Barangay Taloto)
   - Stop 2: Clay Pottery Gardens (Barangay San Isidro)
   - End: Hand-Weaving Studios (Barangay Dampas)

Route 3: The Friendship Monument (Eastern Core)
   - Destination: Bohol Sandugo Shrine in Barangay Bool

Please travel sustainably and respect traditional local landmarks!`
  },
  {
    id: "wallpapers-pack",
    title: "Sandugo & Heritage Wallpaper Pack",
    description: "A gorgeous collection of high-resolution professional background assets showcasing the historic landscape photography and artistic seals of Tagbilaran City.",
    category: "Assets",
    fileSize: "14.2 MB",
    fileType: "ZIP",
    downloadsCount: 954,
    fileName: "Tagbilaran_Heritage_Wallpapers.txt",
    content: `TAGBILARAN CITY HIGH-RES DIGITAL WALLPAPER PACK
=================================================
Thank you for downloading our digital creative asset bundle!

INCLUDED WALLPAPER FILES IN ZIP ARCHIVE:
----------------------------------------
1. Sandugo_Monolithic_Dawn_4K.jpg - Sunrise over the historic blood compact statue.
2. St_Joseph_Stained_Glass_HD.jpg - Splendid ambient sunlight streaming through the cathedral portals.
3. Taloto_Tubig_Dako_Sanctuary.jpg - Intimate mystical views of the eco-spring lagoon.
4. Bohol_Straits_Vanguard_Sunset.jpg - Panoramic sea horizons from Tagbilaran coastal walk lanes.

Aesthetic Credit: Sculptures by National Artist Napoleon Abueva.
Maintained by the Tagbilaran City Digital Tourism Council.`
  },
  {
    id: "digital-visitor-visa",
    title: "Sikatuna Smart Guest Pass Template",
    description: "Your official QR-enabled digital visa model template. Gain access to micro-museums, localized artisan workshops, and sustainable craft lessons.",
    category: "Assets",
    fileSize: "1.1 MB",
    fileType: "PNG",
    downloadsCount: 1105,
    fileName: "Sikatuna_Digital_Guest_Pass.txt",
    content: `SIKATUNA SMART GUEST PASS & CREATIVE KEY
=========================================
ID Reference: TAG-SAULOG-2026

Welcome, Creative Visitor! Below is the template for your decentralized 
Guest Pass. Print this voucher or keep it on your smart device to unlock:

- 15% discount on ceramic classes in Barangay San Isidro.
- Complimentery entrance to local civic heritage rooms.
- Access to exclusive Sikatuna AI itinerary recommendations.

PROUDLY SUSTAINING BOHOLANO DESIGN AND PACIFIST COMMERCE.`
  }
];

export default function Downloadables() {
  const [activeCategory, setActiveCategory] = useState<"All" | "Guides" | "Campaigns" | "Assets">("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);

  const filteredItems = downloadablesList.filter(item => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (item: DownloadableItem) => {
    setDownloadingId(item.id);
    setDownloadSuccessId(null);

    // Simulate a high-end downloading experience
    setTimeout(() => {
      // Create a Blob containing actual content
      const blob = new Blob([item.content], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", item.fileName);
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setDownloadingId(null);
      setDownloadSuccessId(item.id);

      // Reset success checkmark after 3 seconds
      setTimeout(() => {
        setDownloadSuccessId(null);
      }, 3000);
    }, 1200);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 pt-32 pb-24 text-left" id="downloadables-page">
      {/* Visual Header Banner aligned elegantly */}
      <div className="max-w-3xl mb-12" id="downloadables-header">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#ff5722]/15 text-[#ffaa00] border border-[#ff5722]/20 rounded-full font-mono text-[10px] uppercase tracking-widest font-extrabold mb-4 animate-pulse">
          <FileDown className="w-3.5 h-3.5 text-[#ff5722]" /> DIGITAL RESOURCE VAULT
        </span>
        <h1 className="font-display font-black text-white text-3xl sm:text-5xl tracking-tight leading-none mb-4">
          Heritage <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#ff5722] to-[#ffaa00] italic pr-2">Downloads</span>
        </h1>
        <p className="text-purple-100/90 text-sm sm:text-base leading-relaxed font-sans font-medium">
          Equip yourself with official pamphlets, walking coordinates, UNESCO application portfolios, and offline guides carefully prepared for high-fidelity cultural excursions in Tagbilaran.
        </p>
      </div>

      {/* Utilities Column: Search & Categories */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-10 pb-6 border-b border-white/10" id="downloadables-controls">
        {/* Category Selector */}
        <div className="flex flex-wrap gap-2" id="downloadables-categories">
          {(["All", "Guides", "Campaigns", "Assets"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider font-extrabold transition-all hover:scale-101 border cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#ff5722] text-white border-[#ff5722] shadow-lg shadow-[#ff5722]/20"
                  : "bg-white/5 border-white/10 text-white/70 hover:text-white hover:border-white/20"
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="relative max-w-md w-full" id="downloadables-search-box">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-200/55" />
          <input
            type="text"
            placeholder="Search documents or resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 hover:border-white/20 rounded-xl text-white text-xs placeholder:text-[#faf6ef]/40 focus:outline-none focus:border-[#ff5722] focus:bg-white/10 transition-all font-sans"
          />
        </div>
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="download-cards-grid">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, idx) => {
            const isDownloading = downloadingId === item.id;
            const isSuccess = downloadSuccessId === item.id;

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white/5 rounded-3xl p-6 border border-white/10 hover:border-[#ffaa00]/30 transition-all flex flex-col justify-between h-[255px] group relative overflow-hidden text-left"
              >
                {/* Visual back glow on group hovering */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff5722]/0 via-transparent to-[#ffaa00]/0 group-hover:from-[#ff5722]/5 group-hover:to-[#ffaa00]/5 pointer-events-none transition-all duration-500" />
                
                <div>
                  {/* Category Pill */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="px-2.5 py-0.5 rounded-md bg-white/10 text-[#ffaa00] font-mono text-[9px] uppercase tracking-widest font-extrabold">
                      {item.category.slice(0, -1)} {/* Singular form */}
                    </span>
                    <span className="font-mono text-[10px] text-white/50 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                      {item.fileType} • {item.fileSize}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-white font-sans font-black text-base sm:text-lg tracking-tight group-hover:text-[#ffaa00] transition-colors leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-purple-100/70 text-xs mt-2.5 line-clamp-3 leading-relaxed font-sans font-medium">
                    {item.description}
                  </p>
                </div>

                {/* Card Action footer bar */}
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-purple-250/50 flex items-center gap-1 font-bold">
                    <Compass className="w-3 h-3 text-[#ff5722] animate-spin-slow" /> {item.downloadsCount} EXPORTS
                  </span>

                  <button
                    onClick={() => handleDownload(item)}
                    disabled={isDownloading}
                    className={`px-3.5 py-2 rounded-xl text-[10px] font-mono font-extrabold uppercase tracking-widest transition-all duration-300 flex items-center gap-1.5 cursor-pointer border ${
                      isSuccess
                        ? "bg-[#10b981] hover:bg-[#059669] text-white border-[#10b981]"
                        : isDownloading
                        ? "bg-amber-500/35 text-white border-amber-500/20"
                        : "bg-[#ff5722]/20 hover:bg-[#ff5722] text-white border-[#ff5722]/30"
                    }`}
                  >
                    {isSuccess ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        SAVED
                      </>
                    ) : isDownloading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          className="w-3 h-3 border border-white border-t-transparent rounded-full"
                        />
                        SAVING
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5" />
                        DOWNLOAD
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filteredItems.length === 0 && (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 py-16 text-center" id="empty-downloads">
            <Sparkles className="w-8 h-8 text-[#ffaa00] mx-auto opacity-40 animate-pulse mb-3" />
            <h3 className="text-white font-sans font-bold text-base">No Matching Resources</h3>
            <p className="text-purple-100/50 text-xs mt-1.5">Please check your search filters or try a different term.</p>
          </div>
        )}
      </div>

      {/* Campaign Feature callout block matching designHer */}
      <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#ff5722]/10 via-transparent to-[#4c0070]/20 border border-[#ff5722]/20 text-center relative overflow-hidden" id="saulog-campaign-card">
        <div className="absolute top-[-30%] left-[-10%] w-72 h-72 bg-[#ff5722]/10 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute bottom-[-30%] right-[-10%] w-72 h-72 bg-[#00f5d4]/10 rounded-full blur-[90px] pointer-events-none" />
        
        <Award className="w-10 h-10 text-[#ffaa00] mx-auto mb-4" />
        <h3 className="font-display font-black text-white text-xl sm:text-2xl uppercase tracking-wider mb-2">
          Help Spread Tagbilaran's Creative Code
        </h3>
        <p className="text-purple-100/80 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed mb-6 font-sans">
          These documents are free for sharing and media publication to raise global awareness for Tagbilaran's application to the UNESCO Creative Cities Network in Crafts and Folk Arts.
        </p>
        <span className="inline-block px-3 py-1 rounded bg-[#ff5722]/20 text-[#ffaa00] text-[9px] font-mono tracking-widest font-extrabold uppercase truncate">
          Campaign Asset Certification: ID #TAG-UNESCO-2026
        </span>
      </div>
    </div>
  );
}
