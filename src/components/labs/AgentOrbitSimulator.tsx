import React, { useState, useEffect } from 'react';
import { FiPlay, FiAlertTriangle, FiCheckCircle, FiClock, FiCpu, FiTerminal, FiLayers } from 'react-icons/fi';

interface SubAgent {
    id: string;
    name: string;
    role: string;
    status: 'idle' | 'delegating' | 'reasoning' | 'completed' | 'failed';
    progress: number;
    tokensGenerated: number;
    latencyMs: number;
}

export const AgentOrbitSimulator: React.FC = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [selectedPrompt, setSelectedPrompt] = useState('Synthesize Sub-20ms Routing Policy for DeepSeek V3');
    const [telemetryLogs, setTelemetryLogs] = useState<string[]>([
        '[00:00:00] Supervisor initialized. Worker pool ready (4 subagents online).',
    ]);

    const [agents, setAgents] = useState<SubAgent[]>([
        { id: 'agent-coord', name: 'Supervisor Agent', role: 'Decomposition & Synthesis', status: 'idle', progress: 0, tokensGenerated: 0, latencyMs: 0 },
        { id: 'agent-coder', name: 'Code Generation', role: 'Go Proxy Architecture', status: 'idle', progress: 0, tokensGenerated: 0, latencyMs: 0 },
        { id: 'agent-audit', name: 'Security Auditor', role: 'Vulnerability & Race Check', status: 'idle', progress: 0, tokensGenerated: 0, latencyMs: 0 },
        { id: 'agent-bench', name: 'Benchmark Analyst', role: 'Sub-20ms SLA Verification', status: 'idle', progress: 0, tokensGenerated: 0, latencyMs: 0 },
    ]);

    const addLog = (msg: string) => {
        const time = new Date().toISOString().substring(11, 19);
        setTelemetryLogs(prev => [`[${time}] ${msg}`, ...prev.slice(0, 14)]);
    };

    const runSimulation = async (injectFault = false) => {
        if (isRunning) return;
        setIsRunning(true);
        addLog(`Task received: "${selectedPrompt}"`);
        addLog(`Supervisor decomposing problem graph into 3 parallel execution nodes...`);

        // Step 1: Supervisor delegating
        setAgents(prev => prev.map((a, i) => i === 0 ? { ...a, status: 'reasoning', progress: 40 } : a));
        await new Promise(r => setTimeout(r, 600));

        // Step 2: Dispatch to workers
        addLog(`Dispatched subtasks to Coder, Auditor, and Benchmark Analyst.`);
        setAgents(prev => prev.map((a, i) => i === 0 
            ? { ...a, status: 'delegating', progress: 100, tokensGenerated: 340, latencyMs: 140 }
            : { ...a, status: 'reasoning', progress: 30 }
        ));
        await new Promise(r => setTimeout(r, 800));

        // Step 3: Worker execution
        if (injectFault) {
            addLog(`WARNING: Simulated packet timeout on Security Auditor node!`);
            setAgents(prev => prev.map(a => {
                if (a.id === 'agent-audit') return { ...a, status: 'failed', progress: 50, latencyMs: 950 };
                if (a.id !== 'agent-coord') return { ...a, status: 'reasoning', progress: 85 };
                return a;
            }));
            await new Promise(r => setTimeout(r, 900));
            addLog(`Supervisor triggered self-healing recovery loop (fallback model assigned).`);
            setAgents(prev => prev.map(a => a.id === 'agent-audit' ? { ...a, status: 'reasoning', progress: 90 } : a));
            await new Promise(r => setTimeout(r, 600));
        }

        // Step 4: Completion
        setAgents(prev => prev.map(a => ({
            ...a,
            status: 'completed',
            progress: 100,
            tokensGenerated: Math.floor(450 + Math.random() * 400),
            latencyMs: Math.floor(220 + Math.random() * 180),
        })));

        addLog(`Synthesis complete. All artifacts merged with 0 race conditions. Execution successful.`);
        setIsRunning(false);
    };

    return (
        <div className="w-full rounded-2xl overflow-hidden border border-gray-800 bg-gray-950 font-sans shadow-2xl">
            {/* Top Toolbar */}
            <div className="p-4 sm:p-5 border-b border-gray-800/80 bg-gray-950 flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                    <div className="text-xs font-mono text-emerald-400 font-bold flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span>Multi-Agent DAG Dispatcher</span>
                    </div>
                    <h3 className="text-white font-bold text-base">Autonomous Orchestration Console</h3>
                </div>

                <div className="flex items-center space-x-3">
                    <button
                        disabled={isRunning}
                        onClick={() => runSimulation(false)}
                        className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-gray-950 font-bold text-xs transition-all shadow-lg shadow-emerald-500/20 active:scale-95 cursor-pointer"
                    >
                        <FiPlay className="w-3.5 h-3.5" />
                        <span>{isRunning ? 'Orchestrating...' : 'Dispatch Task DAG'}</span>
                    </button>

                    <button
                        disabled={isRunning}
                        onClick={() => runSimulation(true)}
                        className="inline-flex items-center space-x-2 px-3 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-800 text-amber-400 text-xs font-mono transition-all cursor-pointer"
                        title="Inject Subagent Network Failure"
                    >
                        <FiAlertTriangle className="w-3.5 h-3.5" />
                        <span>Inject Fault</span>
                    </button>
                </div>
            </div>

            {/* Visualizer Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-gray-800">
                {/* Agent Nodes Matrix (8 Cols) */}
                <div className="lg:col-span-8 p-6 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {agents.map((agent, i) => {
                            const isSupervisor = i === 0;
                            return (
                                <div
                                    key={agent.id}
                                    className={`p-4 rounded-xl border transition-all ${
                                        agent.status === 'reasoning'
                                            ? 'bg-emerald-950/20 border-emerald-500/80 shadow-lg shadow-emerald-500/10'
                                            : agent.status === 'failed'
                                            ? 'bg-red-950/20 border-red-500/80 shadow-lg shadow-red-500/10'
                                            : agent.status === 'completed'
                                            ? 'bg-gray-900/60 border-emerald-800/60'
                                            : 'bg-gray-900/30 border-gray-800'
                                    }`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-0.5">
                                            <div className="flex items-center space-x-1.5">
                                                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                                                    isSupervisor ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' : 'bg-gray-800 text-gray-300'
                                                }`}>
                                                    {isSupervisor ? 'Supervisor' : `Worker #${i}`}
                                                </span>
                                            </div>
                                            <h4 className="font-bold text-sm text-white pt-1">{agent.name}</h4>
                                            <p className="text-xs text-gray-400 font-mono">{agent.role}</p>
                                        </div>

                                        <div className="font-mono text-xs">
                                            {agent.status === 'reasoning' && (
                                                <span className="text-emerald-400 flex items-center space-x-1">
                                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                                                    <span>Active</span>
                                                </span>
                                            )}
                                            {agent.status === 'failed' && (
                                                <span className="text-red-400 font-bold">Fault</span>
                                            )}
                                            {agent.status === 'completed' && (
                                                <span className="text-emerald-400 font-bold">Done</span>
                                            )}
                                            {agent.status === 'idle' && (
                                                <span className="text-gray-500">Idle</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="mt-4 space-y-1.5">
                                        <div className="w-full h-1.5 rounded-full bg-gray-800 overflow-hidden">
                                            <div
                                                className={`h-full transition-all duration-300 ${
                                                    agent.status === 'failed' ? 'bg-red-500' : 'bg-emerald-400'
                                                }`}
                                                style={{ width: `${agent.progress}%` }}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between text-[10px] font-mono text-gray-500">
                                            <span>Tokens: {agent.tokensGenerated}</span>
                                            <span>Latency: {agent.latencyMs}ms</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Telemetry Console (4 Cols) */}
                <div className="lg:col-span-4 p-5 bg-gray-950 space-y-3 font-mono">
                    <div className="flex items-center justify-between text-xs text-gray-400 border-b border-gray-900 pb-2">
                        <span className="flex items-center space-x-2 text-emerald-400 font-bold">
                            <FiTerminal />
                            <span>Live Agent Bus Logs</span>
                        </span>
                        <span className="text-[10px] text-gray-600">STDOUT</span>
                    </div>

                    <div className="h-64 overflow-y-auto space-y-1.5 text-[11px] text-gray-300 scrollbar-thin">
                        {telemetryLogs.map((log, i) => (
                            <div
                                key={i}
                                className={`leading-relaxed ${
                                    log.includes('WARNING')
                                        ? 'text-red-400 font-bold'
                                        : log.includes('complete')
                                        ? 'text-emerald-300 font-bold'
                                        : 'text-gray-400'
                                }`}
                            >
                                {log}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
