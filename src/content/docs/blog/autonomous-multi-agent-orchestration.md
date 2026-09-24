---
title: "Designing Autonomous Multi-Agent Orchestration with Live Telemetry"
description: "Inside KendaliAI: How specialized agent personas, event-driven task loops, and sandboxed worktrees enable safe, autonomous engineering."
date: 2026-09-24T08:00:00.000Z
authors:
    - lutfi
tags:
    - AI
    - Agents
    - TypeScript
cover:
    image: /assets-img/kendaliai-dashboard.png
    alt: KendaliAI Control Center
---

As large language models evolve from simple chat completions into autonomous execution engines, monolithic prompts quickly fail on complex, real-world development tasks. Building reliable multi-agent workflows requires structured decomposition, discrete role personas, and strict sandbox safety guards.

This is the core architecture behind **KendaliAI** — our control center platform for supervising, orchestrating, and inspecting autonomous AI engineering agents.

![KendaliAI Control Center](/assets-img/kendaliai-dashboard.png)

## Persona Specialization & Decomposition

Rather than assigning one general model to handle planning, coding, reviewing, and deployment, KendaliAI separates responsibilities into specialized agent personas:

- **Planner Agent**: Analyzes requirements, checks repository constraints, and decomposes the goal into a DAG (Directed Acyclic Graph) of independent steps.
- **Coder Agent**: Executes in isolated Git worktrees, writing code against established unit tests and style guides.
- **Reviewer Agent**: Audits code diffs for security regressions, static typing errors, and adherence to performance budgets.
- **Research Agent**: Scrapes external documentation and queries local Vector RAG indexes for context synthesis.

![KendaliAI Agent Execution](/assets-img/kendaliai-chat.png)

## Safe Execution with Git Worktrees & Telemetry

Giving autonomous agents shell access demands strict boundaries:

1. **Isolated Worktrees**: All file mutations occur in temporary git worktrees (`git worktree add -b task-...`). If an agent produces broken code or hallucinated refactors, the branch is discarded with zero damage to the main branch.
2. **Live WebSocket Telemetry**: Every tool call, thought stream, and CPU/memory fluctuation is streamed over a real-time event bus to the KendaliAI dashboard.
3. **Policy Guard Hooks**: Pre-execution security filters prevent catastrophic commands (e.g. destructive deletions, unauthorized external network requests).

## Future Directions

Autonomous agents perform best when their workspace provides instant feedback loops — fast compilers, granular test suites, and transparent telemetry. Providing models with rich sensory tools is what unlocks true engineering autonomy.
