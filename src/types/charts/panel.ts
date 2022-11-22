import { CalendarHighlightItem } from "./calendar";

export interface PanelCol {
  title: string;
  subtitle: string[] | CalendarHighlightItem[];
  highlight?: boolean;
  dropdown?: boolean;
}

export interface PanelRow {
  cols: PanelCol[];
}
