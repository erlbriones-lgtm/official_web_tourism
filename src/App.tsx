import { useState, useEffect, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  MapPin, 
  ChevronRight, 
  Send, 
  Compass, 
  BookOpen, 
  CheckCircle, 
  HelpCircle, 
  Clock, 
  QrCode, 
  Globe, 
  Award, 
  X, 
  RefreshCw,
  Terminal,
  Layers,
  Heart
} from "lucide-react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Downloadables from "./components/Downloadables";
import HeritageMarquee from "./components/HeritageMarquee";

import slide1 from "./assets/images/blood_compact_monument_1779755352294.jpg";
import slide2 from "./assets/images/bohol_national_museum_1779755372514.jpg";
import slide3 from "./assets/images/bohol_blades_1779755393328.jpg";
import slide4 from "./assets/images/ancestral_house_1779755412422.jpg";
import slide5 from "./assets/images/tubig_dako_spring_1779755435421.jpg";

import { tagbilaranLandmarks } from "./data";
import { Landmark, ChatMessage, LocalStatusResponse } from "./types";

export default function App() {
  // Navigation / Theme Styling Switch State
  const [activeView, setActiveView] = useState<"home" | "heritage" | "downloadables" | "about">("home");

  // Core App states
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeLandmark, setActiveLandmark] = useState<Landmark | null>(tagbilaranLandmarks[0]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-msg",
      role: "model",
      content: "Welcome to Tagbilaran, the prestigious 'City of Peace and Friendship!' I am Sikatuna AI, your official cultural concierge. Ask me anything about our sandugo covenant, traditional clay pottery, UNESCO aspirations, or historic cathedrals.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [userQuery, setUserQuery] = useState("");
  const [isAILoading, setIsAILoading] = useState(false);

  // Digital Tourism Visa Passport State
  const [visitorName, setVisitorName] = useState("");
  const [issuedVisaId, setIssuedVisaId] = useState<string>("");
  const [showVisaSuccess, setShowVisaSuccess] = useState(false);

  // Local temperature sync for dynamic Hero
  const [liveTemp, setLiveTemp] = useState<number>(31);
  const [liveWind, setLiveWind] = useState<string>("Gentle breeze");

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Fetch local status metrics silently on load
  useEffect(() => {
    const checkLiveStats = async () => {
      try {
        const res = await fetch("/api/local-status");
        if (res.ok) {
          const data: LocalStatusResponse = await res.json();
          setLiveTemp(data.weather.temperature);
          setLiveWind(data.weather.condition);
        }
      } catch (e) {
        // Fallbacks already in place
      }
    };
    checkLiveStats();
  }, []);

  // auto scroll chat companion drawer
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, isChatOpen]);

  const categories = ["All", "Heritage"];

  const filteredLandmarks = selectedCategory === "All"
    ? tagbilaranLandmarks
    : tagbilaranLandmarks.filter(item => item.category === selectedCategory);

  // Sikatuna AI endpoint requester
  const sendAIMessage = async (textToSend?: string) => {
    const query = textToSend || userQuery;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-msg-${Date.now()}`,
      role: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    if (!textToSend) setUserQuery("");
    setIsAILoading(true);

    try {
      const previousMessagesPayload = chatMessages.concat(userMsg).map(msg => ({
        role: msg.role === "user" ? "user" : "model",
        content: msg.content
      }));

      const response = await fetch("/api/tourism-companion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: previousMessagesPayload })
      });

      if (response.ok) {
        const data = await response.json();
        const modelMsg: ChatMessage = {
          id: `model-msg-${Date.now()}`,
          role: "model",
          content: data.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages(prev => [...prev, modelMsg]);
      } else {
        throw new Error();
      }
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `model-error-${Date.now()}`,
        role: "model",
        content: "Our sea straits digital corridor has experienced minor ripples, but Tagbilaran's hospitality is forever! The blood compact represents a timeless bond of shared prosperity. How can I guide you further on our crafts, historic churches or coastal walkways?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsAILoading(false);
    }
  };

  const handleGenerateVisa = (e: FormEvent) => {
    e.preventDefault();
    if (!visitorName.trim()) return;

    const serial = `TAG-${Math.floor(1000 + Math.random() * 9000)}-${visitorName.slice(0, 3).toUpperCase()}`;
    setIssuedVisaId(serial);
    setShowVisaSuccess(true);
  };

  // Helper trigger for interactive chat drawer
  function _triggerChatInquiry(query: string) {
    setIsChatOpen(true);
    setTimeout(() => {
      sendAIMessage(query);
    }, 180);
  }

  // Exact vertical timeline events as seen/inspired by heritagetimeline.jpg
  const heritageMilestones = [
    {
      year: "1565",
      title: "Blood Compact Between Datu Sikatuna and Miguel Lopez de Legazpi",
      description: "A monumental event signifying foreign friendship and ancestral peace, establishing a sacred covenant sealed with blood in Bohol Barangay."
    },
    {
      year: "1595",
      title: "Construction of Baclayon Church",
      description: "Initiated by Jesuit missionaries, this limestone construction becomes one of the premier ancestral stone cathedrals in the Philippines."
    },
    {
      year: "1767",
      title: "Cathedral of St. Joseph the Worker Established",
      description: "Built in the civic heart of Tagbilaran, this majestic limestone and wood neoclassical cathedral becomes a fortress of heritage."
    },
    {
      year: "1966",
      title: "Charter Day of Tagbilaran City",
      description: "Presidential recognition as a chartered city, formalizing Tagbilaran as the administrative, cultural, and craft capital of Bohol."
    },
    {
      year: "2023",
      title: "UNESCO Creative City nomination",
      description: "Nominated directly for Crafts and Folk Arts, showcasing classic terracota clay potteries and ancestral Dampas hand weaving guilds."
    },
    {
      year: "2026",
      title: "Creative Tech Hub Launch",
      description: "Uniting physical artisanry with high performance digital spaces to empower the next wave of local sustainable designers."
    }
  ];

  return (
    <div 
      className="min-h-screen transition-all duration-500 font-sans overflow-x-hidden relative bg-[#120024] text-[#faf6ef]" 
      id="digital-tourism-root"
    >
      
      {/* Background Decorative atmosphere layers calibrated per view */}
      {activeView === "home" ? (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" id="ambient-layers-home">
          <div className="absolute top-[-5%] left-[-10%] w-[600px] h-[600px] bg-growth-200/20 rounded-full blur-[140px]" />
          <div className="absolute bottom-[20%] right-[-5%] w-[550px] h-[550px] bg-amber-100/10 rounded-full blur-[130px]" />
          <div className="absolute top-[40%] left-[20%] w-[450px] h-[450px] bg-growth-100/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#120024]/40 to-[#120024]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px]" />
        </div>
      ) : (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" id="ambient-layers-heritage">
          <div className="absolute top-[-5%] left-[-10%] w-[600px] h-[600px] bg-growth-200/15 rounded-full blur-[140px]" />
          <div className="absolute bottom-[20%] right-[3%] w-[500px] h-[500px] bg-amber-100/10 rounded-full blur-[130px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#120024]/50 to-[#120024]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.008)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.008)_1px,transparent_1px)] bg-[size:32px_32px]" />
        </div>
      )}

      {/* Dynamic Header Navbar with matching view controls */}
      <Navbar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        onPlanVisit={() => _triggerChatInquiry("Help me plan an interactive travel itinerary in Tagbilaran to see the historical spots and clay craft districts!")}
      />

      {/* Dynamic Main Views container */}
      <AnimatePresence mode="wait">
        {activeView === "home" ? (
          <motion.div
            key="home-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Immersive luxurious resort bedroom view from HOME.jpg */}
            <Hero 
              onOpenAI={() => setIsChatOpen(true)} 
              onSwitchToHeritage={() => setActiveView("heritage")}
              onPlanVisit={() => _triggerChatInquiry("Help me plan an interactive travel itinerary in Tagbilaran to see the historical spots and clay craft districts, and tell me how I can experience the City of Music and local musical ensembles!")}
              weatherDescription={liveWind}
              temperature={liveTemp}
            />

            {/* Light high-end main catalog details */}
            <main className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 py-20 flex flex-col gap-24" id="home-view-main">
              
              {/* PART 1: THE HERITAGE & TECH INFOGRAPHIC GRID (Bento Layout with Saulog Palette) */}
              <section id="heritage-bento" className="scroll-mt-24 text-left">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6" id="bento-header-wrapper">
                  <div className="max-w-2xl text-left">

                    <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-white animate-fade-in">
                      The Heritage &amp; <br />
                      <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#ff5722] to-[#ffaa00] italic pr-4">Tourism Ecosystem</span>
                    </h2>
                    <p className="text-purple-100/90 text-sm sm:text-base leading-relaxed mt-4 font-sans font-medium">
                      Explore the historic legacy of Tagbilaran's most celebrated sacred spaces, ancestral landmarks, and immersive cultural archives below.
                    </p>
                  </div>

                  {/* Tabs */}
                  <div className="flex flex-wrap gap-2" id="category-scroller">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat);
                          const matches = cat === "All" ? tagbilaranLandmarks : tagbilaranLandmarks.filter(l => l.category === cat);
                          if (matches.length > 0) setActiveLandmark(matches[0]);
                        }}
                        className={`px-4 py-2.5 rounded-lg text-xs font-mono tracking-wider font-extrabold transition-all hover:cursor-pointer ${
                          selectedCategory === cat
                            ? "bg-growth-700 text-white shadow-md shadow-growth-700/20"
                            : "bg-white border border-growth-100 hover:border-growth-300 text-growth-900/80"
                        }`}
                      >
                        {cat.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="bento-grid-panel">
                  {/* Left Column (Landmarks list) */}
                  <div className="lg:col-span-5 flex flex-col gap-4 max-h-[580px] overflow-y-auto pr-2 scrollbar-thin" id="bento-sidebar">
                    {filteredLandmarks.map((landmark) => (
                      <div
                        key={landmark.id}
                        onClick={() => setActiveLandmark(landmark)}
                        className={`p-5 rounded-2xl border text-left cursor-pointer transition-all duration-350 relative overflow-hidden group ${
                          activeLandmark?.id === landmark.id
                            ? "bg-white border-growth-500 shadow-xl scale-[1.01]"
                            : "bg-white/60 border-growth-100/50 hover:bg-white hover:border-growth-300"
                        }`}
                      >
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <span className="inline-block px-2.5 py-0.5 rounded text-[9px] font-mono uppercase tracking-widest font-bold mb-2 bg-growth-100 text-growth-800">
                              {landmark.category}
                            </span>
                            <h3 className="font-display font-black text-growth-950 tracking-tight text-lg group-hover:text-growth-700 transition-colors">
                              {landmark.title}
                            </h3>
                            <p className="text-[#3c322a] text-xs line-clamp-2 mt-1.5 leading-relaxed">
                              {landmark.description}
                            </p>
                          </div>
                          <ChevronRight className={`w-4 h-4 mt-1.5 transition-transform ${
                            activeLandmark?.id === landmark.id 
                              ? "text-growth-600 translate-x-1" 
                              : "text-growth-950/50 group-hover:text-growth-600"
                          }`} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Right Column (Detailed description with matching image aspect) */}
                  <div className="lg:col-span-7" id="bento-detail-viewer">
                    <AnimatePresence mode="wait">
                      {activeLandmark && (
                        <motion.div
                          key={activeLandmark.id}
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.3 }}
                          className="h-full rounded-2xl border border-growth-100 bg-white overflow-hidden flex flex-col shadow-xl text-left"
                        >
                          <div className="relative h-64 w-full bg-[#faf6ef] overflow-hidden">
                            <img 
                              src={activeLandmark.imageUrl}
                              alt={activeLandmark.title}
                              className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                            <div className="absolute top-4 right-4">
                              <span className="px-3 py-1 rounded-full bg-growth-950/80 backdrop-blur-sm text-[10px] uppercase font-mono tracking-widest text-white border border-growth-500/20 flex items-center gap-1.5 font-bold">
                                <MapPin className="w-3" /> EST: {activeLandmark.yearEstablished}
                              </span>
                            </div>
                            <div className="absolute bottom-4 left-6">
                              <span className="text-growth-300 font-mono text-[9px] uppercase tracking-widest font-extrabold block">
                                CULTURAL ANCHOR
                              </span>
                              <h3 className="text-white text-xl sm:text-3xl font-display font-black tracking-tight mt-0.5">
                                {activeLandmark.title}
                              </h3>
                            </div>
                          </div>

                          <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                            <div className="mb-6">
                              <p className="text-[#2e251e] text-sm leading-relaxed mb-6 font-medium">
                                {activeLandmark.description}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </section>



            </main>
          </motion.div>
        ) : activeView === "heritage" ? (
          /* HIGH-END INTERACTIVE HISTORIC AND CRAFTS GREEN SLIDER STYLE (inspired by displayher.jpg) */
          <motion.div
            key="heritage-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-20 pb-20 w-full flex flex-col items-center"
          >
            {/* DUAL INFINITE MARQUEE CAROUSEL SHOWCASE */}
            <HeritageMarquee />

            {/* HIGH-END INTERACTIVE TIMELINE PLACED DIRECTLY BELOW THE SLIDE DISPLAY */}
            <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 mt-24" id="chronology-timeline">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="inline-block px-3 py-1 bg-[#15803d]/45 text-[#4ade80] border border-growth-500/20 rounded-full font-mono text-[10px] uppercase tracking-wider font-extrabold mb-3">
                  HISTORICAL CHRONOLOGY
                </span>
                <h3 className="font-sans font-black text-2xl sm:text-3xl text-white tracking-tight">
                  Tagbilaran Chronicles Timeline
                </h3>
                <p className="text-emerald-100/90 text-xs sm:text-sm mt-3 leading-relaxed font-sans font-medium">
                  Deepen your connection with our long legacy of alliances, resistance, and creative growth. Click any chronological node to summon Sikatuna AI.
                </p>
              </div>

              {/* Vertical timeline body */}
              <div className="relative w-full text-left" id="timeline-v-body">
                {/* Central Glowing Festive Line */}
                <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#ff5722] via-[#ffaa00] to-[#00d2c4] opacity-70" />

                {/* Loop and render timeline modules */}
                <div className="space-y-12">
                  {heritageMilestones.map((milestone, idx) => {
                    const isEven = idx % 2 === 0;
                    return (
                      <div 
                        key={milestone.year}
                        className={`relative flex flex-col md:flex-row items-stretch md:items-center justify-between w-full md:w-11/12 mx-auto ${
                          isEven ? "md:flex-row-reverse" : ""
                        }`}
                      >
                        {/* Timeline Dot Indicator */}
                        <div className="absolute left-[9px] md:left-1/2 md:-translate-x-1/2 top-6 md:top-auto w-3.5 h-3.5 rounded-full bg-[#ff5722] border-2 border-white shadow-md z-10 animate-pulse" />

                        {/* Staggered card container */}
                        <div className="w-full md:w-[45%] text-left pl-10 md:pl-0">
                          <motion.div
                            whileHover={{ scale: 1.02, borderColor: "#ff5722", boxShadow: "0 12px 28px rgba(255,87,34,0.08)" }}
                             onClick={() => _triggerChatInquiry(`Tell me the comprehensive history and cultural annals of Tagbilaran related to: ${milestone.year}: ${milestone.title}`)}
                            className="relative p-6 sm:p-7 pl-8 sm:pl-9 rounded-2xl bg-[#fafdfa] border border-[#ff5722]/15 hover:border-[#ff5722] transition-all duration-300 shadow-sm cursor-pointer group overflow-hidden"
                          >
                            {/* Pure premium orange left accent bar */}
                            <div className="absolute left-0 top-0 bottom-0 w-[5px] bg-[#ff5722] opacity-80 group-hover:opacity-100 group-hover:bg-[#ffaa00] transition-all duration-300" />

                            <span className="font-mono text-xl sm:text-2xl font-bold text-[#ff5722] block">
                              {milestone.year}
                            </span>
                            <h4 className="font-sans font-black text-growth-950 text-base sm:text-lg tracking-tight mt-1.5 leading-snug group-hover:text-[#ff5722] transition-colors">
                              {milestone.title}
                            </h4>
                            <p className="text-[#2e251e] text-xs sm:text-sm leading-relaxed mt-2.5 font-medium">
                              {milestone.description}
                            </p>
                            
                            <div className="mt-5 pt-3 border-t border-growth-100 flex items-center justify-between text-[10px] font-mono text-growth-600 uppercase tracking-widest">
                              <span>TAGBILARAN ANNAL</span>
                              <span className="group-hover:text-[#ff5722] transition-colors flex items-center gap-1.5 font-bold">
                                Ask Sikatuna AI ➔
                              </span>
                            </div>
                          </motion.div>
                        </div>

                        {/* Ghost spacer to maintain structure */}
                        <div className="hidden md:block w-[45%]" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Micro summary bottom widget */}
            <div className="mt-24 p-6 rounded-2xl bg-[#fafdfa] border border-[#ff5722]/15 max-w-2xl text-center shadow-sm w-full max-w-7xl mx-auto">
              <div className="flex justify-center items-center gap-2 text-growth-700 font-mono text-xs uppercase mb-2">
                <Compass className="w-4 h-4 text-[#00f5d4] animate-spin-slow" />
                <span>UNESCO CRA Creative Alliance</span>
              </div>
              <p className="text-sm text-[#2e251e] leading-relaxed font-sans font-medium">
                Want to expand your knowledge of Tagbilaran? Push the buttons or launch the <strong>Sikatuna AI Concierge</strong> directly to discuss these milestones or ask questions in real-time.
              </p>
              <button
                onClick={() => setIsChatOpen(true)}
                className="mt-4 px-6 py-2.5 bg-gradient-to-r from-[#ff5722] to-[#ffaa00] hover:from-[#ea580c] hover:to-[#ff9f1c] text-white font-mono text-xs font-bold uppercase rounded-full tracking-wide transition-all shadow-md cursor-pointer"
              >
                Inquire Sikatuna AI Concierge
              </button>
            </div>
          </motion.div>
        ) : activeView === "downloadables" ? (
          <motion.div
            key="downloadables-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Downloadables />
          </motion.div>
        ) : (
          /* LUXURIOUS ABOUT TAGBILARAN CITY VIEW */
          <motion.div
            key="about-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="pt-32 pb-24 w-full flex flex-col items-center select-none"
            id="about-view"
          >
            {/* Elegant Top Badge & Hero Title */}
            <div className="max-w-4xl mx-auto text-center px-6 mb-16">
              <span className="inline-block px-3 py-1 bg-[#ff5722]/15 text-[#ffaa00] border border-[#ff5722]/20 rounded-full font-mono text-[10px] uppercase tracking-widest font-extrabold mb-4">
                THE CAPITAL OF PEACE &amp; FRIENDSHIP
              </span>
              <h1 className="font-display font-black text-white text-4xl sm:text-6xl tracking-tight leading-none mb-6">
                Tagbilaran <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#ff5722] to-[#ffaa00] italic pr-3">City</span>
              </h1>
              <p className="text-[#f3e8ff]/90 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans font-medium">
                Breathe in the living legacy of Bohol's premier creative gateway. From the historic 1565 sandugo covenant to our contemporary UNESCO Creative nomination, Tagbilaran harmonizes raw heritage with forward-looking sustainable art.
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20" id="about-stats-grid">
              {[
                { label: "FOUNDED (SANDUGO)", value: "1565", desc: "First treaty of international friendship", icon: Heart },
                { label: "UNESCO NOMINATION", value: "Crafts", desc: "Crafts & folk arts candidate network", icon: Award },
                { label: "DISTRICT COMMUNITIES", value: "15", desc: "Unique barangays forming the city code", icon: MapPin },
                { label: "CIVIC HEART", value: "Capital", desc: "Administrative & commercial core of Bohol", icon: Globe },
              ].map((stat, sIdx) => {
                const StatIcon = stat.icon;
                return (
                  <motion.div
                    key={sIdx}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white border border-growth-100 p-6 rounded-2xl shadow-xs text-left group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-growth-50 flex items-center justify-center text-[#ff5722] mb-4 group-hover:bg-growth-100 transition-colors">
                      <StatIcon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[9px] text-[#ff5722] uppercase tracking-widest block font-bold">
                      {stat.label}
                    </span>
                    <span className="font-display font-black text-2xl sm:text-3xl text-[#2e251e] block mt-1">
                      {stat.value}
                    </span>
                    <p className="text-xs text-[#2e251e] mt-1.5 leading-relaxed font-sans font-medium">
                      {stat.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Deep Pillars section */}
            <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-stretch" id="about-pillars">
              
              {/* Left Column Text / Narrative */}
              <div className="lg:col-span-5 flex flex-col justify-center text-left">
                <span className="font-mono text-xs text-[#00f5d4] tracking-widest font-extrabold uppercase mb-2 block">
                  THE SOUL OF THE PORTAL
                </span>
                <h2 className="font-display font-black text-white text-3xl sm:text-4xl tracking-tight leading-tight mb-6">
                  Where Ancient Covenant Meets Digital Future
                </h2>
                <div className="space-y-6 text-[#faf6ef]/90 text-xs sm:text-sm leading-relaxed font-sans">
                  <p>
                    Tagbilaran is more than just a geographic capital; it is a spiritual anchor. In 1565, the blood compact between chieftain Sikatuna and explorer Legazpi set a permanent tone of peaceful diplomacy and horizontal alliance.
                  </p>
                  <p>
                    Today, that baseline of peace translates directly into standard-setting local safety, warm community-driven commerce, and a flourishing network of artists, potters, and developers. 
                  </p>
                  <p>
                    As a candidate for the <strong>UNESCO Creative Cities Network</strong>, Tagbilaran represents Boholano craftsmanship—nurtured on the hillsides of Manga and inside the hand-weaving studios of Dampas—forged and celebrated for global eyes.
                  </p>
                </div>

                <div className="mt-8">
                  <button
                    onClick={() => _triggerChatInquiry("Tell me the overview of why Tagbilaran is the City of Peace and Friendship.")}
                    className="px-6 py-3 bg-gradient-to-r from-[#ff5722] to-[#ffaa00] hover:from-[#ea580c] hover:to-[#ff9f1c] text-white font-mono text-xs font-bold uppercase rounded-xl transition-all shadow-md cursor-pointer hover:scale-102"
                  >
                    Discuss With Sikatuna AI Concierge
                  </button>
                </div>
              </div>

              {/* Right Column Interactive Core Cards Grid */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6" id="about-pillars-grid">
                         <div className="bg-white border border-growth-100 p-8 rounded-3xl flex flex-col justify-between text-left shadow-xs">
                  <div>
                    <span className="px-2.5 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-800 font-mono text-[8px] font-bold uppercase tracking-widest">
                      PILLAR 01
                    </span>
                    <h4 className="font-sans font-black text-lg text-growth-950 mt-4 tracking-tight">
                      Sacred Alliance (Sandugo)
                    </h4>
                    <p className="text-xs text-[#2e251e] mt-3 leading-relaxed font-sans">
                      Commemorates the historic March 1565 treaty of peaceful friendship between native Boholano King Datu Sikatuna and Spanish Admiral Legazpi, cementing Tagbilaran's global legacy of harmonious diplomacy.
                    </p>
                  </div>
                  <button
                    onClick={() => _triggerChatInquiry("What is the history of the Sikatuna-Legazpi Blood Compact?")}
                    className="mt-6 text-xs font-mono text-[#ff5722] hover:text-[#ffaa00] font-bold self-start flex items-center gap-1.5 cursor-pointer"
                  >
                    Query Sandugo History ➔
                  </button>
                </div>

                <div className="bg-white border border-growth-100 p-8 rounded-3xl flex flex-col justify-between text-left shadow-xs">
                  <div>
                    <span className="px-2.5 py-0.5 rounded bg-purple-50 border border-purple-200 text-purple-800 font-mono text-[8px] font-bold uppercase tracking-widest">
                      PILLAR 02
                    </span>
                    <h4 className="font-sans font-black text-lg text-growth-950 mt-4 tracking-tight">
                      UNESCO Creative Nominee
                    </h4>
                    <p className="text-xs text-[#2e251e] mt-3 leading-relaxed font-sans">
                      Evolving Boholano heritage crafts for modern eyes. We actively host ancient terracotta pottery workshops in Barangay Manga and Dampas weaving guilds, maintaining a living, thriving folk arts network.
                    </p>
                  </div>
                  <button
                    onClick={() => _triggerChatInquiry("What crafts are highlighted for the UNESCO Creative Cities application of Tagbilaran?")}
                    className="mt-6 text-xs font-mono text-[#ff5722] hover:text-[#ffaa00] font-bold self-start flex items-center gap-1.5 cursor-pointer"
                  >
                    Query Creative Nominee ➔
                  </button>
                </div>

                <div className="bg-white border border-growth-100 p-8 rounded-3xl flex flex-col justify-between text-left shadow-xs">
                  <div>
                    <span className="px-2.5 py-0.5 rounded bg-blue-50 border border-blue-200 text-blue-800 font-mono text-[8px] font-bold uppercase tracking-widest">
                      PILLAR 03
                    </span>
                    <h4 className="font-sans font-black text-lg text-growth-950 mt-4 tracking-tight">
                      Bohol's Academic Center
                    </h4>
                    <p className="text-xs text-[#2e251e] mt-3 leading-relaxed font-sans">
                      Home to the province's highest density of prestigious universities and creative research centers. Generating the intellectual capital and high-performance digital talent driving sustainability forward.
                    </p>
                  </div>
                  <button
                    onClick={() => _triggerChatInquiry("Tell me about the universities and creative talent hubs in Tagbilaran.")}
                    className="mt-6 text-xs font-mono text-[#ff5722] hover:text-[#ffaa00] font-bold self-start flex items-center gap-1.5 cursor-pointer"
                  >
                    Query Civic Talents ➔
                  </button>
                </div>

                <div className="bg-gradient-to-br from-[#ff5722] to-[#ea580c] text-white p-8 rounded-3xl flex flex-col justify-between text-left shadow-md">
                  <div>
                    <span className="px-2.5 py-0.5 rounded bg-white/10 text-amber-200 font-mono text-[8px] font-bold uppercase tracking-widest">
                      OFFICIAL EMBLEM
                    </span>
                    <h4 className="font-sans font-black text-lg mt-4 tracking-tight">
                      Bohol Seal of Authenticity
                    </h4>
                    <p className="text-xs text-[#fff7ed] mt-3 leading-relaxed font-sans">
                      Every architectural limestone element, traditional forged steel bolo, and terracotta banga vessel is certified by local guilds to preserve authentic lineage craftsmanship.
                    </p>
                  </div>
                  <button
                    onClick={() => _triggerChatInquiry("Explain the official seals and emblems of Tagbilaran City.")}
                    className="mt-6 text-xs font-mono text-amber-200 hover:text-white font-bold self-start flex items-center gap-1.5 cursor-pointer"
                  >
                    Query Emblems ➔
                  </button>
                </div>

              </div>

            </div>

            {/* Interactive Barangay Directory Showcase */}
            <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 mb-20" id="about-districts">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="inline-block px-3 py-1 bg-[#ff5722]/15 text-[#ffaa00] border border-[#ff5722]/20 rounded-full font-mono text-[10px] uppercase tracking-wider font-extrabold mb-3">
                  DISTRICT DISCOVERY
                </span>
                <h3 className="font-sans font-black text-2xl sm:text-3xl text-white tracking-tight">
                  Our 15 Vibrant Barangays
                </h3>
                <p className="text-[#f3e8ff]/90 text-xs sm:text-sm mt-3 leading-relaxed font-sans font-medium">
                  Tagbilaran City is physically divided into 15 administrative barangays, each harboring its own historical notes and craft specialized centers. Explore some of our focal quarters.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left" id="barangay-showcase">
                {[
                  { name: "Barangay Manga", heritage: "Ancient Clay Potteries", desc: "The clay center of the province, operating active clay pottery houses and kiln sheds turning organic terracotta banga jars.", tip: "pottery in Barangay Manga" },
                  { name: "Barangay Dampas", heritage: "Boholano Weaving & Blades", desc: "Hosting artisan weaving guilds that thread historic fabrics alongside veteran metalworkers and local blacksmith spaces.", tip: "weaving and blade forging in Dampas" },
                  { name: "Barangay Taloto", heritage: "Tubig Dako Spring & Coastal Walks", desc: "Bordering the serene Bohol sea, and preserving the precious Tubig Dako fresh spring-cave sanctuary and coastal mangroves.", tip: "Tubig Dako Lagoon & spring in Taloto" },
                  { name: "Poblacion I, II, & III", heritage: "Colonial Neoclassical Center", desc: "The central historic district. Host to the St. Joseph Cathedral, Spanish Ancestral casas with capiz windows, and Plaza Rizal.", tip: "heritage district and Plaza Rizal Poblacion" },
                  { name: "Barangay Bohol", heritage: "The Sandugo Covenant Landmark", desc: "The ground zero of peaceful alliance, framing the majestic bronze monument of the 1565 Blood Compact with beautiful sea vistas.", tip: "the historic March 1565 Blood Compact Site in Bohol" },
                  { name: "Barangay San Isidro", heritage: "Clay Deposits & Creative Farms", desc: "Abundant local clay reserves, modern ecogardens, and creative space hubs bridging natural conservation with digital arts.", tip: "clay reserves and eco-farms in San Isidro" },
                ].map((item, bIdx) => (
                  <div
                    key={bIdx}
                    className="p-6 bg-white border border-growth-100/70 rounded-2xl flex flex-col justify-between shadow-xs hover:border-[#ff5722]/30 hover:shadow-md transition-all duration-300"
                  >
                    <div>
                      <span className="font-mono text-[9px] text-[#ff5722] uppercase tracking-widest font-black block">
                        {item.name}
                      </span>
                      <h4 className="font-sans font-black text-base text-growth-950 mt-1.5 tracking-tight">
                        {item.heritage}
                      </h4>
                      <p className="text-xs text-[#2e251e] mt-2.5 leading-relaxed font-sans">
                        {item.desc}
                      </p>
                    </div>
                    <button
                      onClick={() => _triggerChatInquiry(`Tell me more about the heritage, history, and sights of ${item.tip}.`)}
                      className="mt-6 pt-3 border-t border-growth-100 text-[10px] font-mono font-bold text-[#ff5722] hover:text-[#ffaa00] flex items-center justify-between cursor-pointer"
                    >
                      <span>DISCOVER DISTRICT</span>
                      <span>➔</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Sikatuna FAQ prompt card */}
            <div className="w-full max-w-7xl mx-auto px-6 sm:px-12" id="about-ask-cta">
              <div className="rounded-3xl bg-gradient-to-br from-[#faf6ef] to-[#f4eee1] border border-growth-150 p-8 sm:p-12 relative overflow-hidden flex flex-col items-center text-center shadow-xs">
                <Compass className="w-8 h-8 text-[#00f5d4] mb-4 animate-spin-slow" />
                <h3 className="font-sans font-black text-2xl sm:text-3xl text-growth-950 tracking-tight max-w-xl">
                  Curious About Tagbilaran's Treasures?
                </h3>
                <p className="text-[#2e251e] text-xs sm:text-sm mt-3 leading-relaxed max-w-lg mb-8 font-sans">
                  Get absolute coordinates of Spanish era sites, the schedules of the Sandugo festival, or details on clay pottery craft lessons inside our custom heritage assistant.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {[
                    "Where can I learn native Boholano clay pottery?",
                    "What makes Tagbilaran a Candidate UNESCO Creative City?",
                    "Tell me about the ceiling frescoes of St. Joseph Cathedral."
                  ].map((qName, qIdx) => (
                    <button
                      key={qIdx}
                      onClick={() => _triggerChatInquiry(qName)}
                      className="px-4 py-2 bg-white border border-growth-200 hover:border-[#ff5722] text-xs font-mono font-bold text-[#2e251e] rounded-full transition-all cursor-pointer shadow-xs hover:scale-101"
                    >
                      {qName}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER: Light Luxury Resort themed Footer bento grid */}
      <footer className="relative z-10 px-6 sm:px-12 pb-16 pt-16 border-t border-white/10 bg-[#120024]" id="homepage-footer">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-auto md:h-52" id="footer-bento-grid">
            
            {/* Box 1 (col-span-2) */}
            <div className="col-span-1 md:col-span-2 rounded-3xl bg-white border border-[#2c221a]/10 p-8 flex items-end relative overflow-hidden group text-left shadow-sm">
              <div className="absolute top-4 right-6 text-[100px] font-black text-[#2c221a]/[0.02] select-none leading-none">01</div>
              <div className="relative z-10 text-left max-w-md">
                <span className="inline-block px-2.5 py-0.5 bg-growth-50 text-growth-800 border border-growth-200/50 rounded text-[9px] uppercase font-mono tracking-widest font-extrabold mb-3">
                  HERITAGE EXTRAORDINARY
                </span>
                <h5 className="text-xl sm:text-2xl font-serif italic text-[#2c221a] mb-1">Sandugo Covenant Festival</h5>
                <p className="text-xs text-growth-900/80 leading-relaxed font-sans mt-1">
                  The monumental Sandugo Blood Compact festival remains active every July, symbolizing unity and harmony. We render this ancient ritual of honor into dynamic crafts, dances and tourism ecosystems.
                </p>
              </div>
            </div>

            {/* Box 2: Traditional Pottery & Weaving */}
            <div 
              className="rounded-3xl bg-white border border-[#2c221a]/10 p-6 flex flex-col justify-between hover:border-growth-500/30 transition-all cursor-pointer shadow-sm group text-left" 
              onClick={() => _triggerChatInquiry("Tell me about pottery of Barangay Manga and Dampas hand-weaving guilds.")}
            >
              <div className="w-9 h-9 rounded-full bg-growth-50 flex items-center justify-center text-[#ff5722] border border-growth-200 group-hover:rotate-12 transition-transform">
                ✧
              </div>
              <div>
                <h5 className="text-xs font-mono font-bold uppercase tracking-widest text-[#ff5722] mb-2">Artisanry</h5>
                <p className="text-[11px] text-[#2c221a]/75 leading-relaxed">
                  Preserving centuries old terracotta pottery and Dampas hand weaving guilds since colonial years.
                </p>
              </div>
            </div>

            {/* Box 3: Smart Tourism Visa Card */}
            <div 
              className="rounded-3xl bg-growth-700 hover:bg-growth-600 p-6 flex flex-col justify-between shadow-md text-left group cursor-pointer" 
              onClick={() => setActiveView("home")}
            >
              <div className="text-white font-black text-lg group-hover:translate-x-1 transition-transform">➔</div>
              <div>
                <h5 className="text-xs font-mono font-bold uppercase tracking-widest text-white mb-2">Digital Visa</h5>
                <p className="text-[11px] text-white/95 leading-relaxed">
                  The innovative mobile Guest Pass model built for micro-tours, museum access, and community support.
                </p>
              </div>
            </div>

          </div>

          {/* Legal Strip */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-white/60 border-t border-white/10 pt-8 gap-4" id="footer-legal-strip">
            <div className="flex items-center gap-3">
              <Compass className="w-4 h-4 text-[#00f5d4] animate-spin-slow" />
              <span>© {new Date().getFullYear()} TAGBILARAN CITY TOURISM OFFICE • CMO STRATCOM</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="hover:text-white transition-colors cursor-pointer" onClick={() => _triggerChatInquiry("Tell me about the UNESCO listing application details")}>UNESCO CAMPAIGN SHEET</span>
              <span className="text-white/20">•</span>
              <span className="hover:text-white transition-colors cursor-pointer">PHILIPPINES TOURISM SYNC</span>
            </div>
          </div>

        </div>
      </footer>

      {/* SIKATUNA AI COMPANION DRAWER/MODAL WITH GORGEOUS LIGHT THEME MATCHING THE CHOSEN SCHEME */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-100 flex justify-end"
            id="chat-overlay"
            onClick={() => setIsChatOpen(false)}
          >
            {/* Drawout Box */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="w-full max-w-md bg-white border-l border-[#2c221a]/15 h-full flex flex-col relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 border-b border-[#2c221a]/10 bg-[#faf6ef] flex items-center justify-between text-left">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-growth-700 text-white font-display font-black">
                    S
                  </div>
                  <div className="text-left">
                    <h4 className="font-display font-bold text-[#2c221a] leading-tight">Sikatuna Concierge</h4>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#ff5722] font-extrabold block">
                      Tagbilaran Cultural Guide
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="p-1.5 rounded-lg border border-growth-200 text-[#2c221a]/65 hover:text-growth-800 hover:bg-growth-100 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Message List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
                {chatMessages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 text-[9px] font-mono text-[#2c221a]/45 uppercase font-bold">
                      <span>{msg.role === "user" ? "You" : "Sikatuna"}</span>
                      <span>•</span>
                      <span>{msg.timestamp}</span>
                    </div>
                    <div 
                      className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed text-left max-w-[85%] whitespace-pre-wrap ${
                        msg.role === "user"
                          ? "bg-growth-700 text-white rounded-tr-none font-bold shadow-md shadow-growth-700/15"
                          : "bg-[#faf6ef] border border-growth-150 text-[#2c221a]/95 rounded-tl-none font-sans"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}

                {isAILoading && (
                  <div className="flex flex-col items-start" id="ai-typing">
                    <div className="flex items-center gap-1.5 mb-1 text-[9px] font-mono text-[#2c221a]/40 uppercase font-bold">
                      <span>Sikatuna is searching files...</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#faf6ef] border border-growth-150 rounded-tl-none flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-growth-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-1.5 h-1.5 bg-growth-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-1.5 h-1.5 bg-growth-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Suggestion Prompt list */}
              <div className="p-4 border-t border-growth-100 bg-[#faf6ef]/40 text-left">
                <span className="font-mono text-[9px] text-[#ff5722] uppercase tracking-widest block mb-2 font-bold">
                  Explore Heritage Logs:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "What is the March 1565 Blood Compact?",
                    "Tell me about traditional clay pottery.",
                    "Why is Tagbilaran a UNESCO candidate?"
                  ].map((chip) => (
                    <button
                      key={chip}
                      onClick={() => sendAIMessage(chip)}
                      disabled={isAILoading}
                      className="text-left px-2.5 py-1.5 rounded-lg border border-growth-200 bg-white text-[10px] text-growth-900 font-bold hover:text-[#ffaa00] hover:border-growth-400 hover:bg-growth-50/50 transition-all cursor-pointer disabled:pointer-events-none"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message inputs */}
              <div className="p-4 border-t border-[#2c221a]/10 bg-white">
                <form 
                  onSubmit={(e) => {
                     e.preventDefault();
                    sendAIMessage();
                  }} 
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={userQuery}
                    onChange={(e) => setUserQuery(e.target.value)}
                    placeholder="Ask about Tagbilaran City heritage..."
                    disabled={isAILoading}
                    className="flex-1 px-4 py-3 bg-[#faf6ef]/30 border border-[#2c221a]/10 hover:border-growth-300 rounded-xl text-[#2c221a] text-xs sm:text-sm placeholder:text-[#2c221a]/45 focus:outline-none focus:border-growth-500 focus:bg-white shadow-inner"
                  />
                  <button
                    type="submit"
                    disabled={isAILoading || !userQuery.trim()}
                    className="px-4 bg-growth-700 hover:bg-growth-600 text-white font-bold rounded-xl flex items-center justify-center transition-all disabled:opacity-40 disabled:hover:bg-growth-700 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
