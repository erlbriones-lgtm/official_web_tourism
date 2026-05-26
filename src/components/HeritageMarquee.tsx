import { Compass } from "lucide-react";

import bcs from "../../Timages/BCS.webp";
import baliliOldHouse from "../../Timages/Balili Heritage House (4).webp";
import baybayTaloto from "../../Timages/Baybay sa Taloto (6).webp";
import bloodCompact2 from "../../Timages/Blood Compact Shrine (2).webp";
import bloodCompact20 from "../../Timages/Blood Compact Shrine (20).webp";
import bloodCompact21 from "../../Timages/Blood Compact Shrine (21).webp";
import bloodCompact28 from "../../Timages/Blood Compact Shrine (28).webp";
import bloodCompact31 from "../../Timages/Blood Compact Shrine (31).webp";
import blades1 from "../../Timages/Bohol Blades (1).webp";
import blades3_1 from "../../Timages/Bohol Blades (3)-1.webp";
import blades3 from "../../Timages/Bohol Blades (3).webp";
import blades4 from "../../Timages/Bohol Blades (4).webp";
import museum2 from "../../Timages/MUSEUM2.webp";
import oldHousePob1 from "../../Timages/Old House in Poblacion 1 (3).webp";
import tubigDako from "../../Timages/Tubig Dako in Taloto (1).webp";

interface MarqueeCardProps {
  title: string;
  category: string;
  district: string;
  image: string;
  desc: string;
}

const row1Cards: MarqueeCardProps[] = [
  {
    title: "Sandugo Covenant Site",
    category: "Heritage Covenant",
    district: "Barangay Bohol",
    image: bcs,
    desc: "Datu Sikatuna's historic blood pact with Legazpi in March 1565."
  },
  {
    title: "National Museum Bohol",
    category: "Spanish Neoclassical",
    district: "Poblacion II",
    image: museum2,
    desc: "Restored old Capitol hosting native pre-colonial historical artifacts."
  },
  {
    title: "Traditional Forged Blades",
    category: "Forged Metallurgy",
    district: "Dampas District",
    image: blades1,
    desc: "Hand-forged Bolos and traditional wavy defense steel craftsmanship."
  },
  {
    title: "Colonial Ancestral Casas",
    category: "Bahay Na Bato",
    district: "Poblacion I",
    image: oldHousePob1,
    desc: "Historic heavy-timber structures decorated with beautiful capiz shutters."
  },
  {
    title: "Tubig Dako Cave Spring",
    category: "Eco-Sanctuary",
    district: "Barangay Taloto",
    image: tubigDako,
    desc: "Ancient cavern water supply harboring local heritage and folklore."
  }
];

const row2Cards: MarqueeCardProps[] = [
  {
    title: "Balili Heritage House",
    category: "Historical Villa",
    district: "Poblacion I",
    image: baliliOldHouse,
    desc: "Breathtaking heritage house showing structural preservation and vintage architecture."
  },
  {
    title: "Baybay sa Taloto",
    category: "Coast Sanctuary",
    district: "Barangay Taloto",
    image: baybayTaloto,
    desc: "Pristine coast view overlooking beautiful marine ecosystems and islands."
  },
  {
    title: "Sikatuna Bronze Shrine",
    category: "Heritage Monument",
    district: "Barangay Bohol",
    image: bloodCompact21,
    desc: "A stunning bronze masterpiece depicting eternal alliance and hospitality."
  },
  {
    title: "Bohol Blades Mastery",
    category: "Forged Weapons",
    district: "Barangay Dampas",
    image: blades3,
    desc: "Showcasing Boholano blacksmith expertise, antique handles and premium blades."
  },
  {
    title: "Blood Compact Site Panorama",
    category: "Historic Sanctuary",
    district: "Barangay Bohol",
    image: bloodCompact28,
    desc: "Commemorating historical milestones and outstanding waterfront heritage."
  }
];

export default function HeritageMarquee() {
  return (
    <section 
      id="infinite-heritage-marquee" 
      className="w-full pt-4 pb-16 bg-bg-dark text-[#faf6ef] overflow-hidden flex flex-col gap-12"
    >
      {/* Header Info */}
      <div className="text-center px-6 max-w-2xl mx-auto flex flex-col items-center">
        <div className="flex items-center gap-2 mb-3 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
          <Compass className="w-3.5 h-3.5 text-accent animate-spin-slow" />
          <span className="font-mono text-[10px] uppercase tracking-widest font-extrabold text-accent">
            Discover
          </span>
        </div>
        <h3 className="font-serif font-bold text-3xl sm:text-4.5xl tracking-normal leading-tight text-white">
          Explore Our Heritage
        </h3>
        <p className="text-purple-100/70 text-xs sm:text-sm mt-3 leading-relaxed font-sans font-medium">
          A continuous, panoramic exposition of Tagbilaran's cultural nodes, local crafts, and historic quarters scrolling infinitely to portray our everlasting legacy.
        </p>
      </div>

      {/* Marquee Wrapper with Pause On Hover capability */}
      <div className="w-full flex flex-col gap-6 select-none relative hover-pause" id="marquee-rows-container">
        
        {/* Row 1: Scrolling Left */}
        <div className="w-full overflow-hidden relative py-2" id="marquee-row-1-wrapper">
          {/* Edge Gradients overlays */}
          <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-bg-dark to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-bg-dark to-transparent z-10 pointer-events-none" />

          <div className="flex w-max flex-nowrap gap-6 animate-marquee-left" id="marquee-row-1">
            {/* Duplicated once for seamless endless scroll */}
            {[...row1Cards, ...row1Cards].map((card, idx) => (
              <div 
                key={`row1-${idx}`}
                className="w-[280px] sm:w-[300px] shrink-0 bg-bg-mid hover:bg-bg-light rounded-2xl overflow-hidden border border-white/5 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] flex flex-col text-left group"
              >
                {/* Image slot */}
                <div className="h-[180px] sm:h-[196px] w-full overflow-hidden relative bg-black/25">
                  <img 
                    src={card.image} 
                    alt={card.title}
                    className="w-full h-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[#120024]/80 backdrop-blur-sm border border-white/10 px-2.5 py-0.5 rounded text-[9px] font-mono tracking-widest text-[#faf6ef] uppercase">
                    {card.district}
                  </div>
                </div>

                {/* Content area */}
                <div className="p-5 flex-1 flex flex-col justify-between gap-1">
                  <div>
                    <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-accent uppercase block">
                      {card.category}
                    </span>
                    <h4 className="font-sans font-extrabold text-base text-white mt-1 group-hover:text-amber-300 transition-colors">
                      {card.title}
                    </h4>
                    <p className="text-[#e2d9cb] text-xs leading-relaxed mt-2 line-clamp-2">
                      {card.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Scrolling Right */}
        <div className="w-full overflow-hidden relative py-2" id="marquee-row-2-wrapper">
          {/* Edge Gradients overlays */}
          <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-bg-dark to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-bg-dark to-transparent z-10 pointer-events-none" />

          <div className="flex w-max flex-nowrap gap-6 animate-marquee-right" id="marquee-row-2">
            {/* Duplicated once for seamless endless scroll */}
            {[...row2Cards, ...row2Cards].map((card, idx) => (
              <div 
                key={`row2-${idx}`}
                className="w-[280px] sm:w-[300px] shrink-0 bg-bg-mid hover:bg-bg-light rounded-2xl overflow-hidden border border-white/5 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] flex flex-col text-left group"
              >
                {/* Image slot */}
                <div className="h-[180px] sm:h-[196px] w-full overflow-hidden relative bg-black/25">
                  <img 
                    src={card.image} 
                    alt={card.title}
                    className="w-full h-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[#120024]/80 backdrop-blur-sm border border-white/10 px-2.5 py-0.5 rounded text-[9px] font-mono tracking-widest text-[#faf6ef] uppercase">
                    {card.district}
                  </div>
                </div>

                {/* Content area */}
                <div className="p-5 flex-1 flex flex-col justify-between gap-1">
                  <div>
                    <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-accent uppercase block">
                      {card.category}
                    </span>
                    <h4 className="font-sans font-extrabold text-base text-white mt-1 group-hover:text-[#00f5d4] transition-colors">
                      {card.title}
                    </h4>
                    <p className="text-[#e2d9cb] text-xs leading-relaxed mt-2 line-clamp-2">
                      {card.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
