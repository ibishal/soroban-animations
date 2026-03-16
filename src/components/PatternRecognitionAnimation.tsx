import { motion } from "motion/react";
import { ArrowRight, ScanLine } from "lucide-react";

export default function PatternRecognitionAnimation() {
  const patterns = [
    {
      calls: [
        "symbol_new_from_linear_memory(\"COUNTER\")",
        "get_contract_data(symbol, Instance)",
        "obj_to_u64(result)"
      ],
      sdk: "env.storage().instance().get(&symbol_short!(\"COUNTER\"))",
      label: "Storage Read Pattern"
    },
    {
      calls: [
        "require_auth(addr)"
      ],
      sdk: "addr.require_auth()",
      label: "Auth Pattern"
    },
    {
      calls: [
        "contract_event(topics, data)"
      ],
      sdk: "env.events().publish(topics, data)",
      label: "Event Pattern"
    }
  ];

  return (
    <div className="w-full h-96 bg-[#0A0E17] rounded-xl overflow-hidden relative flex flex-col p-10 border border-white/10 font-mono text-sm shadow-2xl">
      
      {/* Header */}
      <div className="flex justify-between w-full mb-8 text-slate-500 text-[10px] uppercase tracking-widest border-b border-white/5 pb-3 font-sans">
        <div className="w-5/12">Host Call Sequence</div>
        <div className="w-2/12 text-center">Match</div>
        <div className="w-5/12">SDK Method Chain</div>
      </div>

      {/* Patterns */}
      <div className="flex flex-col gap-10 flex-1 relative">
        {patterns.map((pattern, i) => (
          <div key={i} className="flex items-center justify-between relative">
            
            {/* Left: Host Calls */}
            <div className="w-5/12 flex flex-col gap-1.5 relative">
              {pattern.calls.map((call, j) => (
                <motion.div
                  key={j}
                  className="px-4 py-2 bg-[#111827] border border-white/5 rounded text-slate-400 text-xs"
                  initial={{ opacity: 0.3, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: i * 3 + j * 0.2, repeat: Infinity, repeatDelay: patterns.length * 3 - 0.8, ease: "easeOut" }}
                >
                  {call}
                </motion.div>
              ))}

              {/* Bracket / Scanner */}
              <motion.div
                className="absolute -left-3 top-0 bottom-0 w-2 border-l-2 border-y-2 border-indigo-500/50 rounded-l"
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: [0, 1, 1, 0], scaleY: [0, 1, 1, 0] }}
                transition={{ duration: 2, delay: i * 3 + pattern.calls.length * 0.2, repeat: Infinity, repeatDelay: patterns.length * 3 - 2, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute inset-0 bg-indigo-500/5 pointer-events-none rounded"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, delay: i * 3 + pattern.calls.length * 0.2 + 0.5, repeat: Infinity, repeatDelay: patterns.length * 3 - 1, ease: "easeInOut" }}
              />
            </div>

            {/* Center: Arrow & Label */}
            <motion.div
              className="w-2/12 flex flex-col items-center justify-center text-indigo-400/80"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: [0, 1, 1, 0], scale: [0.9, 1, 1, 0.9] }}
              transition={{ duration: 1.5, delay: i * 3 + pattern.calls.length * 0.2 + 0.5, repeat: Infinity, repeatDelay: patterns.length * 3 - 1.5, ease: "easeOut" }}
            >
              <div className="text-[9px] uppercase tracking-widest mb-2 font-sans">{pattern.label}</div>
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </motion.div>

            {/* Right: SDK Method */}
            <motion.div
              className="w-5/12 px-5 py-3.5 bg-emerald-900/10 border border-emerald-500/20 rounded-lg text-emerald-400/90 shadow-lg text-xs"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: [0, 1, 1, 0], x: [10, 0, 0, 10] }}
              transition={{ duration: 1.5, delay: i * 3 + pattern.calls.length * 0.2 + 0.8, repeat: Infinity, repeatDelay: patterns.length * 3 - 1.5, ease: "easeOut" }}
            >
              {pattern.sdk}
            </motion.div>

          </div>
        ))}

        {/* Scanning Line */}
        <motion.div
          className="absolute left-0 right-0 h-px bg-indigo-500/50 shadow-[0_0_15px_#6366f1] z-10"
          initial={{ top: 0, opacity: 0 }}
          animate={{ top: "100%", opacity: [0, 1, 1, 0] }}
          transition={{ duration: patterns.length * 3, repeat: Infinity, ease: "linear" }}
        >
          <ScanLine className="absolute -left-8 -top-2.5 w-5 h-5 text-indigo-400/50" strokeWidth={1.5} />
        </motion.div>
      </div>

    </div>
  );
}
