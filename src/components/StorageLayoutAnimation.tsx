import { motion } from "motion/react";
import { Clock, Database, Hourglass, Zap } from "lucide-react";

export default function StorageLayoutAnimation() {
  const layers = [
    { name: "Instance", icon: Zap, color: "emerald", entries: ["COUNTER: u32", "ADMIN: Address"] },
    { name: "Persistent", icon: Database, color: "blue", entries: ["Balance: Map<Address, i128>"] },
    { name: "Temporary", icon: Hourglass, color: "slate", entries: ["Session: Data"] },
  ];

  const colors = {
    emerald: "border-emerald-500/20 bg-emerald-900/5 text-emerald-400",
    blue: "border-blue-500/20 bg-blue-900/5 text-blue-400",
    slate: "border-slate-500/20 bg-slate-900/5 text-slate-400",
  };

  return (
    <div className="w-full h-96 bg-[#0A0E17] rounded-xl overflow-hidden relative flex p-10 border border-white/10 font-mono text-sm shadow-2xl">
      
      {/* Left: Functions */}
      <div className="w-1/3 flex flex-col justify-center gap-10 pr-10 border-r border-white/5 relative z-10">
        <motion.div 
          className="px-5 py-3 bg-[#111827] border border-white/10 rounded-lg text-slate-300 shadow-lg relative text-xs"
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          increment()
          {/* Read/Write Beams */}
          <motion.div 
            className="absolute top-1/2 -right-10 h-px bg-gradient-to-r from-emerald-500 to-transparent"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 120, opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
          />
        </motion.div>
        
        <motion.div 
          className="px-5 py-3 bg-[#111827] border border-white/10 rounded-lg text-slate-300 shadow-lg relative text-xs"
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 2, ease: "easeInOut" }}
        >
          init()
          <motion.div 
            className="absolute top-1/2 -right-10 h-px bg-gradient-to-r from-blue-500 to-transparent"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 120, opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 2.5, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      {/* Right: Storage Layers */}
      <div className="w-2/3 flex flex-col gap-5 pl-10 justify-center">
        {layers.map((layer, i) => (
          <motion.div
            key={i}
            className={`flex flex-col p-4 border rounded-xl relative overflow-hidden backdrop-blur-sm ${colors[layer.color as keyof typeof colors]}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: i * 0.3, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="flex items-center gap-2 mb-3 font-sans font-medium text-[10px] uppercase tracking-widest">
              <layer.icon className="w-3.5 h-3.5 opacity-70" strokeWidth={2} />
              {layer.name}
            </div>

            {/* Entries */}
            <div className="flex flex-col gap-2">
              {layer.entries.map((entry, j) => (
                <div key={j} className="flex items-center justify-between bg-black/40 border border-white/5 px-4 py-2 rounded-lg text-[11px] relative">
                  <span className="text-slate-300">{entry}</span>
                  
                  {/* TTL Bar */}
                  <div className="flex items-center gap-2 w-1/3">
                    <Clock className="w-3 h-3 opacity-40 text-slate-400" />
                    <div className="h-1 bg-white/5 rounded-full flex-1 overflow-hidden">
                      <motion.div 
                        className={`h-full bg-${layer.color}-500/70`}
                        initial={{ width: "100%" }}
                        animate={{ width: ["100%", "20%", "100%"] }}
                        transition={{ duration: 6, delay: i * 1.5 + j * 0.5, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </div>
                  </div>

                  {/* Highlight overlay on access */}
                  <motion.div 
                    className="absolute inset-0 bg-white/5 rounded-lg pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, delay: i === 0 ? 1.5 : 3.5, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
