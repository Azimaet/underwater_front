import { DivingThemeInterface } from "./divingTheme";
import { GasInterface } from "./gas";

export interface DiveInterface {
  readonly id?: number;
  readonly uuid?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  date: Date;
  totalTime: number;
  maxDepth: number;
  gas: GasInterface[];
  divingType: DivingThemeInterface[] | [];
  divingEnvironment: DivingThemeInterface;
  divingRole: DivingThemeInterface;
  user: object;
}

export class Dive implements DiveInterface {
  id?: number | undefined;
  uuid?: string | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  date!: Date;
  totalTime!: number;
  maxDepth!: number;
  gas!: GasInterface[];
  divingType: any;
  divingEnvironment!: DivingThemeInterface;
  divingRole!: DivingThemeInterface;
  user!: object;
}
