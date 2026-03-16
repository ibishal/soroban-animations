import { motion } from "motion/react";
import { Search } from "lucide-react";

export default function ValEncodingAnimation() {
  const rawOps = [
    "value >> 32",
    "value & 0xFF",
    "result << 8 | 0x04"
  ];

  const cleanVals = [
    "count: u32",
    "symbol_short!(\"KEY\")",
    "true"
  ];

  return (
    <div className="w-full h-96 bg-[#0A0E17] rounded-xl overflow-hidden relative flex flex-col items-center justify-between p-10 border border-white/10 font-mono shadow-2xl">
      
      {/* Top: Raw Ops */}
      <div className="flex gap-6 w-full justify-center relative z-10">
        {rawOps.map((op, i) => (
          <motion.div
            key={i}
            className="px-5 py-2.5 bg-[#111827] border border-white/10 rounded-lg text-slate-400 text-xs shadow-lg"
            animate={{ y: [0, 5, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 4, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
          >
            {op}
          </motion.div>
        ))}
      </div>

      {/* Center: Decoder Lens */}
      <div className="relative flex items-center justify-center w-full h-32 my-6">
        {/* Scanning beam */}
        <motion.div
          className="absolute w-full h-px bg-indigo-500/50"
          animate={{ scaleY: [1, 10, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <div className="w-72 h-16 border border-indigo-500/30 rounded-full bg-[#0A0E17]/80 flex items-center justify-center backdrop-blur-md shadow-[0_0_30px_rgba(99,102,241,0.1)] relative z-10">
          <Search className="w-5 h-5 text-indigo-400/70 mr-3" strokeWidth={1.5} />
          <span className="text-indigo-300/80 text-[10px] tracking-[0.2em] uppercase font-sans">Decoder Lens</span>
          
          {/* Lens reflection */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
        </div>

        {/* Bits falling */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-[10px] text-slate-600/50 font-mono"
              initial={{ y: -20, x: (Math.random() - 0.5) * 300, opacity: 0 }}
              animate={{ y: 120, opacity: [0, 1, 0] }}
              transition={{ duration: 2, delay: Math.random() * 3, repeat: Infinity, ease: "linear" }}
            >
              {Math.random() > 0.5 ? "1" : "0"}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom: Clean Rust Values */}
      <div className="flex gap-6 w-full justify-center relative z-10">
        {cleanVals.map((val, i) => (
          <motion.div
            key={i}
            className="px-5 py-2.5 bg-emerald-900/10 border border-emerald-500/20 rounded-lg text-emerald-400/90 text-xs font-medium shadow-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: [0, 1, 1, 0], y: [0, 10, 10, 0] }}
            transition={{ duration: 4, delay: i * 1.3, repeat: Infinity, ease: "easeInOut" }}
          >
            {val}
          </motion.div>
        ))}
      </div>

      {/* Tag Legend */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 text-[10px] text-slate-500 border-l border-white/5 pl-5 font-sans">
        <div className="text-slate-400 mb-2 uppercase tracking-widest font-medium">Val Tags</div>
        <div className="flex justify-between gap-4"><span>0</span><span>False</span></div>
        <div className="flex justify-between gap-4"><span>1</span><span>True</span></div>
        <div className="flex justify-between gap-4"><span>2</span><span>Void</span></div>
        <div className="flex justify-between gap-4"><span>4</span><span>U32</span></div>
        <div className="flex justify-between gap-4"><span>5</span><span>I32</span></div>
        <div className="flex justify-between gap-4"><span>6</span><span>U64</span></div>
        <div className="flex justify-between gap-4"><span>14</span><span>Symbol</span></div>
      </div>

    </div>
  );
}
