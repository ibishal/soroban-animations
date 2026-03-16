import { motion } from "motion/react";
import { Shield } from "lucide-react";

export default function CallGraphAnimation() {
  const nodes = [
    { id: "deployer", label: "Deployer", type: "system", x: 80, y: 150, fns: ["deploy()", "init()"] },
    { id: "contractA", label: "Contract A", type: "user", x: 300, y: 150, fns: ["swap()"] },
    { id: "tokenA", label: "Token A", type: "token", x: 550, y: 80, fns: ["transfer()", "balance()"] },
    { id: "tokenB", label: "Token B", type: "token", x: 550, y: 220, fns: ["transfer()", "balance()"] },
  ];

  const edges = [
    { from: "deployer", to: "contractA", label: "deploy", auth: true, delay: 0 },
    { from: "contractA", to: "tokenA", label: "transfer", auth: true, delay: 2 },
    { from: "contractA", to: "tokenB", label: "transfer", auth: false, delay: 3 },
  ];

  const colors = {
    system: "border-emerald-500/30 bg-emerald-900/10 text-emerald-300",
    user: "border-blue-500/30 bg-blue-900/10 text-blue-300",
    token: "border-orange-500/30 bg-orange-900/10 text-orange-300",
  };

  return (
    <div className="w-full h-96 bg-[#0A0E17] rounded-xl overflow-hidden relative border border-white/10 font-sans shadow-2xl">
      
      {/* Edges */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {edges.map((edge, i) => {
          const fromNode = nodes.find(n => n.id === edge.from)!;
          const toNode = nodes.find(n => n.id === edge.to)!;
          const pathId = `path-${i}`;
          
          return (
            <g key={i}>
              {/* Dashed Line */}
              <motion.path
                id={pathId}
                d={`M ${fromNode.x + 70} ${fromNode.y} C ${fromNode.x + 120} ${fromNode.y}, ${toNode.x - 60} ${toNode.y}, ${toNode.x - 70} ${toNode.y}`}
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: edge.delay, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
              />
              
              {/* Particle Flow */}
              <motion.circle
                r="2.5"
                fill="#818cf8"
                initial={{ offsetDistance: "0%", opacity: 0 }}
                animate={{ offsetDistance: "100%", opacity: [0, 1, 0] }}
                transition={{ duration: 2, delay: edge.delay + 0.5, repeat: Infinity, repeatDelay: 3.5, ease: "easeInOut" }}
                style={{ offsetPath: `path("M ${fromNode.x + 70} ${fromNode.y} C ${fromNode.x + 120} ${fromNode.y}, ${toNode.x - 60} ${toNode.y}, ${toNode.x - 70} ${toNode.y}")` }}
              />

              {/* Edge Label */}
              <motion.text
                x={(fromNode.x + toNode.x) / 2}
                y={(fromNode.y + toNode.y) / 2 - 12}
                fill="#64748b"
                fontSize="9"
                fontFamily="monospace"
                textAnchor="middle"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: edge.delay + 1, repeat: Infinity, repeatDelay: 4.7, ease: "easeOut" }}
              >
                {edge.label}
              </motion.text>
            </g>
          );
        })}
      </svg>

      {/* Auth Badges (HTML overlay) */}
      {edges.map((edge, i) => {
        if (!edge.auth) return null;
        const fromNode = nodes.find(n => n.id === edge.from)!;
        const toNode = nodes.find(n => n.id === edge.to)!;
        return (
          <motion.div
            key={`auth-${i}`}
            className="absolute flex items-center justify-center w-5 h-5 bg-[#0A0E17] border border-rose-500/50 rounded-full shadow-[0_0_10px_rgba(244,63,94,0.2)]"
            style={{ left: (fromNode.x + toNode.x) / 2 - 10, top: (fromNode.y + toNode.y) / 2 - 10 }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [0.5, 1.1, 1], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.5, delay: edge.delay + 1.5, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
          >
            <Shield className="w-2.5 h-2.5 text-rose-400" strokeWidth={2} />
          </motion.div>
        );
      })}

      {/* Nodes */}
      {nodes.map((node, i) => (
        <motion.div
          key={i}
          className={`absolute flex flex-col items-center justify-center w-32 h-24 border rounded-xl shadow-lg backdrop-blur-sm ${colors[node.type as keyof typeof colors]}`}
          style={{ left: node.x - 64, top: node.y - 48 }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: i * 0.5, ease: "easeOut" }}
          whileHover={{ scale: 1.05, zIndex: 10 }}
        >
          <div className="font-medium text-[11px] mb-2 text-center uppercase tracking-wider">{node.label}</div>
          <div className="flex flex-col gap-1 w-full px-3">
            {node.fns.map((fn, j) => (
              <div key={j} className="text-[9px] bg-black/30 border border-white/5 rounded px-1.5 py-0.5 font-mono truncate text-slate-400">
                {fn}
              </div>
            ))}
          </div>
        </motion.div>
      ))}

    </div>
  );
}
