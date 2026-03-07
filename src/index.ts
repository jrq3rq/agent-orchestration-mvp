import "dotenv/config";
import { graph } from "./graphs/mainGraph";

async function main() {
  const initialState = {
    input: "Summarize the benefits of multi-agent systems",
    messages: [],
    history: [],
    results: "",
  };

  console.log("Starting graph...");
  console.log("Initial input:", initialState.input);
  console.log("Full initial state:", JSON.stringify(initialState, null, 2));

  try {
    const result = await graph.invoke(initialState, {
      recursionLimit: Number(process.env.RECURSION_LIMIT) || 20,
    });

    console.log("\nFinal output:", result.results || "No results");
    console.log("\nHistory:", result.history);
  } catch (error) {
    console.error("Graph failed:", error);
  }
}

main().catch(console.error);