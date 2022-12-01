export interface ChartDatasets {
  id?: string;
  label?: string;
  token?: string[];
  backgroundColor: string[];
  borderColor?: string[];
  pointBackgroundColor?: string[];
  data: number[];
  customData?: object[];
  percentage?: number[];
  fill?: boolean;
}

export interface ChartData {
  labels: string[];
  datasets: ChartDatasets[];
}
