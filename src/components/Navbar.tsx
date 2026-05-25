import { useState, useEffect } from "react";
import { Compass } from "lucide-react";
import { motion } from "motion/react";

interface NavbarProps {
  activeView: "home" | "heritage" | "downloadables" | "about";
  setActiveView: (view: "home" | "heritage" | "downloadables" | "about") => void;
  onPlanVisit: () => void;
}

export default function Navbar({ activeView, setActiveView, onPlanVisit }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLightStyle = false; // Always dark theme optimized for the premium green layout

  return (
    <motion.header
      id="main-nav-header"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#120024]/92 backdrop-blur-md border-b border-[#9333ea]/20 py-3.5 shadow-md"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
        {/* Core Green logo shield from heritagetimeline.jpg - updated with Official Seal */}
        <div 
          onClick={() => {
            setActiveView("home");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }} 
          className="flex items-center gap-2.5 cursor-pointer group select-none"
          id="nav-logo"
        >
          <img 
            src="/TagbilaranLogo.webp" 
            alt="Tagbilaran Official Seal" 
            className="w-8 h-8 object-contain filter drop-shadow-[5px_5px_10px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-105" 
            referrerPolicy="no-referrer"
          />
          <span className="font-sans font-extrabold tracking-wide text-sm sm:text-base transition-colors leading-none text-white drop-shadow-md">
            Tagbilaran City
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="flex items-center gap-8 text-xs font-mono tracking-widest font-extrabold" id="nav-links">
          <button
            onClick={() => {
              setActiveView("home");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`transition-colors hover:cursor-pointer pb-1 border-b-2 ${
              activeView === "home"
                ? "text-[#ffaa00] border-[#ffaa00]"
                : "text-white/80 hover:text-white border-transparent"
            }`}
            id="link-home"
          >
            HOME
          </button>
          
          <button
            onClick={() => {
              setActiveView("heritage");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`transition-colors hover:cursor-pointer pb-1 border-b-2 ${
              activeView === "heritage"
                ? "text-[#ffaa00] border-[#ffaa00]"
                : "text-white/80 hover:text-white border-transparent"
            }`}
            id="link-heritage"
          >
            HERITAGE
          </button>

          <button
            onClick={onPlanVisit}
            className="transition-colors hover:cursor-pointer pb-1 border-b-2 border-transparent text-white/80 hover:text-white"
            id="link-tagbeats"
          >
            TAGBEATS
          </button>

          <button
            onClick={() => {
              setActiveView("downloadables");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`transition-colors hover:cursor-pointer pb-1 border-b-2 ${
              activeView === "downloadables"
                ? "text-[#ffaa00] border-[#ffaa00]"
                : "text-white/80 hover:text-white border-transparent"
            }`}
            id="link-downloadables"
          >
            DOWNLOADABLES
          </button>

          <button
            onClick={() => {
              setActiveView("about");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`transition-colors hover:cursor-pointer pb-1 border-b-2 ${
              activeView === "about"
                ? "text-[#ffaa00] border-[#ffaa00]"
                : "text-white/80 hover:text-white border-transparent"
            }`}
            id="link-about"
          >
            ABOUT
          </button>
        </nav>
      </div>
    </motion.header>
  );
}
