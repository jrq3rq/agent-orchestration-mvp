import { ChatXAI } from "@langchain/xai";
import { researcherPrompt } from "../utils/prompts";

const llm = new ChatXAI({
  model: process.env.GROK_MODEL || "grok-beta",
  temperature: 0.0,
});

export async function researcher(state: any) {
  console.log("Researcher input:", state.input);

  const chain = researcherPrompt.pipe(llm);
  const response = await chain.invoke({ input: state.input });

  console.log("Researcher response:", response.content);

  return {
    messages: state.messages.concat(response),
    history: state.history.concat("Researcher completed"),
    results: (state.results || "") + `\nResearch: ${response.content}`,
  };
}