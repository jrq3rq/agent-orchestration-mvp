import { ChatXAI } from "@langchain/xai";
import { supervisorPrompt } from "../utils/prompts";

const llm = new ChatXAI({
  model: process.env.GROK_MODEL || "grok-beta",
  temperature: 0.0,
});

export async function supervisor(state: any) {
  console.log("Supervisor input:", state.input);

  const chain = supervisorPrompt.pipe(llm);

  const response = await chain.invoke({
    input: state.input,
    iterations: state.iterations || 0,
    results: state.results || "No results yet",
  });

  console.log("Grok response:", response.content);

  let decision = { next: "FINISH", reason: "Fallback" };

  try {
    let content = response.content as string;
    content = content.trim();

    if (content.startsWith('"') && content.endsWith('"')) content = content.slice(1, -1);
    if (!content.startsWith('{')) content = '{' + content;
    if (!content.endsWith('}')) content = content + '}';

    content = content
      .replace(/^\s*```json\s*/i, '')
      .replace(/\s*```$/i, '')
      .replace(/^json\s*/i, '')
      .replace(/[\n\r\t]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    decision = JSON.parse(content);
    console.log("Parsed decision:", decision);
  } catch (e: unknown) {
    console.error("Parse error:", e instanceof Error ? e.message : String(e));
    console.error("Raw content:", response.content);
  }

  return {
    messages: state.messages.concat(response),
    history: state.history.concat(`Supervisor → ${decision.next}`),
    next: decision.next,
    iterations: (state.iterations || 0) + 1,  // ← increment here
  };
}