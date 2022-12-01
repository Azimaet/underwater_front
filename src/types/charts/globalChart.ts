export interface ChartDatasets {
  id?: string;
  label?: string;
  token?: string[];
  backgroundColor: string[];
  borderColor?: string[];
  pointBackgroundColor?: string[];
  data: number[];
  percentage?: number[];
}

export interface ChartData {
  labels: string[];
  datasets: ChartDatasets[];
}
