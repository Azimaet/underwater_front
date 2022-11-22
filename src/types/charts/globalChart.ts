export interface ChartDatasets {
  label?: string;
  token?: string[];
  backgroundColor: string[];
  data: number[];
  percentage?: number[];
}

export interface ChartData {
  labels: string[];
  datasets: ChartDatasets[];
}
