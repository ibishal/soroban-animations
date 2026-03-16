import HeroAnimation from './components/HeroAnimation';
import PipelineAnimation from './components/PipelineAnimation';
import StackSimulationAnimation from './components/StackSimulationAnimation';
import ValEncodingAnimation from './components/ValEncodingAnimation';
import PatternRecognitionAnimation from './components/PatternRecognitionAnimation';
import CallGraphAnimation from './components/CallGraphAnimation';
import StorageLayoutAnimation from './components/StorageLayoutAnimation';
import AstBenchmarkAnimation from './components/AstBenchmarkAnimation';
import BrowserWasmAnimation from './components/BrowserWasmAnimation';
import OptimizationPassesAnimation from './components/OptimizationPassesAnimation';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 p-8 md:p-16 font-sans selection:bg-indigo-500/30">
      <div className="max-w-5xl mx-auto space-y-24">
        <header className="text-center mb-24 pt-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Soroban Decompiler</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light">
            A visual exploration of the WASM to Rust decompilation pipeline.
          </p>
        </header>

        {[
          { title: "1. WASM Binary to Rust Source", component: HeroAnimation },
          { title: "2. Four-Stage Pipeline", component: PipelineAnimation },
          { title: "3. Stack Simulation Engine", component: StackSimulationAnimation },
          { title: "4. Val Encoding Strip", component: ValEncodingAnimation },
          { title: "5. Pattern Recognition Mapping", component: PatternRecognitionAnimation },
          { title: "6. Cross-Contract Call Graph", component: CallGraphAnimation },
          { title: "7. Storage Layout", component: StorageLayoutAnimation },
          { title: "8. AST Benchmark Comparison", component: AstBenchmarkAnimation },
          { title: "9. Browser WASM Execution", component: BrowserWasmAnimation },
          { title: "10. Optimization Passes", component: OptimizationPassesAnimation },
        ].map((section, i) => (
          <section key={i} className="relative">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-white/10 flex-1" />
              <h2 className="text-xl font-medium text-white tracking-wide">{section.title}</h2>
              <div className="h-px bg-white/10 flex-1" />
            </div>
            <section.component />
          </section>
        ))}
      </div>
    </div>
  );
}
