export interface LabShowcase {
    id: string;
    slug: string;
    title: string;
    subtitle: string;
    category: 'threejs' | 'multi-agent' | 'embeddings' | 'token-stream';
    categoryLabel: string;
    badge: string;
    date: string;
    readingTime: string;
    tags: string[];
    description: string;
    mathOrAlgorithm?: string;
    architectureNotes: string[];
    controlsGuide: { name: string; description: string }[];
    codeSnippet: string;
}

export const aiLabsShowcases: LabShowcase[] = [
    {
        id: 'neural-synapse-3d',
        slug: 'neural-synapse-3d',
        title: '3D Neural Synapse Cloud: Real-Time Synaptic Firing',
        subtitle: 'Interactive Three.js WebGL visualizer rendering volumetric neural axons, dynamic synaptic action potentials, and particle pulse flows.',
        category: 'threejs',
        categoryLabel: 'Three.js 3D',
        badge: 'WebGL Interactive',
        date: '2026-09-24',
        readingTime: 'Interactive 3D',
        tags: ['Three.js', 'WebGL', 'Neural Networks', 'Shaders', 'Particles'],
        description: 'This interactive 3D experiment simulates volumetric neural network structures with real-time axon firing. Built on raw Three.js within a React island, it computes particle trajectories, dynamic connection thresholds, and action potential surges across 150+ interconnected neurons in a 3D coordinate space.',
        mathOrAlgorithm: 'Action potential propagation across synaptic distance: P(t) = A * e^(-lambda * d) * sin(omega * t - k * d), with dynamic Euclidean proximity edge culling: d(n1, n2) < threshold.',
        architectureNotes: [
            'Direct buffer geometry allocation with Three.Points and dynamic LineSegments for 60fps performance.',
            'Vector math computed in requestAnimationFrame without garbage collection allocations.',
            'Interactive mouse inertia and orbit damping allowing 360-degree synaptic inspection.',
            'Custom color palette swapping supporting Cyber Matrix, Neon Emerald, and DeepSeek Violet themes.',
        ],
        controlsGuide: [
            { name: 'Mouse Drag / Touch', description: 'Rotate 3D neural space with velocity damping' },
            { name: 'Pulse Trigger', description: 'Fire high-intensity action potential waves across the synapse cloud' },
            { name: 'Synapse Threshold', description: 'Dynamically modulate synaptic interconnection density' },
            { name: 'Color Themes', description: 'Toggle between Emerald Matrix, Cyan Cyber, and Violet Aurora' },
        ],
        codeSnippet: `// Three.js Synaptic Pulse Engine
const pulsePositions = [];
for (let i = 0; i < nodeCount; i++) {
  const node = nodes[i];
  // Calculate Euclidean proximity for axon links
  for (let j = i + 1; j < nodeCount; j++) {
    const dist = node.pos.distanceTo(nodes[j].pos);
    if (dist < maxDistance) {
      linesGeometry.addConnection(node.pos, nodes[j].pos, dist / maxDistance);
    }
  }
}
renderer.render(scene, camera);`,
    },
    {
        id: 'embedding-vector-space',
        slug: 'embedding-vector-space',
        title: '3D Vector Embedding Space & Cosine Similarity Explorer',
        subtitle: 'High-dimensional semantic vectors projected into interactive 3D spatial clusters with live nearest-neighbor beam search.',
        category: 'embeddings',
        categoryLabel: 'Vector Embeddings',
        badge: 'Semantic 3D',
        date: '2026-09-24',
        readingTime: 'Interactive 3D',
        tags: ['Three.js', 'Embeddings', 'Vector Search', 'Cosine Similarity', 'NLP'],
        description: 'Explore how large language models represent semantic meaning. High-dimensional 1536-dimensional embeddings (reduced via UMAP/t-SNE into 3D Cartesian coordinates) are visualized as clustered galaxy nodes. Click or query any cluster to trigger live cosine similarity calculation with glowing vector projection rays.',
        mathOrAlgorithm: 'Cosine Similarity: cos(theta) = (A · B) / (||A|| * ||B||), where A and B represent normalized coordinate vectors in R^3 space.',
        architectureNotes: [
            'Volumetric spatial clustering grouped by domain: AI Systems, Architecture, Low-Level Proxies, and Native Tools.',
            'Raycasting intersection detection for instant vector metadata inspection on hover/tap.',
            'Dynamic beam casting highlighting the top-k nearest neighbors in the latent manifold.',
        ],
        controlsGuide: [
            { name: 'Cluster Selection', description: 'Click any semantic domain to focus camera and calculate vector neighbors' },
            { name: 'Similarity Threshold', description: 'Filter out nodes falling below specified cosine distance threshold' },
            { name: '3D Orbit Controls', description: 'Pan, rotate, and zoom inside the multi-dimensional latent cloud' },
        ],
        codeSnippet: `function findNearestNeighbors(queryVec, corpus, topK = 4) {
  return corpus
    .map(doc => ({
      ...doc,
      score: queryVec.dot(doc.vector) / (queryVec.length() * doc.vector.length())
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}`,
    },
    {
        id: 'agent-orchestrator',
        slug: 'agent-orchestrator',
        title: 'Autonomous Multi-Agent Telemetry & Delegation Simulator',
        subtitle: 'Real-time state machine visualizer demonstrating supervisor-to-worker dispatching, reasoning pipelines, and packet telemetry.',
        category: 'multi-agent',
        categoryLabel: 'Multi-Agent',
        badge: 'Live Simulation',
        date: '2026-09-24',
        readingTime: 'Live Engine',
        tags: ['Multi-Agent', 'State Machine', 'Telemetry', 'Orchestration', 'React'],
        description: 'Simulate how modern autonomous agent runtimes (like KendaliAI) delegate work between specialized LLM agents. Features a central Coordinator Agent dispatching structured JSON task packets to Coder, Security Auditor, and Architect worker agents with live state transitions and event streams.',
        mathOrAlgorithm: 'Directed Acyclic Graph (DAG) state progression: G = (V, E), where V is the set of agent nodes and E is the message passing latency vector.',
        architectureNotes: [
            'Event-driven reactive state machine in pure React with animated SVG telemetry pipelines.',
            'Live message ledger recording token throughput, prompt payload size, and subagent roundtrip latency.',
            'Manual error injection and retry policy simulation demonstrating self-healing agent loops.',
        ],
        controlsGuide: [
            { name: 'Trigger Task', description: 'Dispatch a synthetic engineering prompt through the agent coordinator DAG' },
            { name: 'Agent Speed', description: 'Adjust simulated inference latency (100ms - 2000ms per agent step)' },
            { name: 'Fault Injection', description: 'Inject synthetic subagent timeout to test autonomous supervisor recovery' },
        ],
        codeSnippet: `async function orchestrate(task) {
  const plan = await coordinator.decompose(task);
  const results = await Promise.all(
    plan.subtasks.map(st => workerPool.dispatch(st.role, st.payload))
  );
  return coordinator.synthesize(results);
}`,
    },
    {
        id: 'token-stream-simulator',
        slug: 'token-stream-simulator',
        title: 'LLM Token Generation & Entropy Distribution Heatmap',
        subtitle: 'Inspect real-time autoregressive token generation with log-probability distributions, top-p/top-k filtering, and temperature controls.',
        category: 'token-stream',
        categoryLabel: 'Token Stream',
        badge: 'Inference Visualizer',
        date: '2026-09-24',
        readingTime: 'Interactive Tool',
        tags: ['LLM Inference', 'Probability', 'Softmax', 'Temperature', 'React'],
        description: 'Gain transparency into autoregressive token decoding. Watch the next-token probability distribution unfold token-by-token with color-coded entropy heatmaps, showcasing the statistical difference between greedy sampling (temp 0.0) and creative hallucination (temp 1.4+).',
        mathOrAlgorithm: 'Softmax with Temperature: P(x_i) = exp(z_i / T) / sum_j(exp(z_j / T)), followed by Top-p Nucleus truncation: sum(P(x)) >= p.',
        architectureNotes: [
            'Real-time distribution bar chart dynamically recalculated for every token generation step.',
            'Token entropy calculation H(X) = -sum(p(x) * log2(p(x))) visualizing model uncertainty.',
            'Interactive temperature and Top-P slider adjustments with instant feedback.',
        ],
        controlsGuide: [
            { name: 'Run Inference', description: 'Stream tokens one by one with live probability updates' },
            { name: 'Temperature Slider', description: 'Flatten or sharpen the probability distribution curve' },
            { name: 'Top-P Cutoff', description: 'Truncate low-probability tail tokens in real-time' },
        ],
        codeSnippet: `function sampleWithTemperature(logits, temperature = 0.7, topP = 0.9) {
  const scaled = logits.map(l => l / temperature);
  const probs = softmax(scaled);
  return nucleusSample(probs, topP);
}`,
    },
];
