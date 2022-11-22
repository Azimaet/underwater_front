import { ChartData } from "./globalChart";
import { PanelRow } from "./panel";

export interface ThemesData {
  doughnuts: ChartData[];
  progress: ChartData;
  panel: {
    rows: PanelRow[];
  };
}
