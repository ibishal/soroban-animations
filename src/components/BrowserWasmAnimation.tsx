import { motion } from "motion/react";
import { Server, Globe, FileCode, CheckCircle2, X } from "lucide-react";

export default function BrowserWasmAnimation() {
  return (
    <div className="w-full h-96 bg-[#0A0E17] rounded-xl overflow-hidden relative flex items-center justify-center p-10 border border-white/10 font-sans shadow-2xl">
      
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Main Container */}
      <div className="flex items-center justify-between w-full max-w-3xl relative z-10">
        
        {/* Left: Browser Window */}
        <motion.div 
          className="w-2/3 bg-[#111827] border border-white/10 rounded-xl shadow-2xl overflow-hidden relative"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Browser Chrome */}
          <div className="h-10 bg-[#0A0E17] border-b border-white/5 flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <div className="ml-6 px-4 py-1.5 bg-black/40 rounded-md text-[10px] text-slate-400 font-mono flex items-center gap-2 border border-white/5 w-64">
              <Globe className="w-3 h-3 opacity-50" />
              localhost:3000
            </div>
          </div>

          {/* Browser Content */}
          <div className="p-8 flex flex-col items-center justify-center min-h-[220px] relative">
            
            {/* WASM Module Icon */}
            <motion.div
              className="w-16 h-16 bg-indigo-900/20 border border-indigo-500/30 rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.1)] mb-5 relative"
              animate={{ rotate: [0, 90, 180, 270, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <FileCode className="w-8 h-8 text-indigo-400/80" strokeWidth={1.5} />
              
              {/* Processing Arc */}
              <motion.svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                <motion.circle
                  cx="50" cy="50" r="46"
                  fill="none"
                  stroke="rgba(129,140,248,0.5)"
                  strokeWidth="2"
                  strokeDasharray="289"
                  initial={{ strokeDashoffset: 289 }}
                  animate={{ strokeDashoffset: [289, 0, 289] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.svg>
            </motion.div>

            <div className="text-indigo-300/70 font-mono text-[10px] mb-3 tracking-widest uppercase">Decompiling 2.5MB WASM...</div>
            
            {/* Output Text */}
            <motion.div 
              className="w-full h-24 bg-[#0A0E17] border border-white/5 rounded-lg p-4 font-mono text-[11px] text-emerald-400/90 overflow-hidden shadow-inner"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: -30 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="leading-relaxed"
              >
                pub fn hello() {'{\n'}
                {'  '}env.storage().get(&key);{'\n'}
                {'  '}// ...{'\n'}
                {'}'}
              </motion.div>
            </motion.div>

          </div>
        </motion.div>

        {/* Right: Server Rack (Crossed Out) */}
        <div className="w-1/4 flex flex-col items-center justify-center relative pl-8">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 0.4, x: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
          >
            <Server className="w-20 h-20 text-slate-500" strokeWidth={1.5} />
            
            {/* Red X Overlay */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.8, type: "spring", bounce: 0.4 }}
            >
              <X className="w-28 h-28 text-rose-500 drop-shadow-[0_0_15px_rgba(244,63,94,0.3)]" strokeWidth={2} />
            </motion.div>
          </motion.div>

          {/* Badge */}
          <motion.div
            className="mt-8 px-4 py-2 bg-emerald-900/20 border border-emerald-500/30 rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.5, ease: "easeOut" }}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" strokeWidth={2} />
            <span className="text-emerald-400 text-[10px] font-medium uppercase tracking-widest">100% Client-Side</span>
          </motion.div>
          
          <motion.div
            className="mt-3 text-[10px] text-slate-500 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 3 }}
          >
            &lt; 1s processing
          </motion.div>
        </div>

      </div>

    </div>
  );
}
