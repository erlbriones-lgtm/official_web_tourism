import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowDown, Flame, Sparkles, MapPin, Compass } from "lucide-react";

import slide1 from "../assets/images/blood_compact_monument_1779755352294.jpg";
import slide2 from "../assets/images/bohol_national_museum_1779755372514.jpg";
import slide3 from "../assets/images/bohol_blades_1779755393328.jpg";
import slide4 from "../assets/images/ancestral_house_1779755412422.jpg";
import slide5 from "../assets/images/tubig_dako_spring_1779755435421.jpg";

interface HeroProps {
  onOpenAI: () => void;
  onSwitchToHeritage: () => void;
  onPlanVisit?: () => void;
  weatherDescription?: string;
  temperature?: number;
}

const SLIDE_IMAGES = [
  slide1,
  slide2,
  slide3,
  slide4,
  slide5
];

export default function Hero({ onOpenAI, onSwitchToHeritage, onPlanVisit, weatherDescription, temperature }: HeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        // Select a random index different from the previous one
        const remainingIndices = SLIDE_IMAGES.map((_, i) => i).filter((i) => i !== prevIndex);
        const randomIndex = remainingIndices[Math.floor(Math.random() * remainingIndices.length)];
        return randomIndex;
      });
    }, 5000); // Transitions every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="gateway-hero"
      className="relative min-h-screen flex items-center justify-start overflow-hidden bg-[#120024] px-8 sm:px-16 md:px-24 pt-24 pb-16"
    >
      {/* Immersive background slideshow displaying Timages slowly and randomly */}
      <div id="hero-background-media" className="absolute inset-0 z-0 select-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#120024]/90 via-[#120024]/20 to-transparent z-10" />
        {/* Double-layered bottom fog to ensure absolute seamless blending */}
        <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#120024] via-[#120024]/60 to-transparent z-20 pointer-events-none" />
        
        <AnimatePresence initial={false}>
          <motion.img 
            key={SLIDE_IMAGES[currentImageIndex]}
            src={SLIDE_IMAGES[currentImageIndex]}
            alt="Bohol Heritage Scene"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1.02 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </AnimatePresence>

        {/* Floating warm green and golden sunbeam layers */}
        <div className="absolute top-1/4 right-[20%] w-96 h-96 rounded-full bg-growth-500/10 blur-[130px] mix-blend-screen" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-amber-500/10 blur-[120px] mix-blend-screen" />
      </div>

      {/* Main Left-Aligned Content Box */}
      <div className="relative z-10 max-w-3xl text-left" id="hero-main-content">
        
        {/* Immersive small tag indicator */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-2 mb-4"
          id="hero-unesco-badge"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-[#ff5722] font-extrabold block">
            CITY OF PEACE AND FRIENDSHIP
          </span>
        </motion.div>

        {/* Large custom styled Tagbilaran title (where heritage meets tomorrow) */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.1] mb-6"
          id="hero-main-headline"
        >
          Tagbilaran: <span className="text-white">Where</span>
          <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#ff5722] via-[#e63946] to-[#ffaa00] italic mt-1 pb-1 pr-4">
            Heritage Meets
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#ff5722] to-[#ffaa00] mt-1 pr-1">
            Tomorrow
          </span>
        </motion.h1>

        {/* Dynamic Glassmorphism Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/15 shadow-2xl mt-4 max-w-full"
          id="hero-glassmorphism-actions"
        >
          <button
            onClick={onOpenAI}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[11px] font-mono font-extrabold uppercase tracking-widest text-white/90 hover:text-white bg-transparent hover:bg-white/10 transition-all active:scale-95 cursor-pointer"
            id="hero-btn-explore"
          >
            <Compass className="w-3.5 h-3.5 text-[#ffaa00]" />
            <span>Explore the City</span>
          </button>
          
          <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />

          <button
            onClick={onSwitchToHeritage}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[11px] font-mono font-extrabold uppercase tracking-widest text-[#ffaa00] hover:text-[#ffca28] bg-transparent hover:bg-white/10 transition-all active:scale-95 cursor-pointer"
            id="hero-btn-heritage"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Discover our Heritage</span>
          </button>

          <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />

          <button
            onClick={onPlanVisit}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[11px] font-mono font-extrabold uppercase tracking-widest text-white/90 hover:text-white bg-[#ff5722]/30 hover:bg-[#ff5722]/45 transition-all duration-300 border border-[#ff5722]/20 active:scale-95 cursor-pointer"
            id="hero-btn-music"
          >
            <Flame className="w-3.5 h-3.5 text-[#ffaa00]" />
            <span>City of Music</span>
          </button>
        </motion.div>
      </div>

      {/* Bounce scroll trigger indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-8 left-12 z-10 flex flex-col items-start gap-1 opacity-50 cursor-pointer hover:opacity-100 transition-opacity"
        onClick={onSwitchToHeritage}
        id="hero-scroll-trigger"
      >
        <span className="font-mono text-[9px] uppercase tracking-widest text-white/60 font-bold">
          Scroll to discover
        </span>
        <ArrowDown className="w-3.5 h-3.5 text-[#ff5722]" />
      </motion.div>
    </section>
  );
}
