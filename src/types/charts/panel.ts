export interface PanelCol {
  title: string;
  subtitle: string[];
  highlight?: boolean;
}

export interface PanelRow {
  cols: PanelCol[];
}
