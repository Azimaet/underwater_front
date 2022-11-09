import { PanelRow } from "./panel";

export interface GasConsumptionItem {
  startPressure: number;
  endPressure: number;
  pressure: number;
  label: string;
  barPerHour: number;
  date: string;
  tanks: number;
}

export interface GasDoughnutItem {
  label: string;
  color: string;
  quantity: number;
}

export interface GasPieDatasets {
  label?: string;
  backgroundColor: string[];
  data: number[];
}

export interface GasData {
  doughnut: {
    labels: string[];
    datasets: GasPieDatasets[];
  };
  bar: {
    labels: string[];
    datasets: GasPieDatasets[];
  };
  panel: {
    rows: PanelRow[];
  };
}
