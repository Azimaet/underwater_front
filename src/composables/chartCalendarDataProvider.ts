import { ApolloQueryResult } from "@apollo/client";

interface DateData {
  date: Date;
  count: number;
}

interface State {
  data: DateData[];
}

/**
 * GraphQL Requests Factory
 * @param {ApolloQueryResult} entry ApolloQueryResult
 */
export function useChartCalendatDataProvider(entry: ApolloQueryResult<any>) {
  /**
   * Depth data loader
   */
  function datesDataLoader() {
    const key = "dives";
    const dives: any[] = [];

    entry[key as keyof typeof entry].edges
      .map((item: { node: unknown }) => item.node)
      .forEach((dive: any) => {
        dives.push(dive);
      });

    return dives;
  }

  function countPerDays(dives: any[]) {
    dives.forEach((dive) => {
      const date = dive.date.split("T")[0];

      const isFound = state.data.some((element) => {
        if (element.date === date) {
          return element;
        }

        return false;
      });

      if (isFound) {
        const item = state.data.find((item) => item.date === date);
        if (item) item.count++;
      } else {
        state.data.push({
          date: date,
          count: 1,
        });
      }
    });
  }

  const state: State = {
    data: [],
  };

  function _init() {
    const dives = datesDataLoader();

    countPerDays(dives);
  }

  _init();

  return state.data;
}
