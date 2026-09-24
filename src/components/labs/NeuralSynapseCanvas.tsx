import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { FiPlay, FiRefreshCw, FiZap, FiSliders, FiSun, FiLayers } from 'react-icons/fi';

interface Props {
    interactiveControls?: boolean;
    compact?: boolean;
}

export const NeuralSynapseCanvas: React.FC<Props> = ({ 
    interactiveControls = true,
    compact = false 
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [theme, setTheme] = useState<'emerald' | 'cyan' | 'violet'>('emerald');
    const [synapseDensity, setSynapseDensity] = useState<number>(45);
    const [pulseSpeed, setPulseSpeed] = useState<number>(1.2);
    const [nodeCount, setNodeCount] = useState<number>(120);
    const [firingCount, setFiringCount] = useState<number>(0);
    const [fps, setFps] = useState<number>(60);

    const triggerPulseRef = useRef<(() => void) | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Color palettes
        const palettes = {
            emerald: {
                primary: 0x10b981,
                secondary: 0x059669,
                line: 0x064e3b,
                pulse: 0x6ee7b7,
                bg: 0x030712,
            },
            cyan: {
                primary: 0x06b6d4,
                secondary: 0x0891b2,
                line: 0x164e63,
                pulse: 0x67e8f9,
                bg: 0x030712,
            },
            violet: {
                primary: 0xa855f7,
                secondary: 0x9333ea,
                line: 0x581c87,
                pulse: 0xd8b4fe,
                bg: 0x030712,
            },
        };

        const currentPalette = palettes[theme];

        // Scene, Camera, Renderer
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(currentPalette.bg, 0.0035);

        const width = container.clientWidth || 800;
        const height = container.clientHeight || (compact ? 300 : 500);

        const camera = new THREE.PerspectiveCamera(55, width / height, 1, 1000);
        camera.position.z = 180;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(currentPalette.bg, 0.95);
        container.innerHTML = '';
        container.appendChild(renderer.domElement);

        // Group container for easy rotation
        const group = new THREE.Group();
        scene.add(group);

        // Generate Nodes in 3D sphere / ellipsoid distribution
        const nodes: { pos: THREE.Vector3; velocity: THREE.Vector3 }[] = [];
        const nodePositions = new Float32Array(nodeCount * 3);
        const nodeColors = new Float32Array(nodeCount * 3);

        const primaryCol = new THREE.Color(currentPalette.primary);
        const secCol = new THREE.Color(currentPalette.secondary);

        for (let i = 0; i < nodeCount; i++) {
            const u = Math.random();
            const v = Math.random();
            const theta = u * 2.0 * Math.PI;
            const phi = Math.acos(2.0 * v - 1.0);
            const r = Math.cbrt(Math.random()) * 85;

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta) * 0.75;
            const z = r * Math.cos(phi);

            const pos = new THREE.Vector3(x, y, z);
            nodes.push({
                pos,
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.15,
                    (Math.random() - 0.5) * 0.15,
                    (Math.random() - 0.5) * 0.15
                ),
            });

            nodePositions[i * 3] = x;
            nodePositions[i * 3 + 1] = y;
            nodePositions[i * 3 + 2] = z;

            const mixedColor = primaryCol.clone().lerp(secCol, Math.random());
            nodeColors[i * 3] = mixedColor.r;
            nodeColors[i * 3 + 1] = mixedColor.g;
            nodeColors[i * 3 + 2] = mixedColor.b;
        }

        const pointGeometry = new THREE.BufferGeometry();
        pointGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
        pointGeometry.setAttribute('color', new THREE.BufferAttribute(nodeColors, 3));

        // Create round glow particle texture with Canvas
        const particleCanvas = document.createElement('canvas');
        particleCanvas.width = 64;
        particleCanvas.height = 64;
        const pCtx = particleCanvas.getContext('2d');
        if (pCtx) {
            const grad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
            grad.addColorStop(0, 'rgba(255,255,255,1)');
            grad.addColorStop(0.3, 'rgba(255,255,255,0.8)');
            grad.addColorStop(0.6, 'rgba(16,185,129,0.3)');
            grad.addColorStop(1, 'rgba(0,0,0,0)');
            pCtx.fillStyle = grad;
            pCtx.fillRect(0, 0, 64, 64);
        }
        const particleTexture = new THREE.CanvasTexture(particleCanvas);

        const pointMaterial = new THREE.PointsMaterial({
            size: 4.5,
            map: particleTexture,
            vertexColors: true,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });

        const pointsObject = new THREE.Points(pointGeometry, pointMaterial);
        group.add(pointsObject);

        // Lines Geometry for Synapses
        const maxConnections = (nodeCount * (nodeCount - 1)) / 2;
        const linePositions = new Float32Array(maxConnections * 6);
        const lineColors = new Float32Array(maxConnections * 6);

        const lineGeometry = new THREE.BufferGeometry();
        lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
        lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

        const lineMaterial = new THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            opacity: 0.5,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });

        const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
        group.add(lineSegments);

        // Dynamic Action Potential Pulses
        interface Pulse {
            fromIndex: number;
            toIndex: number;
            progress: number;
            speed: number;
        }
        let activePulses: Pulse[] = [];

        // Pulse points geometry
        const maxPulses = 100;
        const pulsePositions = new Float32Array(maxPulses * 3);
        const pulseGeometry = new THREE.BufferGeometry();
        pulseGeometry.setAttribute('position', new THREE.BufferAttribute(pulsePositions, 3));

        const pulseMaterial = new THREE.PointsMaterial({
            size: 6.0,
            color: currentPalette.pulse,
            map: particleTexture,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });
        const pulsePoints = new THREE.Points(pulseGeometry, pulseMaterial);
        group.add(pulsePoints);

        // Expose trigger pulse to React
        triggerPulseRef.current = () => {
            // Launch 15 rapid pulses
            for (let k = 0; k < 15; k++) {
                const i = Math.floor(Math.random() * nodeCount);
                let closest = -1;
                let minDist = Infinity;
                for (let j = 0; j < nodeCount; j++) {
                    if (i === j) continue;
                    const d = nodes[i].pos.distanceTo(nodes[j].pos);
                    if (d < synapseDensity && d < minDist) {
                        minDist = d;
                        closest = j;
                    }
                }
                if (closest !== -1) {
                    activePulses.push({
                        fromIndex: i,
                        toIndex: closest,
                        progress: 0,
                        speed: (0.015 + Math.random() * 0.02) * pulseSpeed,
                    });
                }
            }
            setFiringCount(prev => prev + 15);
        };

        // Interaction state
        let isDragging = false;
        let prevMouseX = 0;
        let prevMouseY = 0;
        let targetRotationX = 0;
        let targetRotationY = 0;

        const handlePointerDown = (e: PointerEvent) => {
            isDragging = true;
            prevMouseX = e.clientX;
            prevMouseY = e.clientY;
        };

        const handlePointerMove = (e: PointerEvent) => {
            if (!isDragging) return;
            const deltaX = e.clientX - prevMouseX;
            const deltaY = e.clientY - prevMouseY;
            targetRotationY += deltaX * 0.004;
            targetRotationX += deltaY * 0.004;
            prevMouseX = e.clientX;
            prevMouseY = e.clientY;
        };

        const handlePointerUp = () => {
            isDragging = false;
        };

        const domElem = renderer.domElement;
        domElem.addEventListener('pointerdown', handlePointerDown);
        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);

        // Handle resize
        const handleResize = () => {
            if (!container) return;
            const newW = container.clientWidth;
            const newH = container.clientHeight || (compact ? 300 : 500);
            camera.aspect = newW / newH;
            camera.updateProjectionMatrix();
            renderer.setSize(newW, newH);
        };
        window.addEventListener('resize', handleResize);

        // Animation Loop
        let animationFrameId: number;
        let lastTime = performance.now();
        let frameCounter = 0;
        let lastFpsUpdate = performance.now();

        const animate = (currentTime: number) => {
            animationFrameId = requestAnimationFrame(animate);

            // FPS Counter
            frameCounter++;
            if (currentTime - lastFpsUpdate >= 1000) {
                setFps(frameCounter);
                frameCounter = 0;
                lastFpsUpdate = currentTime;
            }

            // Smooth rotation damping
            group.rotation.y += (targetRotationY - group.rotation.y) * 0.05 + 0.0015;
            group.rotation.x += (targetRotationX - group.rotation.x) * 0.05;

            // Move nodes with subtle fluid jitter
            const posAttr = pointGeometry.attributes.position as THREE.BufferAttribute;
            const posArr = posAttr.array as Float32Array;

            for (let i = 0; i < nodeCount; i++) {
                const node = nodes[i];
                node.pos.add(node.velocity);

                if (node.pos.length() > 95) {
                    node.velocity.reflect(node.pos.clone().normalize()).multiplyScalar(0.9);
                }

                posArr[i * 3] = node.pos.x;
                posArr[i * 3 + 1] = node.pos.y;
                posArr[i * 3 + 2] = node.pos.z;
            }
            posAttr.needsUpdate = true;

            // Update Dynamic Synaptic Connections
            let connectionCount = 0;
            const linePosArr = lineGeometry.attributes.position.array as Float32Array;
            const lineColArr = lineGeometry.attributes.color.array as Float32Array;

            const baseLineCol = new THREE.Color(currentPalette.line);

            for (let i = 0; i < nodeCount; i++) {
                for (let j = i + 1; j < nodeCount; j++) {
                    const dist = nodes[i].pos.distanceTo(nodes[j].pos);
                    if (dist < synapseDensity) {
                        const alpha = 1.0 - dist / synapseDensity;
                        const idx = connectionCount * 6;

                        linePosArr[idx] = nodes[i].pos.x;
                        linePosArr[idx + 1] = nodes[i].pos.y;
                        linePosArr[idx + 2] = nodes[i].pos.z;

                        linePosArr[idx + 3] = nodes[j].pos.x;
                        linePosArr[idx + 4] = nodes[j].pos.y;
                        linePosArr[idx + 5] = nodes[j].pos.z;

                        const dimmedCol = baseLineCol.clone().multiplyScalar(alpha);

                        lineColArr[idx] = dimmedCol.r;
                        lineColArr[idx + 1] = dimmedCol.g;
                        lineColArr[idx + 2] = dimmedCol.b;

                        lineColArr[idx + 3] = dimmedCol.r;
                        lineColArr[idx + 4] = dimmedCol.g;
                        lineColArr[idx + 5] = dimmedCol.b;

                        connectionCount++;

                        // Occasionally spawn background pulses
                        if (Math.random() < 0.0003 * pulseSpeed && activePulses.length < maxPulses) {
                            activePulses.push({
                                fromIndex: i,
                                toIndex: j,
                                progress: 0,
                                speed: (0.01 + Math.random() * 0.015) * pulseSpeed,
                            });
                        }
                    }
                }
            }

            lineGeometry.setDrawRange(0, connectionCount * 2);
            lineGeometry.attributes.position.needsUpdate = true;
            lineGeometry.attributes.color.needsUpdate = true;

            // Update Pulses
            const pulsePosArr = pulseGeometry.attributes.position.array as Float32Array;
            let activeCount = 0;

            activePulses = activePulses.filter(pulse => {
                pulse.progress += pulse.speed;
                if (pulse.progress >= 1.0) return false;

                const fromPos = nodes[pulse.fromIndex]?.pos;
                const toPos = nodes[pulse.toIndex]?.pos;
                if (!fromPos || !toPos) return false;

                const currX = fromPos.x + (toPos.x - fromPos.x) * pulse.progress;
                const currY = fromPos.y + (toPos.y - fromPos.y) * pulse.progress;
                const currZ = fromPos.z + (toPos.z - fromPos.z) * pulse.progress;

                if (activeCount < maxPulses) {
                    pulsePosArr[activeCount * 3] = currX;
                    pulsePosArr[activeCount * 3 + 1] = currY;
                    pulsePosArr[activeCount * 3 + 2] = currZ;
                    activeCount++;
                }

                return true;
            });

            pulseGeometry.setDrawRange(0, activeCount);
            pulseGeometry.attributes.position.needsUpdate = true;

            renderer.render(scene, camera);
        };

        animate(performance.now());

        // Cleanup
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            domElem.removeEventListener('pointerdown', handlePointerDown);
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
            renderer.dispose();
            pointGeometry.dispose();
            lineGeometry.dispose();
            pulseGeometry.dispose();
            pointMaterial.dispose();
            lineMaterial.dispose();
            pulseMaterial.dispose();
            particleTexture.dispose();
        };
    }, [theme, synapseDensity, pulseSpeed, nodeCount]);

    return (
        <div className="relative w-full rounded-2xl overflow-hidden border border-gray-800 bg-gray-950 font-sans shadow-2xl">
            {/* 3D Canvas Mount Point */}
            <div 
                ref={containerRef} 
                className={`w-full ${compact ? 'h-72' : 'h-[480px] sm:h-[540px]'} cursor-grab active:cursor-grabbing`}
            />

            {/* Live Stats Overlay HUD */}
            <div className="absolute top-4 left-4 z-10 pointer-events-none flex flex-col gap-1.5 font-mono text-xs">
                <div className="flex items-center space-x-2 px-2.5 py-1 rounded-md bg-gray-950/80 border border-gray-800 backdrop-blur-md text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span className="font-bold">WebGL Synapse Engine</span>
                </div>
                <div className="flex items-center space-x-3 px-2.5 py-1 rounded-md bg-gray-950/80 border border-gray-800 backdrop-blur-md text-gray-400 text-[11px]">
                    <span>FPS: <strong className="text-white">{fps}</strong></span>
                    <span>Nodes: <strong className="text-white">{nodeCount}</strong></span>
                    <span>Pulses Fired: <strong className="text-emerald-300">{firingCount}</strong></span>
                </div>
            </div>

            {/* Interactive Control Dock */}
            {interactiveControls && (
                <div className="p-4 sm:p-5 border-t border-gray-800/80 bg-gray-950/90 backdrop-blur-xl flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => triggerPulseRef.current?.()}
                            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold text-xs transition-all shadow-lg shadow-emerald-500/20 active:scale-95 cursor-pointer"
                        >
                            <FiZap className="w-4 h-4" />
                            <span>Fire Action Potential</span>
                        </button>

                        {/* Theme Picker */}
                        <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-gray-900 border border-gray-800">
                            {(['emerald', 'cyan', 'violet'] as const).map(t => (
                                <button
                                    key={t}
                                    onClick={() => setTheme(t)}
                                    className={`px-2.5 py-1 rounded-lg text-xs font-mono capitalize transition-all cursor-pointer ${
                                        theme === t
                                            ? 'bg-gray-800 text-white font-bold border border-gray-700'
                                            : 'text-gray-400 hover:text-gray-200'
                                    }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Sliders */}
                    <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-gray-400">
                        <div className="flex items-center space-x-2">
                            <span>Density:</span>
                            <input
                                type="range"
                                min="25"
                                max="70"
                                value={synapseDensity}
                                onChange={e => setSynapseDensity(Number(e.target.value))}
                                className="w-24 accent-emerald-400 cursor-pointer"
                            />
                            <span className="text-gray-200 w-6">{synapseDensity}</span>
                        </div>

                        <div className="flex items-center space-x-2">
                            <span>Velocity:</span>
                            <input
                                type="range"
                                min="0.5"
                                max="2.5"
                                step="0.1"
                                value={pulseSpeed}
                                onChange={e => setPulseSpeed(Number(e.target.value))}
                                className="w-24 accent-emerald-400 cursor-pointer"
                            />
                            <span className="text-gray-200 w-6">{pulseSpeed}x</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
