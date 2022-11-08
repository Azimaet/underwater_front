import { PanelRow } from "./panel";

/** Locals Items */
export interface DateItem {
  date: Date;
  count: number;
}

export interface CalendarHighlightItem {
  title: string;
  subtitle: number;
}

/** Global Interfaces */
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
