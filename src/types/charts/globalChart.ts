export interface ChartDatasets {
  label?: string;
  backgroundColor: string[];
  data: number[];
}

export interface ChartData {
  labels: string[];
  datasets: ChartDatasets[];
}
