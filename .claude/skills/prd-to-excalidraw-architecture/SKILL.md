---
name: prd-to-excalidraw-architecture
description: Generate a production-grade architecture diagram for Excalidraw from a PRD, focusing on services, data flow, dependencies, observability, security boundaries, and deployment topology.
---

# PRD to Excalidraw Architecture Skill

## Purpose

Convert a Product Requirements Document into a clear, reviewable architecture diagram that can be opened in Excalidraw.

The output must not be a vague box diagram. It must reflect real software engineering decisions.

## Inputs Expected

The user may provide:

- PRD text
- feature description
- system requirements
- non-functional requirements
- existing architecture notes
- constraints
- cloud/provider preference
- deployment model

If critical information is missing, make reasonable assumptions and list them explicitly.

## Core Workflow

Follow this sequence every time:

1. Read and summarize the PRD.
2. Extract functional requirements.
3. Extract non-functional requirements.
4. Identify actors and external systems.
5. Identify core services/components.
6. Identify data stores.
7. Identify sync and async flows.
8. Identify security boundaries.
9. Identify observability points.
10. Identify deployment/runtime boundaries.
11. Generate a logical architecture.
12. Generate a deployment architecture if relevant.
13. Produce Excalidraw-ready output.
14. Include a short explanation of the diagram.

## Engineering Extraction Rules

From the PRD, extract:

### Actors

- end users
- admins
- operators
- external clients
- partner systems
- background jobs
- AI agents if applicable

### Components

For each component, identify:

- responsibility
- owner boundary
- input
- output
- dependency
- scaling concern
- failure mode

### Data Stores

For each store, identify:

- type
- data owned
- consistency model
- retention expectation
- read/write pattern
- backup/restore concern

### APIs

For each API boundary, identify:

- caller
- callee
- protocol
- sync/async nature
- auth mechanism
- rate limiting
- timeout expectations

### Messaging

For queues/events/streams, identify:

- producer
- consumer
- event type
- ordering requirement
- idempotency requirement
- retry/dead-letter handling

### Observability

Every production diagram must include:

- logs
- metrics
- traces
- dashboards
- alerts
- correlation ID propagation
- audit trail where applicable

### Security

Every production diagram must include:

- identity provider
- auth boundary
- secrets/key management
- network boundary
- data encryption
- admin/control plane distinction
- PII/sensitive data boundary if applicable

## Diagram Quality Bar

The diagram must be:

- simple enough to explain in 5 minutes
- detailed enough for engineering review
- split into zones or swimlanes
- explicit about data flow direction
- explicit about sync vs async calls
- explicit about external dependencies
- explicit about observability and security
- free from decorative noise

Avoid:

- generic “backend service” boxes
- unexplained arrows
- over-fragmented microservices
- missing data stores
- missing failure boundaries
- missing observability

## Excalidraw Output Requirements

Preferred output is an `.excalidraw` JSON file.

The JSON must include:

- type: "excalidraw"
- version
- source
- elements
- appState
- files

Use clear grouping:

- Client / User Layer
- Edge / API Layer
- Service Layer
- Data Layer
- Async Processing Layer
- Observability Layer
- Security / Control Plane
- External Systems

Use consistent layout:

- left to right for request flow
- top to bottom for control/observability concerns
- dashed arrows for async/event flow
- solid arrows for synchronous request/response
- lock icon/text for security boundaries
- eye/metrics labels for observability

## Output Format

Return:

1. Assumptions
2. Architecture summary
3. Component list
4. Key flows
5. Excalidraw JSON
6. Review checklist

## Review Checklist

Before finalizing, verify:

- Does every major requirement map to a component?
- Are all external systems shown?
- Are data stores owned by a clear component?
- Are sync and async flows distinguishable?
- Are retries, DLQ, or idempotency shown where needed?
- Are observability points shown?
- Are security boundaries shown?
- Is the diagram explainable by a Principal Engineer?
- Is the diagram readable in Excalidraw?
