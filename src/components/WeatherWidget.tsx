import { useState, useEffect } from "react";
import { CloudSun, Clock, Wind, Droplets, AlertCircle, RefreshCw, Radio } from "lucide-react";
import { LocalStatusResponse } from "../types";

export default function WeatherWidget() {
  const [status, setStatus] = useState<LocalStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState<string>("");

  const fetchStatus = async () => {
    try {
      const res = await fetch("/api/local-status");
      if (res.ok) {
        const data: LocalStatusResponse = await res.json();
        setStatus(data);
        setCurrentTime(data.time);
      }
    } catch (e) {
      console.warn("Could not fetch Tagbilaran status API. Falling back to default values.", e);
      // Beautiful default values matching Manila/Tagbilaran conditions
      const defaultTime = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "Asia/Manila"
      }).format(new Date());

      setStatus({
        time: defaultTime,
        timezone: "PST (UTC+8)",
        weather: {
          temperature: 31,
          humidity: 74,
          condition: "Gentle Coastal Breeze",
          description: "Partly cloudy with warm tropical golden sunlight",
          windSpeed: "12 km/h"
        },
        alerts: [
          {
            id: "default-alert-1",
            title: "UNESCO Nomination",
            date: "Live Updates",
            category: "Milestone",
            description: "Tagbilaran Crafts & Folk Art portfolio evaluated by NCCA for UNESCO Creative Cities nomination.",
            status: "active"
          },
          {
            id: "default-alert-2",
            title: "Artisan Sync",
            date: "Active",
            category: "Cultural",
            description: "Dampas Community pottery workshop hosting masterclay sculptors.",
            status: "active"
          }
        ]
      });
      setCurrentTime(defaultTime);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    // Clock tick interval
    const clockInterval = setInterval(() => {
      const t = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "Asia/Manila"
      }).format(new Date());
      setCurrentTime(t);
    }, 1000);

    // Weather polling interval
    const weatherInterval = setInterval(fetchStatus, 30000);

    return () => {
      clearInterval(clockInterval);
      clearInterval(weatherInterval);
    };
  }, []);

  return (
    <div 
      id="local-telemetry-widget"
      className="p-8 rounded-2xl border border-friendship-600/10 bg-white shadow-xl relative overflow-hidden flex flex-col justify-between h-full"
    >
      {/* Absolute vector details */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-friendship-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-peace-500/10 blur-3xl pointer-events-none" />

      {/* Header telemetry node */}
      <div className="flex items-center justify-between mb-6" id="widget-header">
        <div className="flex items-center gap-2">
          <Radio className="w-3 text-friendship-600 animate-ping" />
          <span className="font-mono text-[9px] uppercase tracking-widest text-friendship-700 font-bold">
            Live Coastal Dispatch
          </span>
        </div>
        <button 
          onClick={fetchStatus} 
          className="text-friendship-700 hover:text-friendship-900 transition-colors p-1 rounded hover:bg-friendship-50"
          id="widget-refresh-btn"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-8 gap-3" id="widget-loading-box">
          <div className="w-6 h-6 rounded-full border border-friendship-500/30 border-t-friendship-600 animate-spin" />
          <span className="font-mono text-[10px] text-gray-500 uppercase tracking-wider font-bold">Acquiring Bohol Straits Link...</span>
        </div>
      ) : (
        <div className="flex flex-col gap-6" id="widget-active-content">
          {/* Main Weather & Temperature block */}
          <div className="flex items-start justify-between">
            <div className="flex flex-col text-left">
              <span className="font-mono font-bold text-[10px] uppercase text-peace-700 tracking-wider">
                {status?.weather.condition || "Coastal Weather"}
              </span>
              <span className="font-display text-4xl font-black text-friendship-900 tracking-tight mt-1.5">
                {status?.weather.temperature || 31}°C
              </span>
              <span className="font-sans text-xs text-friendship-900/70 mt-1">
                {status?.weather.description || "Warm Tropical Golden Sky"}
              </span>
            </div>
            <div className="p-3 bg-friendship-50 border border-friendship-100 rounded-xl text-friendship-600">
              <CloudSun className="w-8 h-8" />
            </div>
          </div>

          {/* Time and Climate metrics */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-charcoal-100 border border-friendship-600/5">
              <div className="flex items-center gap-1.5 text-[9px] text-friendship-900/60 uppercase font-mono font-bold">
                <Clock className="w-3.5 h-3.5 text-friendship-600" />
                <span>Local Time</span>
              </div>
              <p className="font-mono text-xs font-bold text-friendship-900 mt-1 select-all whitespace-nowrap overflow-hidden text-left">
                {currentTime.split(" ")[0]} 
                <span className="text-[10px] font-bold text-friendship-600 ml-0.5">
                  {currentTime.split(" ")[1] || ""}
                </span>
              </p>
            </div>

            <div className="p-3 rounded-xl bg-charcoal-100 border border-friendship-600/5">
              <div className="flex items-center gap-1.5 text-[9px] text-friendship-900/60 uppercase font-mono font-bold">
                <Wind className="w-3.5 h-3.5 text-peace-600" />
                <span>Breeze</span>
              </div>
              <p className="font-mono text-xs font-bold text-friendship-900 mt-1 text-left">
                {status?.weather.windSpeed || "12 km/h"}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-charcoal-100 border border-friendship-600/5">
              <div className="flex items-center gap-1.5 text-[9px] text-friendship-900/60 uppercase font-mono font-bold">
                <Droplets className="w-3.5 h-3.5 text-blue-500" />
                <span>Humidity</span>
              </div>
              <p className="font-mono text-xs font-bold text-friendship-900 mt-1 text-left">
                {status?.weather.humidity || 74}%
              </p>
            </div>
          </div>

          {/* Sikatuna broadcast marquee */}
          {status?.alerts && status.alerts.length > 0 && (
            <div className="border-t border-friendship-600/10 pt-4" id="widget-alert-feed">
              <span className="font-mono text-[9px] uppercase tracking-widest text-friendship-900/60 block mb-2 text-left font-bold">
                Artisanal Cultural Dispatch:
              </span>
              <div className="flex flex-col gap-2.5">
                {status.alerts.map((alert, i) => (
                  <div key={alert.id || i} className="flex gap-2.5 items-start text-xs bg-friendship-50/50 border border-friendship-500/10 rounded-xl p-3.5 hover:bg-friendship-50/80 transition-colors text-left">
                    <div className="p-1 rounded bg-friendship-500/10 text-friendship-600 mt-0.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-display font-bold text-friendship-900 truncate">{alert.title}</span>
                        <span className="font-mono text-[9px] uppercase font-bold text-friendship-600 shrink-0">
                          {alert.category}
                        </span>
                      </div>
                      <p className="text-friendship-900/60 text-[11px] leading-snug mt-1">{alert.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
