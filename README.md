# Agent Orchestration

Standalone prototype to learn and test multi-agent workflows using **Grok + LangGraph.js**.

### Purpose

A simple, standalone prototype to explore and learn multi-agent orchestration using Grok + LangGraph.js.

Perfect for:
- Beginners wanting to understand agentic workflows hands-on
- Developers prototyping controllable, stateful multi-agent systems
- Anyone experimenting with Grok before building production agents

Open source – fork, tweak, and share your own flows!

---

### Tech Stack

* **Runtime:** Node.js 20+ / TypeScript
* **Orchestration:** LangGraph.js (`@langchain/langgraph`)
* **LLM:** Grok via `@langchain/xai`
* **Utilities:** `dotenv`, `zod`

---

### Setup

```bash
git clone <repo>
cd agent-orchestration-mvp
npm install
cp .env.example .env          # add XAI_API_KEY

```

---

### npm Scripts

```bash
npm run dev     # Run with auto-reload (nodemon)
npm run test    # Run Vitest tests
npm run build   # Compile TypeScript (tsc)

```

---

### Key Dependencies

* **`@langchain/langgraph`** – Graph orchestration and state management
* **`@langchain/xai`** – Grok LLM integration
* **`@langchain/core`** – Prompts, messages, and base interfaces
* **`dotenv`** – Environment variable management
* **`zod`** – Schema validation for state and tool inputs

---

### Core Files

| File | Responsibility |
| --- | --- |
| `src/state/appState.ts` | Shared state schema (StateGraph definition) |
| `src/graphs/mainGraph.ts` | Main workflow graph, nodes, and edges |
| `src/agents/` | Individual agent definitions and logic |
| `src/rag/retriever.ts` | Basic local RAG implementation |
| `src/index.ts` | Entry point for running flows |

---

### Structure

```markdown
Big Goal
   ↓
Decompose ──► many sub-tasks
               │
               ├─► parallel execution (fan-out)
               │      ↓
               └─► many outputs
                      ↓
                 Verify / Judge / Vote / Evaluate
                      ↓
            Good enough? ──Yes──► Done
                      │
                     No
                      ↓
           Refine plan + Iterate (re-decompose)
```

```markdown
agent-orchestration-mvp/                      # Standalone prototype – learn multi-agent orchestration with Grok
├── src/                                      # All source code
│   ├── agents/                               # Individual agent nodes – each calls Grok with its own prompt
│   │   ├── agent-a.ts                        # Example agent A: main processor / primary output
│   │   ├── agent-b.ts                        # Example agent B: analyzer / refiner
│   │   ├── supervisor.ts                     # Supervisor: decides routing, validates outputs
│   │   └── agent-c.ts                        # Optional third agent – add when testing complex flows
│   ├── graphs/                               # Graph definitions & workflow logic
│   │   ├── mainGraph.ts                      # Main StateGraph – connects nodes, edges, routing
│   │   └── workflows/                        # Optional: separate files for different test workflows
│   │       └── exampleWorkflow.ts            # One workflow example – keeps mainGraph clean
│   ├── state/                                # Shared state for the entire graph
│   │   └── appState.ts                       # Defines state shape (input, results, history, messages)
│   ├── rag/                                  # Basic local RAG simulation – privacy-first
│   │   ├── retriever.ts                      # Retrieves context from local data or mock files
│   │   └── mockData/                         # Sample JSON data for testing retrieval
│   │       └── sampleContext.json            # Dummy context file – replace with real test data
│   ├── utils/                                # Helper functions used across agents/graphs
│   │   ├── prompts.ts                        # All Grok prompt templates in one place
│   │   ├── logger.ts                         # Simple logging for debugging
│   │   └── types.ts                          # Shared TypeScript types/interfaces
│   ├── tools/                                # Optional: tools Grok can call (validators, APIs…)
│   │   └── exampleTool.ts                    # Placeholder – add real tools later
│   ├── index.ts                              # Entry point – runs sample flows from terminal
│   └── config.ts                             # Constants (model name, temp, max tokens…)
├── tests/                                    # Unit & integration tests
│   ├── agents/                               # Test agents one by one
│   │   └── agent-a.test.ts                   # Example test for agent-a
│   └── graphs/                               # Test full graph flows
│       └── mainGraph.test.ts                 # End-to-end graph execution test
├── data/                                     # Local test data – no real user info
│   └── mockInputs/                           # JSON files that simulate inputs
│       └── scenario1.json                    # Example input JSON to trigger a flow
├── .env                                      # Secrets – XAI_API_KEY goes here
├── .env.example                              # Template for .env – safe to commit
├── package.json                              # Dependencies & scripts
├── tsconfig.json                             # TypeScript settings (strict mode, ESM)
├── vitest.config.ts                          # Vitest config (globals, setup, timeout)
├── .prettierrc                               # Prettier config
├── .eslintrc.json                            # ESLint config
├── LICENSE                                   # MIT license
├── README.md                                 # Basic setup & run instructions
└── .gitignore                                # Ignores node_modules, .env, etc.
```

---

### Troubleshooting

* **`401 Unauthorized`** → Double-check your `XAI_API_KEY` in the `.env` file.
* **Rate limit errors** → Reduce `recursionLimit` in your graph or add manual delays.
* **Type errors** → Run `npm install` again or verify `tsconfig.json` settings.

---

### Next Steps

1. **Define** your first workflow in `mainGraph.ts`.
2. **Add** agents as needed to handle specialized tasks.
3. **Test** with mock inputs located in `/data/mockInputs/`.
4. **Observe** Grok calls and state transitions in the console.

> **Note:** This is a minimal, focused prototype. Expand the architecture only as needed for your specific use case.

---
