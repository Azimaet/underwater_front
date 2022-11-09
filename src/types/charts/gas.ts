import { PanelRow } from "./panel";

export interface GasConsumptionItem {
  pressure: number;
  label: string;
  barPerHour: number;
}

export interface GasDoughnutItem {
  label: string;
  color: string;
  quantity: number;
}

export interface GasPieDatasets {
  backgroundColor: string[];
  data: number[];
}

export interface GasData {
  doughnut: {
    labels: string[];
    datasets: GasPieDatasets[];
  };
  line: object;
  panel: {
    rows: PanelRow[];
  };
}
