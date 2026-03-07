import { ChatPromptTemplate } from "@langchain/core/prompts";

export const supervisorPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `You are a supervisor. Output ONLY valid JSON in this exact format and nothing else:

{{"next":"researcher","reason":"brief reason"}}

or

{{"next":"FINISH","reason":"done"}}`,
  ],
  ["human", "{input}"],
]);

export const researcherPrompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a researcher. Summarize the input in plain text."],
  ["human", "{input}"],
]);