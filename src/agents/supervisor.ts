import { ChatXAI } from "@langchain/xai";
import { supervisorPrompt } from "../utils/prompts";

const llm = new ChatXAI({
  model: process.env.GROK_MODEL || "grok-beta",
  temperature: 0.0,
});

export async function supervisor(state: any) {
  console.log("Supervisor input:", state.input);

  const chain = supervisorPrompt.pipe(llm);

  const response = await chain.invoke({ input: state.input });

  console.log("Grok response:", response.content);

  let decision = { next: "FINISH", reason: "Fallback" };

  try {
    let content = response.content as string;

    // Cleanup for Grok wrappers
    content = content
      .replace(/^\s*```json\s*/i, '')
      .replace(/\s*```$/i, '')
      .replace(/^json\s*/i, '')
      .trim();

    decision = JSON.parse(content);
    console.log("Parsed decision:", decision);
  } catch (e: unknown) {
    console.error("Parse failed:", e instanceof Error ? e.message : String(e));
    console.error("Raw content:", response.content);
  }

  return {
    messages: state.messages.concat(response),
    history: state.history.concat(`Supervisor → ${decision.next}`),
    next: decision.next,
  };
}