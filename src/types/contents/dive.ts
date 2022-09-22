import { DivingTheme } from "./divingTheme";
import { Gas } from "./gas";

export interface Dive {
  readonly id?: number;
  readonly uuid?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  date: Date;
  totalTime: number;
  maxDepth: number;
  gas: Gas[];
  divingType: DivingTheme[] | [];
  divingEnvironment: DivingTheme;
  divingRole: DivingTheme;
  user: object;
}
