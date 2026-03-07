import { StateGraph, END } from "@langchain/langgraph";
import { AppState } from "../state/appState";
import { supervisor } from "../agents/supervisor";
import { researcher } from "../agents/agent-a";

function route(state: any) {
  const last = state.messages[state.messages.length - 1];
  if (!last?.content) return END;

  console.log("Route sees:", last.content);

  let decision;
  try {
    decision = JSON.parse(last.content as string);
  } catch {
    console.log("Bad JSON - ending");
    return END;
  }

  console.log("Decision next:", decision.next);

  if (decision.next === "FINISH") return END;
  if (decision.next === "researcher") return "researcher";
  return END;
}

const workflow = new StateGraph(AppState)
  .addNode("supervisor", supervisor)
  .addNode("researcher", researcher)
  .addEdge("__start__", "supervisor")
  .addConditionalEdges("supervisor", route, {
    researcher: "researcher",
    [END]: END,
  })
  .addEdge("researcher", END); // end after researcher for now

export const graph = workflow.compile();