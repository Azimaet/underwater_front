import { PanelRow } from "./panel";

/** Locals Items */
export interface DateItem {
  date: string;
  count: number;
}

export interface CalendarHighlightItem {
  title: string;
  subtitle: number;
}

export interface CalendarData {
  heatmap: {
    items: DateItem[];
    endDate: Date;
    colors: any[];
  };
  panel: {
    rows: PanelRow[];
  };
}
