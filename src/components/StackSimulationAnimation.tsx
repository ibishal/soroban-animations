import { motion } from "motion/react";

export default function StackSimulationAnimation() {
  const instructions = [
    "local.get 0",
    "i64.const 201326592",
    "call $b.j",
    "local.set 3",
    "local.get 3",
    "i64.const 2",
    "call $a.0"
  ];

  const stackStates = [
    [{ label: "Param(0)", color: "border-blue-500/30 text-blue-300" }],
    [{ label: "Param(0)", color: "border-blue-500/30 text-blue-300" }, { label: "Const(201326592)", color: "border-slate-500/30 text-slate-300" }],
    [{ label: "CallResult(0)", color: "border-amber-500/30 text-amber-300" }],
    [],
    [{ label: "Local(3)", color: "border-emerald-500/30 text-emerald-300" }],
    [{ label: "Local(3)", color: "border-emerald-500/30 text-emerald-300" }, { label: "Const(2)", color: "border-slate-500/30 text-slate-300" }],
    [{ label: "CallResult(1)", color: "border-amber-500/30 text-amber-300" }]
  ];

  const resolvedOutputs = [
    "",
    "",
    "symbol_short!(\"COUNTER\")",
    "",
    "",
    "",
    "env.storage().instance().get(&key)"
  ];

  return (
    <div className="w-full h-96 bg-[#0A0E17] rounded-xl overflow-hidden relative flex items-center justify-between p-10 border border-white/10 font-mono text-sm shadow-2xl">
      
      {/* Left: Instructions */}
      <div className="flex flex-col gap-1.5 w-1/3 relative">
        <div className="text-slate-500 mb-4 text-[10px] uppercase tracking-widest font-sans">WASM Instructions</div>
        {instructions.map((inst, i) => (
          <div key={i} className="relative">
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-0.5 bg-indigo-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, delay: i * 1.5, repeat: Infinity, repeatDelay: instructions.length * 1.5 - 1.5, ease: "easeInOut" }}
            />
            <motion.div
              className="px-4 py-2 rounded-r bg-[#111827] border border-white/5 text-slate-400 text-xs"
              animate={{
                backgroundColor: ["#111827", "#1e293b", "#111827"],
                color: ["#94a3b8", "#e2e8f0", "#94a3b8"]
              }}
              transition={{ duration: 1.5, delay: i * 1.5, repeat: Infinity, repeatDelay: instructions.length * 1.5 - 1.5, ease: "easeInOut" }}
            >
              {inst}
            </motion.div>
          </div>
        ))}
      </div>

      {/* Center: Stack */}
      <div className="flex flex-col justify-end items-center w-1/3 h-64 border-x border-white/5 bg-[#0B0F19] relative">
        <div className="absolute top-0 text-slate-500 text-[10px] uppercase tracking-widest font-sans">Operand Stack</div>
        <div className="flex flex-col-reverse gap-2 w-40 pb-6 relative h-full justify-start">
          {stackStates.map((state, i) => (
            <motion.div
              key={i}
              className="absolute bottom-6 flex flex-col-reverse gap-2 w-full"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: [0, 1, 0], y: [10, 0, 0] }}
              transition={{ duration: 1.5, delay: i * 1.5, repeat: Infinity, repeatDelay: instructions.length * 1.5 - 1.5, ease: "easeInOut" }}
            >
              {state.map((chip, j) => (
                <div
                  key={j}
                  className={`px-3 py-2 rounded bg-[#111827] border ${chip.color} text-xs text-center shadow-lg`}
                >
                  {chip.label}
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right: Resolved Output */}
      <div className="flex flex-col gap-2 w-1/3 pl-10">
        <div className="text-slate-500 mb-4 text-[10px] uppercase tracking-widest font-sans">Resolved Meaning</div>
        <div className="relative h-full">
          {resolvedOutputs.map((output, i) => (
            output && (
              <motion.div
                key={i}
                className="absolute top-1/2 -translate-y-1/2 text-emerald-400/90 font-medium text-xs bg-emerald-900/10 px-4 py-2 rounded border border-emerald-500/20 w-full"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: [0, 1, 1, 0], x: [-10, 0, 0, 10] }}
                transition={{ duration: 3, delay: i * 1.5, repeat: Infinity, repeatDelay: instructions.length * 1.5 - 3, ease: "easeInOut" }}
              >
                {output}
              </motion.div>
            )
          ))}
        </div>
      </div>

    </div>
  );
}
