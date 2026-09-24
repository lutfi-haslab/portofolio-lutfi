import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { FiTarget, FiCompass, FiCrosshair, FiSearch } from 'react-icons/fi';

interface VectorPoint {
    id: string;
    label: string;
    domain: 'ai' | 'systems' | 'native' | 'web';
    pos: THREE.Vector3;
    score?: number;
}

export const EmbeddingSpaceCanvas: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedPoint, setSelectedPoint] = useState<VectorPoint | null>(null);
    const [activeNeighbors, setActiveNeighbors] = useState<VectorPoint[]>([]);
    const [threshold, setThreshold] = useState<number>(0.7);

    const selectPointRef = useRef<((p: VectorPoint) => void) | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const width = container.clientWidth || 800;
        const height = container.clientHeight || (compact ? 320 : 520);

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x030712, 0.003);

        const camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000);
        camera.position.set(0, 40, 200);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x030712, 1);
        container.innerHTML = '';
        container.appendChild(renderer.domElement);

        const rootGroup = new THREE.Group();
        scene.add(rootGroup);

        // Ground grid helper for 3D spatial reference
        const grid = new THREE.GridHelper(260, 26, 0x1e293b, 0x0f172a);
        grid.position.y = -70;
        rootGroup.add(grid);

        // Define semantic corpus points
        const domains = {
            ai: { color: 0x10b981, center: new THREE.Vector3(-45, 20, 20) },
            systems: { color: 0x06b6d4, center: new THREE.Vector3(50, 30, -30) },
            native: { color: 0x8b5cf6, center: new THREE.Vector3(-20, -25, -40) },
            web: { color: 0xf59e0b, center: new THREE.Vector3(40, -20, 35) },
        };

        const corpusData: { label: string; domain: 'ai' | 'systems' | 'native' | 'web'; offset: THREE.Vector3 }[] = [
            // AI Cluster
            { label: 'Autonomous Agents', domain: 'ai', offset: new THREE.Vector3(-5, 4, 3) },
            { label: 'Multi-Agent DAG', domain: 'ai', offset: new THREE.Vector3(8, -6, 2) },
            { label: 'LLM Orchestration', domain: 'ai', offset: new THREE.Vector3(-3, -8, -5) },
            { label: 'Reasoning Feedback Loops', domain: 'ai', offset: new THREE.Vector3(10, 8, -4) },
            { label: 'Token Logprob Entropy', domain: 'ai', offset: new THREE.Vector3(-8, 12, 5) },
            // Systems Cluster
            { label: 'Sub-20ms Go Gateway', domain: 'systems', offset: new THREE.Vector3(4, 5, -2) },
            { label: 'TCP Connection Pool', domain: 'systems', offset: new THREE.Vector3(-6, -4, 6) },
            { label: 'gRPC Protocol Buffers', domain: 'systems', offset: new THREE.Vector3(9, 2, 7) },
            { label: 'Zero-Allocation Parser', domain: 'systems', offset: new THREE.Vector3(-3, 8, -6) },
            { label: 'Microservice Resilience', domain: 'systems', offset: new THREE.Vector3(5, -9, -3) },
            // Native Desktop Cluster
            { label: 'Wails v2 Desktop Runtime', domain: 'native', offset: new THREE.Vector3(2, 5, -3) },
            { label: 'Native OS Webview Binder', domain: 'native', offset: new THREE.Vector3(-7, -4, 5) },
            { label: 'React Native Bridge', domain: 'native', offset: new THREE.Vector3(6, 6, 4) },
            { label: 'Offline SQLite DB Engine', domain: 'native', offset: new THREE.Vector3(-4, -6, -5) },
            // Modern Web Cluster
            { label: 'Astro 7 Zero-JS Islands', domain: 'web', offset: new THREE.Vector3(-3, 6, 4) },
            { label: 'Tailwind CSS v4 Engine', domain: 'web', offset: new THREE.Vector3(7, -5, -4) },
            { label: 'React 19 Server Actions', domain: 'web', offset: new THREE.Vector3(-6, -3, -6) },
            { label: 'Edge Function Latency', domain: 'web', offset: new THREE.Vector3(5, 7, 5) },
        ];

        const corpusPoints: VectorPoint[] = corpusData.map((d, idx) => {
            const domainCfg = domains[d.domain];
            const p = domainCfg.center.clone().add(d.offset.clone().multiplyScalar(2.2));
            return {
                id: `pt-${idx}`,
                label: d.label,
                domain: d.domain,
                pos: p,
            };
        });

        // Create Sphere Mesh for each point
        const spheres: THREE.Mesh[] = [];
        const sphereGeo = new THREE.SphereGeometry(3.5, 16, 16);

        corpusPoints.forEach(pt => {
            const col = domains[pt.domain].color;
            const mat = new THREE.MeshBasicMaterial({
                color: col,
                wireframe: true,
            });
            const mesh = new THREE.Mesh(sphereGeo, mat);
            mesh.position.copy(pt.pos);
            mesh.userData = { pt };
            rootGroup.add(mesh);
            spheres.push(mesh);
        });

        // Similarity rays (connecting selected point to neighbors)
        const rayLinesGeo = new THREE.BufferGeometry();
        const rayPositions = new Float32Array(50 * 6);
        const rayColors = new Float32Array(50 * 6);
        rayLinesGeo.setAttribute('position', new THREE.BufferAttribute(rayPositions, 3));
        rayLinesGeo.setAttribute('color', new THREE.BufferAttribute(rayColors, 3));

        const rayMaterial = new THREE.LineBasicMaterial({
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            transparent: true,
            opacity: 0.9,
        });
        const rayLines = new THREE.LineSegments(rayLinesGeo, rayMaterial);
        rootGroup.add(rayLines);

        // Core Selection Routine
        const applySelection = (pt: VectorPoint) => {
            setSelectedPoint(pt);

            // Calculate cosine similarities in 3D coordinate space
            const originLen = pt.pos.length();
            const scored = corpusPoints
                .filter(p => p.id !== pt.id)
                .map(p => {
                    const dot = pt.pos.dot(p.pos);
                    const sim = (dot / (originLen * p.pos.length()) + 1) / 2; // normalized 0..1
                    return { ...p, score: Number(sim.toFixed(3)) };
                })
                .filter(p => (p.score ?? 0) >= threshold)
                .sort((a, b) => (b.score ?? 0) - (a.score ?? 0));

            setActiveNeighbors(scored.slice(0, 5));

            // Render rays
            const posArr = rayLinesGeo.attributes.position.array as Float32Array;
            const colArr = rayLinesGeo.attributes.color.array as Float32Array;
            const goldCol = new THREE.Color(0x34d399);

            let rayCount = 0;
            scored.slice(0, 5).forEach((neighbor, i) => {
                const idx = i * 6;
                posArr[idx] = pt.pos.x;
                posArr[idx + 1] = pt.pos.y;
                posArr[idx + 2] = pt.pos.z;

                posArr[idx + 3] = neighbor.pos.x;
                posArr[idx + 4] = neighbor.pos.y;
                posArr[idx + 5] = neighbor.pos.z;

                colArr[idx] = goldCol.r;
                colArr[idx + 1] = goldCol.g;
                colArr[idx + 2] = goldCol.b;

                colArr[idx + 3] = goldCol.r;
                colArr[idx + 4] = goldCol.g;
                colArr[idx + 5] = goldCol.b;

                rayCount++;
            });

            rayLinesGeo.setDrawRange(0, rayCount * 2);
            rayLinesGeo.attributes.position.needsUpdate = true;
            rayLinesGeo.attributes.color.needsUpdate = true;
        };

        selectPointRef.current = applySelection;

        // Default initial selection
        applySelection(corpusPoints[0]);

        // Mouse Drag Interaction
        let isDragging = false;
        let prevX = 0;
        let prevY = 0;
        let rotY = 0;
        let rotX = 0;

        const onDown = (e: PointerEvent) => {
            isDragging = true;
            prevX = e.clientX;
            prevY = e.clientY;
        };

        const onMove = (e: PointerEvent) => {
            if (!isDragging) return;
            const dx = e.clientX - prevX;
            const dy = e.clientY - prevY;
            rotY += dx * 0.005;
            rotX += dy * 0.005;
            prevX = e.clientX;
            prevY = e.clientY;
        };

        const onUp = () => (isDragging = false);

        const dom = renderer.domElement;
        dom.addEventListener('pointerdown', onDown);
        window.addEventListener('pointermove', onMove);
        window.addEventListener('pointerup', onUp);

        // Resize
        const onResize = () => {
            if (!container) return;
            const w = container.clientWidth;
            const h = container.clientHeight || (compact ? 320 : 520);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener('resize', onResize);

        // Animation Loop
        let frameId: number;
        const animate = () => {
            frameId = requestAnimationFrame(animate);

            rootGroup.rotation.y += (rotY - rootGroup.rotation.y) * 0.05 + 0.001;
            rootGroup.rotation.x += (rotX - rootGroup.rotation.x) * 0.05;

            // Subtle breathing pulse for selected point
            spheres.forEach(mesh => {
                const pt = mesh.userData.pt as VectorPoint;
                if (pt.id === selectedPoint?.id) {
                    mesh.scale.setScalar(1.4 + Math.sin(Date.now() * 0.005) * 0.2);
                } else {
                    mesh.scale.setScalar(1.0);
                }
            });

            renderer.render(scene, camera);
        };
        animate();

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('resize', onResize);
            dom.removeEventListener('pointerdown', onDown);
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerup', onUp);
            renderer.dispose();
            sphereGeo.dispose();
            rayLinesGeo.dispose();
            grid.dispose();
        };
    }, [threshold]);

    return (
        <div className="relative w-full rounded-2xl overflow-hidden border border-gray-800 bg-gray-950 font-sans shadow-2xl">
            {/* 3D Viewport */}
            <div
                ref={containerRef}
                className={`w-full ${compact ? 'h-80' : 'h-[500px]'} cursor-grab active:cursor-grabbing`}
            />

            {/* HUD Status Overlay */}
            <div className="absolute top-4 left-4 z-10 pointer-events-none flex flex-col gap-1.5 font-mono text-xs">
                <div className="flex items-center space-x-2 px-2.5 py-1 rounded-md bg-gray-950/80 border border-gray-800 backdrop-blur-md text-cyan-400">
                    <FiCrosshair className="animate-spin" />
                    <span className="font-bold">Latent Vector Projection (R^3)</span>
                </div>
                {selectedPoint && (
                    <div className="px-2.5 py-1.5 rounded-md bg-gray-950/90 border border-gray-800 backdrop-blur-md text-xs space-y-1">
                        <div className="text-gray-400 text-[10px] uppercase font-bold">Query Anchor Vector:</div>
                        <div className="text-emerald-300 font-bold">{selectedPoint.label}</div>
                        <div className="text-gray-500 text-[10px]">
                            Domain: <span className="text-gray-300 uppercase">{selectedPoint.domain}</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Nearest Neighbors Cosine Similarity Panel */}
            <div className="p-4 sm:p-5 border-t border-gray-800/80 bg-gray-950/90 backdrop-blur-xl flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                    <div className="text-xs font-mono text-gray-400 flex items-center space-x-2">
                        <FiCompass className="text-emerald-400" />
                        <span>Top Nearest Neighbors (Cosine Similarity):</span>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                        {activeNeighbors.map(n => (
                            <span 
                                key={n.id}
                                className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-gray-900 border border-gray-800 text-xs font-mono text-gray-200"
                            >
                                <span>{n.label}</span>
                                <strong className="text-emerald-400">{(n.score! * 100).toFixed(0)}%</strong>
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex items-center space-x-3 text-xs font-mono text-gray-400">
                    <span>Threshold:</span>
                    <input
                        type="range"
                        min="0.5"
                        max="0.9"
                        step="0.05"
                        value={threshold}
                        onChange={e => setThreshold(Number(e.target.value))}
                        className="w-24 accent-emerald-400 cursor-pointer"
                    />
                    <span className="text-white font-bold">{threshold}</span>
                </div>
            </div>
        </div>
    );
};
