import { Annotation } from "@langchain/langgraph";

export const AppState = Annotation.Root({
  messages: Annotation<Array<any>>({
    reducer: (x, y) => x.concat(y),
    default: () => [],
  }),
  input: Annotation<string>(),
  results: Annotation<string>(),
  history: Annotation<string[]>({
    reducer: (x, y) => x.concat(y),
    default: () => [],
  }),
});