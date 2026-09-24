import React, { useState, useEffect } from 'react';
import { FiPlay, FiRefreshCw, FiSliders, FiCpu, FiTrendingUp } from 'react-icons/fi';

interface CandidateToken {
    token: string;
    prob: number;
}

export const TokenStreamSimulator: React.FC = () => {
    const [temperature, setTemperature] = useState(0.7);
    const [topP, setTopP] = useState(0.9);
    const [isGenerating, setIsGenerating] = useState(false);
    const [streamedTokens, setStreamedTokens] = useState<string[]>(['The', 'optimal', 'AI', 'architecture']);
    const [candidates, setCandidates] = useState<CandidateToken[]>([
        { token: 'prioritizes', prob: 0.52 },
        { token: 'delegates', prob: 0.28 },
        { token: 'minimizes', prob: 0.12 },
        { token: 'scales', prob: 0.08 },
    ]);
    const [currentEntropy, setCurrentEntropy] = useState<number>(1.12);

    const tokenCorpus = [
        ['requires', 'enforces', 'demands', 'guarantees'],
        ['low-latency', 'sub-20ms', 'distributed', 'high-throughput'],
        ['model', 'gateway', 'proxy', 'runtime'],
        ['routing', 'failover', 'caching', 'orchestration'],
        ['across', 'within', 'over', 'between'],
        ['multi-cluster', 'hybrid-cloud', 'local-edge', 'heterogeneous'],
        ['inference', 'compute', 'serving', 'execution'],
        ['nodes.', 'endpoints.', 'services.', 'architectures.'],
    ];

    const generateNextToken = async () => {
        if (isGenerating) return;
        setIsGenerating(true);

        for (let step = 0; step < tokenCorpus.length; step++) {
            const rawCandidates = tokenCorpus[step];

            // Calculate scaled logits with temperature
            const baseLogits = [3.2, 2.1, 1.4, 0.8];
            const scaled = baseLogits.map(l => l / Math.max(0.1, temperature));
            const sumExp = scaled.reduce((acc, v) => acc + Math.exp(v), 0);
            const probs = scaled.map(v => Math.exp(v) / sumExp);

            // Apply Top-P truncation
            let cumulative = 0;
            const candidateList: CandidateToken[] = [];
            for (let i = 0; i < rawCandidates.length; i++) {
                cumulative += probs[i];
                candidateList.push({
                    token: rawCandidates[i],
                    prob: Number(probs[i].toFixed(3)),
                });
                if (cumulative >= topP) break;
            }

            // Calculate Shannon entropy H = -sum(p * log2(p))
            const entropy = -candidateList.reduce((acc, c) => acc + (c.prob > 0 ? c.prob * Math.log2(c.prob) : 0), 0);
            setCurrentEntropy(Number(entropy.toFixed(2)));
            setCandidates(candidateList);

            // Sample token based on probability
            const pick = candidateList[0].token;
            setStreamedTokens(prev => [...prev, pick]);

            await new Promise(r => setTimeout(r, 450));
        }

        setIsGenerating(false);
    };

    const resetStream = () => {
        setStreamedTokens(['The', 'optimal', 'AI', 'architecture']);
        setCandidates([
            { token: 'prioritizes', prob: 0.52 },
            { token: 'delegates', prob: 0.28 },
            { token: 'minimizes', prob: 0.12 },
            { token: 'scales', prob: 0.08 },
        ]);
        setCurrentEntropy(1.12);
    };

    return (
        <div className="w-full rounded-2xl overflow-hidden border border-gray-800 bg-gray-950 font-sans shadow-2xl">
            {/* Header Toolbar */}
            <div className="p-4 sm:p-5 border-b border-gray-800/80 bg-gray-950 flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                    <div className="text-xs font-mono text-cyan-400 font-bold flex items-center space-x-2">
                        <FiCpu />
                        <span>Autoregressive Softmax Decoder</span>
                    </div>
                    <h3 className="text-white font-bold text-base">Token Probability Distribution</h3>
                </div>

                <div className="flex items-center space-x-3">
                    <button
                        disabled={isGenerating}
                        onClick={generateNextToken}
                        className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-gray-950 font-bold text-xs transition-all shadow-lg shadow-cyan-500/20 active:scale-95 cursor-pointer"
                    >
                        <FiPlay className="w-3.5 h-3.5" />
                        <span>{isGenerating ? 'Decoding...' : 'Generate Next Sequence'}</span>
                    </button>
                    <button
                        onClick={resetStream}
                        className="p-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-400 hover:text-white transition-colors cursor-pointer"
                        title="Reset Stream"
                    >
                        <FiRefreshCw className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>

            {/* Main Visualizer Area */}
            <div className="p-6 space-y-6">
                {/* Live Stream Text Box */}
                <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                        <span>Generated Text (Entropy Heatmap):</span>
                        <span className="text-cyan-400">H(X) = {currentEntropy} bits</span>
                    </div>
                    <div className="text-base sm:text-lg text-gray-100 font-mono flex flex-wrap gap-2 items-center leading-relaxed">
                        {streamedTokens.map((t, idx) => (
                            <span
                                key={idx}
                                className="px-2 py-0.5 rounded-md bg-gray-800/80 border border-gray-700/80 text-emerald-300"
                            >
                                {t}
                            </span>
                        ))}
                        {isGenerating && (
                            <span className="inline-block w-2.5 h-5 bg-cyan-400 animate-pulse ml-1" />
                        )}
                    </div>
                </div>

                {/* Next Token Probability Bar Chart */}
                <div className="space-y-3">
                    <div className="text-xs font-mono text-gray-400 uppercase tracking-wider font-bold">
                        Candidate Logits & Softmax Probabilities:
                    </div>
                    <div className="space-y-2.5">
                        {candidates.map((cand, i) => (
                            <div key={cand.token} className="space-y-1">
                                <div className="flex items-center justify-between text-xs font-mono">
                                    <span className="text-gray-200 font-bold">"{cand.token}"</span>
                                    <span className="text-cyan-400">{(cand.prob * 100).toFixed(1)}%</span>
                                </div>
                                <div className="w-full h-3 rounded-full bg-gray-900 overflow-hidden border border-gray-800/80">
                                    <div
                                        className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full transition-all duration-300"
                                        style={{ width: `${cand.prob * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sliders Footer */}
            <div className="p-4 sm:p-5 border-t border-gray-800/80 bg-gray-950 flex flex-wrap items-center justify-between gap-6 text-xs font-mono text-gray-400">
                <div className="flex items-center space-x-3">
                    <span>Temperature (T):</span>
                    <input
                        type="range"
                        min="0.1"
                        max="1.5"
                        step="0.05"
                        value={temperature}
                        onChange={e => setTemperature(Number(e.target.value))}
                        className="w-28 accent-cyan-400 cursor-pointer"
                    />
                    <strong className="text-white">{temperature}</strong>
                    <span className="text-gray-500 text-[10px]">
                        {temperature <= 0.3 ? '(Greedy/Sharp)' : temperature >= 1.0 ? '(High Variance)' : '(Balanced)'}
                    </span>
                </div>

                <div className="flex items-center space-x-3">
                    <span>Top-P (Nucleus):</span>
                    <input
                        type="range"
                        min="0.5"
                        max="1.0"
                        step="0.05"
                        value={topP}
                        onChange={e => setTopP(Number(e.target.value))}
                        className="w-28 accent-cyan-400 cursor-pointer"
                    />
                    <strong className="text-white">{topP}</strong>
                </div>
            </div>
        </div>
    );
};
