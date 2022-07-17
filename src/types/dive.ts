import { Gas } from "./gas";
import { Theme } from "./theme";
import { Environment } from "./environment";

export interface Dive {
  id: number;
  date: Date;
  gas: Gas[];
  themes: Theme[];
  maxDepth: number;
  totalTime: number;
  status: string | undefined;
  temperature: string | undefined;
  environment: Environment;
}
