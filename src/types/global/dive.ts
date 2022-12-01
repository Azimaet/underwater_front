import { DivingThemeInterface } from "@/types/global/divingTheme";
import { GasTank } from "@/types/global/gas";

export interface DiveInterface {
  id: number | null;
  uuid: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  date: Date | string;
  totalTime: number;
  maxDepth: number;
  gasTanks: GasTank[];
  divingType: DivingThemeInterface[];
  divingEnvironment: DivingThemeInterface | null;
  divingRole: DivingThemeInterface | null;
  owner: string | null;
}
