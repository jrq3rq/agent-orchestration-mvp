import { ChatXAI } from "@langchain/xai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const criticPrompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a critic. Review the research summary and suggest improvements, flaws, or missing points. Output plain text only."],
  ["human", "{research}"],
]);

const llm = new ChatXAI({
  model: process.env.GROK_MODEL || "grok-beta",
  temperature: 0.0,
});

export async function critic(state: any) {
  console.log("Critic reviewing:", state.results);

  const chain = criticPrompt.pipe(llm);
  const response = await chain.invoke({ research: state.results });

  console.log("Critic response:", response.content);

  return {
    messages: state.messages.concat(response),
    history: state.history.concat("Critic completed"),
    results: state.results + `\nCritique: ${response.content}`,
    // iterations: (state.iterations || 0) + 1,
  };
}