import { Gas } from "./gas";
import { Theme } from "./theme";
import { Environment } from "./environment";

export interface Dive {
  id: string;
  user: string;
  createdAt: Date;
  updatedAt: Date;
  date: Date;
  gas: Gas[];
  themes: Theme[] | [];
  role: string | undefined;
  maxDepth: number;
  totalTime: number;
  temperature: string | undefined;
  environment: Environment;
  spot: undefined;
}
