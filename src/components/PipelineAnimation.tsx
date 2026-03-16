import { motion } from "motion/react";
import { FileCode, Layers, Puzzle, Settings, FileJson } from "lucide-react";

export default function PipelineAnimation() {
  const stages = [
    { title: "Spec Extraction", icon: FileJson, output: "ScSpecEntry[]" },
    { title: "Stack Simulation", icon: Layers, output: "AnalyzedModule" },
    { title: "Pattern Recognition", icon: Puzzle, output: "FunctionIR[]" },
    { title: "Code Generation", icon: Settings, output: "String" },
  ];

  return (
    <div className="w-full h-96 bg-[#0A0E17] rounded-xl overflow-hidden relative flex items-center justify-center p-8 border border-white/10 font-sans shadow-2xl">
      
      {/* Input */}
      <div className="absolute left-8 flex flex-col items-center text-slate-500 text-xs font-mono">
        <FileCode className="w-8 h-8 text-slate-400 mb-3" strokeWidth={1.5} />
        .wasm
      </div>

      {/* Pipeline */}
      <div className="flex items-center z-10 ml-20 mr-20 w-full justify-between">
        {stages.map((stage, i) => (
          <div key={i} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center relative">
              <motion.div 
                className="w-28 h-24 bg-[#111827] border border-white/10 rounded-xl flex flex-col items-center justify-center p-3 shadow-lg relative overflow-hidden"
                initial={{ borderColor: "rgba(255,255,255,0.1)" }}
                animate={{ borderColor: ["rgba(255,255,255,0.1)", "rgba(99,102,241,0.5)", "rgba(255,255,255,0.1)"] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 1, ease: "easeInOut" }}
              >
                <stage.icon className="w-6 h-6 text-indigo-400/80 mb-3" strokeWidth={1.5} />
                <span className="text-[10px] text-slate-300 text-center font-medium uppercase tracking-wider">{stage.title}</span>
                
                {/* Subtle progress indicator */}
                <motion.div 
                  className="absolute bottom-0 left-0 h-0.5 bg-indigo-500/50"
                  initial={{ width: "0%" }}
                  animate={{ width: ["0%", "100%", "100%", "0%"] }}
                  transition={{ duration: 4, repeat: Infinity, delay: i * 1, ease: "easeInOut", times: [0, 0.4, 0.8, 1] }}
                />
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-8 px-2 py-1 bg-[#0A0E17] rounded text-[10px] font-mono text-emerald-400/80 border border-white/5 whitespace-nowrap"
                initial={{ opacity: 0.3 }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 1 + 0.5, ease: "easeInOut" }}
              >
                {stage.output}
              </motion.div>
            </div>

            {/* Connecting Arrow */}
            {i < stages.length - 1 && (
              <div className="flex-1 h-px bg-white/10 relative mx-4">
                <motion.div 
                  className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-indigo-400 rounded-full"
                  initial={{ left: "0%", opacity: 0 }}
                  animate={{ left: "100%", opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 1 + 0.5, ease: "easeInOut" }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Output */}
      <div className="absolute right-8 flex flex-col items-center text-slate-500 text-xs font-mono">
        <FileCode className="w-8 h-8 text-emerald-500/80 mb-3" strokeWidth={1.5} />
        .rs
      </div>

    </div>
  );
}
