import { ChartData } from "./globalChart";
import { PanelRow } from "./panel";

export interface ThemesData {
  doughnuts: ChartData[];
  pie: ChartData;
  panel: {
    rows: PanelRow[];
  };
}
