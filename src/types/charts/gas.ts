import { PanelRow } from "./panel";

export interface GasConsumptionItem {
  pressure: number;
  label: string;
  barPerHour: number;
}

export interface GasPieItem {
  label: string;
  color: string;
  quantity: number;
}

export interface GasPieDatasets {
  backgroundColor: string[];
  data: number[];
}

export interface GasData {
  pie: {
    labels: string[];
    datasets: GasPieDatasets[];
  };
  line: object;
  panel: {
    rows: PanelRow[];
  };
}
