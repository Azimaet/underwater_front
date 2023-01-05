import { PanelData } from "./panel";

/** Locals Items */
export interface DateItem {
  date: string;
  count: number | unknown;
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
  panel: PanelData;
}
