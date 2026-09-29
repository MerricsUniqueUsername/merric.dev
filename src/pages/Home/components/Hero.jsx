import { useState } from "react";
import { Mail, Phone, Check, Copy } from "lucide-react";

// Create background stars with random animation properties
const backgroundStars = Array.from({ length: 1200 }, (_, i) => {
  const baseOpacity = 0.05 + Math.random() * 0.1;

  return {
    id: i,
    cx: Math.random() * 1920,
    cy: Math.random() * 1080,
    r: 0.2 + Math.random() * 0.4,
    baseOpacity,
    duration: 2 + Math.random() * 4,
    delay: Math.random() * 5,
  };
});

export default function Hero() {
  const [activeInfo, setActiveInfo] = useState(null);
  const [copied, setCopied] = useState(false);

  const contactData = {
    email: "merricjustian@gmail.com",
    phone: "(734) 642-6713",
  };

  const handleToggle = (type) => {
    setActiveInfo((prev) => (prev === type ? null : type));
    setCopied(false);
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if needed
    }
  };

  return (
    <div className="h-screen min-h-dvh w-full bg-linear-to-b from-[#020205] via-[#05050c] to-[#0a0a14] flex flex-col overflow-hidden relative">
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: var(--min-opacity); }
          50% { opacity: var(--max-opacity); }
        }
        .animate-twinkle {
          animation: twinkle var(--anim-duration) ease-in-out infinite;
          animation-delay: var(--anim-delay);
          animation-fill-mode: both;
        }
        .icon-btn {
          transition: color 0.2s ease, transform 0.2s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .icon-btn:hover {
          color: #ffffff;
          transform: translateY(-1px);
        }
      `}</style>

      {/* Starfield */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <svg
          className="w-full h-full"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="none"
        >
          <g>
            {backgroundStars.map((star) => (
              <circle
                key={star.id}
                cx={star.cx}
                cy={star.cy}
                r={star.r}
                fill="#ffffff"
                opacity={star.baseOpacity}
                className="animate-twinkle"
                style={{
                  "--min-opacity": Math.max(0.01, star.baseOpacity * 0.3),
                  "--max-opacity": Math.min(0.9, star.baseOpacity * 2.5),
                  "--anim-duration": `${star.duration}s`,
                  "--anim-delay": `${star.delay}s`,
                }}
              />
            ))}
          </g>
        </svg>
      </div>

      {/* Content */}
      <div className="w-full flex flex-col md:flex-row flex-3 relative z-10 pt-10 md:pt-0">
        {/* Intro */}
        <div className="flex flex-col flex-1 justify-center items-center px-6 md:px-8 z-10">
          <div className="max-w-md text-center flex flex-col items-center">
            <h1 className="text-3xl sm:text-4xl leading-tight font-[georgia] text-slate-200">
              Hello, I'm <strong className="font-normal text-white">Merric</strong>
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
              Computer science student at Michigan Technological University
            </p>

            {/* Action Buttons */}
            <div className="flex items-center justify-center text-slate-400 mt-5 gap-5">
              {/* GitHub */}
              <a
                href="https://github.com/MerricsUniqueUsername"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="icon-btn flex items-center p-1.5 md:p-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                </svg>
              </a>

              {/* Email Toggle */}
              <button
                type="button"
                onClick={() => handleToggle("email")}
                aria-label="Toggle email"
                className={`icon-btn flex items-center p-1.5 md:p-0 ${
                  activeInfo === "email" ? "text-white" : ""
                }`}
              >
                <Mail size={19} strokeWidth={1.75} />
              </button>

              {/* Phone Toggle */}
              <button
                type="button"
                onClick={() => handleToggle("phone")}
                aria-label="Toggle phone number"
                className={`icon-btn flex items-center p-1.5 md:p-0 ${
                  activeInfo === "phone" ? "text-white" : ""
                }`}
              >
                <Phone size={19} strokeWidth={1.75} />
              </button>
            </div>

            {/* Expandable Contact Pill */}
            <div className="h-10 mt-4 flex items-center justify-center">
              {activeInfo && (
                <button
                  type="button"
                  onClick={() => handleCopy(contactData[activeInfo])}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 hover:border-slate-500 text-slate-300 hover:text-white transition-all duration-200 text-xs sm:text-sm font-mono tracking-tight shadow-lg backdrop-blur-xs cursor-pointer group"
                >
                  <span>{contactData[activeInfo]}</span>
                  {copied ? (
                    <span className="flex items-center gap-1 text-emerald-400 font-sans text-xs">
                      <Check size={14} /> Copied
                    </span>
                  ) : (
                    <Copy
                      size={14}
                      className="text-slate-500 group-hover:text-slate-300 transition-colors"
                    />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Big Dipper Constellation */}
        <div className="flex flex-row justify-center items-center flex-1 px-8 py-4 md:p-8 relative">
          <svg
            viewBox="0 0 800 450"
            className="w-full max-w-[280px] sm:max-w-xs md:max-w-200 aspect-video overflow-visible"
          >
            <defs>
              <mask id="star-gap-mask">
                <rect width="100%" height="100%" fill="white" />
                <circle cx="138" cy="362" r="8" fill="black" />
                <circle cx="214" cy="239" r="8" fill="black" />
                <circle cx="305" cy="216" r="8" fill="black" />
                <circle cx="428" cy="192" r="8" fill="black" />
                <circle cx="498" cy="266" r="8" fill="black" />
                <circle cx="662" cy="207" r="8" fill="black" />
                <circle cx="655" cy="88" r="8" fill="black" />
              </mask>
            </defs>

            {/* Constellation mapping lines */}
            <polyline
              points="138,362 214,239 305,216 428,192 655,88 662,207 498,266 428,192"
              fill="none"
              stroke="#64748b"
              strokeWidth="1.2"
              mask="url(#star-gap-mask)"
              className="opacity-25"
            />

            {/* Scaled-down Big Dipper Stars */}
            <circle fill="#ffffff" cx="138" cy="362" r="2" />
            <circle fill="#ffffff" cx="214" cy="239" r="2" />
            <circle fill="#ffffff" cx="305" cy="216" r="2.5" />
            <circle fill="#ffffff" cx="428" cy="192" r="1.5" />
            <circle fill="#ffffff" cx="498" cy="266" r="2" />
            <circle fill="#ffffff" cx="662" cy="207" r="2" />
            <circle fill="#ffffff" cx="655" cy="88" r="2.5" />
          </svg>
        </div>
      </div>

      {/* Mountains */}
      <div className="w-full h-32 md:h-auto md:flex-1 relative overflow-hidden z-20 shrink-0">
        <svg
          viewBox="0 0 1200 400"
          preserveAspectRatio="none"
          className="w-full h-full block"
        >
          {/* Background Layer */}
          <path
            d="M0,400 L0,160 L90,60 L140,110 L240,40 L350,150 L460,50 L580,130 L700,45 L820,120 L940,60 L1060,110 L1200,80 L1200,400 Z"
            fill="#0c0c16"
          />
          {/* Mid Layer */}
          <path
            d="M0,400 L0,220 L70,120 L130,190 L220,80 L300,170 L420,95 L510,210 L630,85 L740,190 L850,110 L960,170 L1080,130 L1200,170 L1200,400 Z"
            fill="#08080f"
          />
          {/* Lower Mid Layer */}
          <path
            d="M0,400 L0,280 L150,160 L320,290 L520,150 L750,280 L980,170 L1200,240 L1200,400 Z"
            fill="#05050a"
          />
          {/* Foreground Layer */}
          <path
            d="M0,400 L0,330 L220,210 L540,330 L880,210 L1200,280 L1200,400 Z"
            fill="#020204"
          />
        </svg>
      </div>
    </div>
  );
}