import { ChartData } from "./globalChart";
import { PanelRow } from "./panel";

export interface DepthData {
  pie: ChartData;
  line: ChartData;
  panel: {
    rows: PanelRow[];
  };
}
