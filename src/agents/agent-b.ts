import { ChatXAI } from "@langchain/xai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const criticPrompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a critic. Review the research and suggest improvements or flaws."],
  ["human", "{input}"],
]);

const llm = new ChatXAI({ model: "grok-beta", temperature: 0.0 });

export async function critic(state: any) {
  const chain = criticPrompt.pipe(llm);
  const response = await chain.invoke({ input: state.results });

  return {
    messages: state.messages.concat(response),
    history: state.history.concat("Critic completed"),
    results: state.results + `\nCritique: ${response.content}`,
  };
}