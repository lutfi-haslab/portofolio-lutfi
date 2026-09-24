---
title: "Architecture Notes: Designing an Ultra-Low Footprint AI Gateway in Go"
description: "How we engineered MyAiRouter to achieve sub-20ms proxy overhead, multi-provider load balancing, and intelligent model failovers with minimal RAM."
date: 2026-09-24T09:00:00.000Z
authors:
    - lutfi
tags:
    - Architecture
    - AI
    - Go
    - Performance
cover:
    image: /assets-img/myairouter.jpg
    alt: MyAiRouter Architecture
---

In modern AI engineering pipelines, routing requests across disparate model providers (OpenAI, Anthropic Claude, Google Gemini, and local Ollama instances) introduces significant architectural challenges. Many off-the-shelf gateways run on heavy runtime stacks that consume hundreds of megabytes of RAM and introduce noticeable request latency.

With **MyAiRouter**, our architectural goal was simple: **maximum performance, resilient automatic failovers, and an ultra-low system footprint** under 30MB of resident memory.

![MyAiRouter Dashboard](/assets-img/myairouter.jpg)

## Core Architectural Principles

When building a high-throughput gateway proxy, three constraints dictate the design:

### 1. Connection Pooling & HTTP/2 Multiplexing
Establishing TLS handshakes on every outgoing LLM API request degrades throughput severely. By implementing custom Go HTTP transport pools with persistent keep-alive connections, upstream latency overhead was reduced by up to **65%**:

```go
// Custom HTTP Client Transport with connection pooling
transport := &http.Transport{
    MaxIdleConns:        1000,
    MaxIdleConnsPerHost: 250,
    IdleConnTimeout:     90 * time.Second,
    TLSHandshakeTimeout: 5 * time.Second,
    ForceAttemptHTTP2:   true,
}
```

### 2. Zero-Allocation Streaming Proxy
AI models generate tokens asynchronously over Server-Sent Events (SSE). Buffering the entire response body before forwarding to the client destroys time-to-first-token (TTFT). 

MyAiRouter leverages zero-copy buffer pools via `sync.Pool` and stream piping directly from the upstream provider to the client response writer, keeping proxy latency under **18ms**.

### 3. Heuristic Routing & Circuit Breaking
When an upstream provider returns HTTP 429 (Rate Limited) or 503 (Overloaded), the gateway's built-in circuit breaker intercepts the error within 5ms and reroutes the active payload to the fallback provider without interrupting the client connection.

## Conclusion

Choosing Go over Node.js or Python for the gateway proxy allowed us to handle thousands of requests per second with negligible garbage collection pauses. Clean concurrency patterns and minimal memory allocations remain the foundation for scalable AI infrastructure.
