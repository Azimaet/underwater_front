import { DivingThemeInterface } from "@/composables/types/divingTheme";
import { GasTank } from "@/composables/types/gas";

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

// type DiveDeserialized = Partial<DiveInterface> & {
//   __typename: string;
// };

interface DiveEdge {
  __typename: string;
  node: Partial<DiveInterface>;
}

export interface DivesCollection {
  __typename: string;
  edges: DiveEdge[];
}
