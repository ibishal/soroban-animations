import { motion } from "motion/react";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

export default function AstBenchmarkAnimation() {
  const nodes = [
    { type: "struct", label: "Struct Def", y: 40, match: "exact" },
    { type: "fn_sig", label: "Fn Signature", y: 100, match: "exact" },
    { type: "fn_body", label: "Fn Body", y: 160, match: "partial" },
    { type: "macro", label: "Macro Call", y: 220, match: "missing" },
  ];

  const matchColors = {
    exact: "text-emerald-400 border-emerald-500/20 bg-emerald-900/10",
    partial: "text-amber-400 border-amber-500/20 bg-amber-900/10",
    missing: "text-rose-400 border-rose-500/20 bg-rose-900/10",
  };

  const matchIcons = {
    exact: CheckCircle2,
    partial: AlertCircle,
    missing: XCircle,
  };

  return (
    <div className="w-full h-96 bg-[#0A0E17] rounded-xl overflow-hidden relative flex flex-col p-10 border border-white/10 font-mono text-sm shadow-2xl">
      
      {/* Code Panels */}
      <div className="flex justify-between flex-1 relative">
        
        {/* Left: Original */}
        <div className="w-5/12 bg-[#111827] border border-white/5 rounded-xl p-5 relative shadow-lg">
          <div className="text-slate-500 text-[10px] uppercase tracking-widest mb-5 border-b border-white/5 pb-3 font-sans">Original Source</div>
          {nodes.map((node, i) => (
            <motion.div 
              key={`orig-${i}`}
              className="absolute left-5 right-5 px-4 py-2 bg-black/20 border border-white/5 rounded-lg text-slate-300 text-xs"
              style={{ top: node.y + 45 }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: i * 0.3, ease: "easeOut" }}
            >
              {node.label}
            </motion.div>
          ))}
        </div>

        {/* Center: Connecting Lines */}
        <div className="w-2/12 relative">
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {nodes.map((node, i) => (
              <motion.path
                key={`line-${i}`}
                d={`M 0 ${node.y + 60} C 40 ${node.y + 60}, 60 ${node.y + 60}, 100 ${node.y + 60}`}
                fill="none"
                stroke={node.match === "exact" ? "rgba(16,185,129,0.5)" : node.match === "partial" ? "rgba(245,158,11,0.5)" : "rgba(244,63,94,0.5)"}
                strokeWidth="1.5"
                strokeDasharray={node.match === "partial" ? "4 4" : node.match === "missing" ? "2 4" : "none"}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: i * 0.5 + 1.5, ease: "easeInOut" }}
              />
            ))}
          </svg>
        </div>

        {/* Right: Decompiled */}
        <div className="w-5/12 bg-[#111827] border border-white/5 rounded-xl p-5 relative shadow-lg">
          <div className="text-slate-500 text-[10px] uppercase tracking-widest mb-5 border-b border-white/5 pb-3 font-sans">Decompiled Output</div>
          {nodes.map((node, i) => {
            const Icon = matchIcons[node.match as keyof typeof matchIcons];
            return (
              <motion.div 
                key={`decomp-${i}`}
                className={`absolute left-5 right-5 px-4 py-2 border rounded-lg text-xs flex items-center justify-between ${matchColors[node.match as keyof typeof matchColors]}`}
                style={{ top: node.y + 45 }}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: node.match === "missing" ? 0.4 : 1, x: 0 }}
                transition={{ duration: 0.8, delay: i * 0.5 + 2, ease: "easeOut" }}
              >
                {node.label}
                <Icon className="w-4 h-4 opacity-80" strokeWidth={1.5} />
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Bottom: Score Bar */}
      <div className="mt-10 flex flex-col gap-3">
        <div className="flex justify-between text-[10px] text-slate-500 uppercase tracking-widest font-sans">
          <span>Accuracy Score</span>
          <motion.span 
            className="text-emerald-400 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 4 }}
          >
            85%
          </motion.span>
        </div>
        <div className="h-2 bg-black/50 rounded-full flex overflow-hidden border border-white/5">
          <motion.div 
            className="h-full bg-emerald-500/80"
            initial={{ width: "0%" }}
            animate={{ width: "40%" }}
            transition={{ duration: 1.5, delay: 4, ease: "easeOut" }}
            title="Types & Signatures (40%)"
          />
          <motion.div 
            className="h-full bg-amber-500/80"
            initial={{ width: "0%" }}
            animate={{ width: "45%" }}
            transition={{ duration: 1.5, delay: 5.5, ease: "easeOut" }}
            title="Bodies (45%)"
          />
          <motion.div 
            className="h-full bg-rose-500/20"
            initial={{ width: "100%" }}
            animate={{ width: "15%" }}
            transition={{ duration: 1.5, delay: 7, ease: "easeOut" }}
            title="Missing (15%)"
          />
        </div>
      </div>

    </div>
  );
}
