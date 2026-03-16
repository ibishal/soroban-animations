import { motion } from "motion/react";

export default function HeroAnimation() {
  const hexBytes = [
    "00 61 73 6D", "01 00 00 00", "01 0C 02 60", "02 7F 7F 01",
    "7F 60 01 7F", "01 7F 03 02", "01 00 07 0A", "01 06 61 64"
  ];

  const rustTokens = [
    { text: "pub fn ", color: "#60A5FA" },
    { text: "hello", color: "#F8FAFC" },
    { text: "() {\n  ", color: "#94A3B8" },
    { text: "env", color: "#F8FAFC" },
    { text: ".", color: "#94A3B8" },
    { text: "storage", color: "#60A5FA" },
    { text: "()", color: "#94A3B8" },
    { text: ".", color: "#94A3B8" },
    { text: "get", color: "#60A5FA" },
    { text: "(", color: "#94A3B8" },
    { text: "&", color: "#F472B6" },
    { text: "key", color: "#F8FAFC" },
    { text: ");\n}", color: "#94A3B8" }
  ];

  return (
    <div className="w-full h-96 bg-[#0A0E17] rounded-xl overflow-hidden relative flex items-center justify-between p-10 border border-white/10 font-mono shadow-2xl">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      {/* Left: Hex Bytes */}
      <div className="relative z-10 flex flex-col gap-2 text-emerald-500/40 text-sm tracking-widest">
        {hexBytes.map((hex, i) => (
          <div key={i} className="relative">
            <span>{hex}</span>
            <motion.div
              className="absolute inset-0 bg-emerald-400/20 mix-blend-overlay"
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: "100%", opacity: [0, 1, 0] }}
              transition={{ duration: 3, delay: i * 0.1, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        ))}
      </div>

      {/* Center: Prism & Particles */}
      <div className="relative z-10 flex items-center justify-center w-32 h-32">
        <motion.div
          className="absolute w-16 h-16 border border-indigo-500/50 rotate-45"
          animate={{ rotate: [45, 225] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-12 h-12 border border-indigo-400/30 rotate-45 bg-indigo-500/5 backdrop-blur-sm"
          animate={{ rotate: [45, -315] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-indigo-400 rounded-full shadow-[0_0_8px_#818cf8]"
            initial={{ x: -80, y: (i - 2.5) * 10, opacity: 0 }}
            animate={{ x: 80, opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Right: Rust Code */}
      <div className="relative z-10 bg-[#111827]/80 p-6 rounded-lg border border-white/5 shadow-xl w-72 backdrop-blur-md">
        <div className="flex flex-wrap leading-relaxed text-sm">
          {rustTokens.map((token, i) => (
            <motion.span
              key={i}
              style={{ color: token.color, whiteSpace: "pre" }}
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 4, delay: i * 0.1, repeat: Infinity, ease: "easeInOut" }}
            >
              {token.text}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}
