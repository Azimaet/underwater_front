import { ChartData } from "./globalChart";
import { PanelData } from "./panel";

export interface DepthData {
  pie: ChartData;
  line: ChartData;
  panel: PanelData;
}
