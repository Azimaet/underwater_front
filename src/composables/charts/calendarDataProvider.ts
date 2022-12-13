import {
  CalendarData,
  CalendarHighlightItem,
  DateItem,
} from "@/types/charts/calendar";

import { ApolloQueryResult } from "@apollo/client";
import { Colors } from "@/plugins/utils/colors";
import { DiveInterface } from "@/types/global/dive";
import { PanelData } from "@/types/charts/panel";
import format from "date-fns/format";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useDivesCollectionLoader } from "../utils/divesCollectionLoader";

/**
 * Date Highlighter function.
 * @param {ApolloQueryResult} collection ApolloQueryResult
 * @return {CalendarData}
 */
export function useCalendarDataProvider(
  collection: ApolloQueryResult<any>
): CalendarData {
  type ReduceAccumulator = Record<
    string,
    Record<string, Record<string, Pick<DiveInterface, "date">[]>>
  >;

  function countPerDays(): DateItem[] {
    const items: DateItem[] = [];

    dives.forEach((dive) => {
      if (dive.date) {
        const date = dive.date.toString().split("T")[0];

        const isFound = items.some((element) => {
          if (element.date.toString() === date) {
            return element;
          }

          return false;
        });

        if (isFound) {
          const item = items.find((item) => item.date.toString() === date);

          if (item) {
            item.count++;
          }
        } else {
          items.push({
            date: date,
            count: 1,
          });
        }
      }
    });

    return items;
  }

  function groupDates(): ReduceAccumulator {
    return dives.reduce((response: ReduceAccumulator, dive) => {
      const date = new Date(dive.date);
      const year = date.getFullYear();
      const month = date.getMonth();

      response[year]
        ? response[year][month]
          ? response[year][month].data.push(dive)
          : (response[year][month] = { data: [dive] })
        : (response[year] = { [month]: { data: [dive] } });

      return response;
    }, {});
  }

  function computeDivesPerMonth(): number {
    const startDate = new Date(dives[0].date);
    const now = new Date();

    return (
      dives.length /
      (now.getMonth() -
        startDate.getMonth() +
        12 * (now.getFullYear() - startDate.getFullYear()))
    );
  }

  function loadPanelData(): PanelData {
    const statYears: CalendarHighlightItem[] = [];
    const datesGroups = groupDates();
    const highlightMonth: CalendarHighlightItem = {
      title: "",
      subtitle: 0,
    };

    Object.keys(datesGroups).forEach((key: string) => {
      const year = datesGroups[key as keyof typeof datesGroups];
      let yearCount = 0;

      Object.keys(year).forEach((subKey: string) => {
        const month = year[subKey]["data"] as [];
        yearCount = yearCount + month.length;

        if (month.length > highlightMonth.subtitle) {
          highlightMonth.subtitle = month.length;
          highlightMonth.title = format(
            new Date(parseInt(key), parseInt(subKey), 1),
            "MMM, yyyy"
          );
        }
      });

      statYears.push({
        title: key,
        subtitle: yearCount,
      });
    });

    const mostDivedMonth = () => {
      return highlightMonth.title + " (" + highlightMonth.subtitle + "dives)";
    };

    const mostDivedYear = () => {
      return (
        statYears.reduce((prev, current) =>
          prev.subtitle > current.subtitle ? prev : current
        ).title +
        " (" +
        statYears.reduce((prev, current) =>
          prev.subtitle > current.subtitle ? prev : current
        ).subtitle +
        "dives)"
      );
    };

    return {
      rows: [
        {
          cols: [
            {
              title: "Last Dive",
              subtitle: [
                formatDistanceToNow(new Date(dives[dives.length - 1].date)) +
                  " ago.",
              ],
            },
            {
              title: "First Dive",
              subtitle: [
                formatDistanceToNow(new Date(dives[0].date)) + " ago.",
              ],
            },
          ],
        },
        {
          cols: [
            {
              title: "Most Dived Month",
              subtitle: [mostDivedMonth()],
              highlight: true,
            },
            {
              title: "Most Dived Year",
              subtitle: [mostDivedYear()],
              highlight: true,
            },
          ],
        },
        {
          cols: [
            {
              title: "Dives Per Months",
              subtitle: [computeDivesPerMonth().toFixed(2) + " dives."],
            },
            {
              title: "Year Stats",
              subtitle: statYears,
              dropdown: true,
            },
          ],
        },
      ],
    };
  }

  const dives = useDivesCollectionLoader(collection) as Pick<
    DiveInterface,
    "date"
  >[];

  return {
    heatmap: {
      items: countPerDays(),
      endDate: new Date(),
      colors: [
        Colors.heatmap_01,
        Colors.heatmap_02,
        Colors.heatmap_03,
        Colors.heatmap_04,
        Colors.heatmap_05,
      ],
    },
    panel: loadPanelData(),
  };
}
