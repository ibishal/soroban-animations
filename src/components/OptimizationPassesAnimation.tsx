import { motion } from "motion/react";
import { ArrowRight, Trash2, Merge, ShieldOff, Replace, ArrowUp } from "lucide-react";

export default function OptimizationPassesAnimation() {
  const passes = [
    { name: "CSE", icon: Merge, desc: "Common Subexpression" },
    { name: "DCE", icon: Trash2, desc: "Dead Code" },
    { name: "i128", icon: Merge, desc: "Collapse carry-chain" },
    { name: "Guard", icon: ShieldOff, desc: "Remove always-true" },
    { name: "Identity", icon: Replace, desc: "Remove let x = y" },
    { name: "Hoist", icon: ArrowUp, desc: "Move bindings" },
  ];

  const codeStates = [
    { lines: ["let a = env.get();", "let b = env.get();", "let c = a + b;", "if true {", "  let d = c;", "  return d;", "}"], count: 34 },
    { lines: ["let a = env.get();", "let c = a + a;", "if true {", "  let d = c;", "  return d;", "}"], count: 28 },
    { lines: ["let a = env.get();", "let c = a + a;", "if true {", "  let d = c;", "  return d;", "}"], count: 24 }, // DCE
    { lines: ["let a = env.get();", "let c = a + a;", "if true {", "  let d = c;", "  return d;", "}"], count: 20 }, // i128
    { lines: ["let a = env.get();", "let c = a + a;", "let d = c;", "return d;"], count: 16 }, // Guard
    { lines: ["let a = env.get();", "let c = a + a;", "return c;"], count: 14 }, // Identity
    { lines: ["let a = env.get();", "return a + a;"], count: 12 }, // Hoist
  ];

  return (
    <div className="w-full h-96 bg-[#0A0E17] rounded-xl overflow-hidden relative flex flex-col p-10 border border-white/10 font-sans shadow-2xl">
      
      {/* Conveyor Belt */}
      <div className="absolute top-1/2 left-0 right-0 h-20 -translate-y-1/2 bg-[#111827]/50 border-y border-white/5 flex items-center justify-between px-16">
        {/* Belt Texture */}
        <motion.div 
          className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 20px, #ffffff 20px, #ffffff 40px)' }}
          animate={{ backgroundPositionX: ["0px", "-40px"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Stations */}
        {passes.map((pass, i) => (
          <div key={i} className="relative z-10 flex flex-col items-center">
            <motion.div 
              className="w-12 h-12 bg-[#0A0E17] border border-white/10 rounded-full flex items-center justify-center shadow-lg"
              animate={{ 
                borderColor: ["rgba(255,255,255,0.1)", "rgba(99,102,241,0.5)", "rgba(255,255,255,0.1)"],
                boxShadow: ["0 0 0px rgba(99,102,241,0)", "0 0 20px rgba(99,102,241,0.2)", "0 0 0px rgba(99,102,241,0)"]
              }}
              transition={{ duration: 3, delay: i * 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <pass.icon className="w-5 h-5 text-indigo-400/80" strokeWidth={1.5} />
            </motion.div>
            <div className="absolute top-14 text-[9px] text-slate-500 font-medium uppercase tracking-widest whitespace-nowrap">{pass.name}</div>
          </div>
        ))}
      </div>

      {/* Traveling Code Block */}
      <motion.div 
        className="absolute top-1/2 -translate-y-1/2 w-56 bg-[#0B0F19] border border-indigo-500/30 rounded-xl p-4 shadow-[0_0_30px_rgba(99,102,241,0.1)] font-mono text-[10px] text-slate-300 z-20"
        initial={{ left: "-25%" }}
        animate={{ left: "125%" }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <div className="flex justify-between items-center mb-3 border-b border-white/5 pb-2">
          <span className="text-indigo-400/80 font-sans text-[10px] uppercase tracking-widest font-medium">IR Block</span>
          <motion.span 
            className="text-emerald-400/80 font-sans text-[9px] uppercase tracking-wider"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          >
            Optimizing
          </motion.span>
        </div>
        <div className="flex flex-col gap-1.5">
          {codeStates[0].lines.map((line, i) => (
            <motion.div 
              key={i}
              animate={{ 
                opacity: i > 2 ? [1, 0, 0] : 1, 
                height: i > 2 ? ["auto", "0px", "0px"] : "auto",
                color: i > 2 ? ["#cbd5e1", "#f43f5e", "#f43f5e"] : "#cbd5e1"
              }}
              transition={{ duration: 15, times: [0, 0.4, 1], repeat: Infinity, ease: "easeInOut" }}
              className="overflow-hidden whitespace-nowrap"
            >
              {line}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Line Count Indicator */}
      <div className="absolute bottom-10 right-10 flex items-center gap-5 bg-[#111827] border border-white/5 rounded-full px-6 py-2.5 shadow-xl">
        <span className="text-rose-400/90 font-mono text-xs">34 lines</span>
        <ArrowRight className="w-4 h-4 text-slate-600" strokeWidth={1.5} />
        <span className="text-emerald-400/90 font-mono text-xs font-medium">12 lines</span>
      </div>

    </div>
  );
}
