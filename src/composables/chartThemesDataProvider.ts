import { ApolloQueryResult } from "@apollo/client";

/**
 * GraphQL Requests Factory
 * @param {ApolloQueryResult} entry ApolloQueryResult
 * @param {any} query any
 * @param {string} context string
 */
export function useThemesDataProvider(
  entry: ApolloQueryResult<any>,
  query: any,
  context: string
) {
  function getLabels(data: object) {
    const labels: string[] = [];

    Object.keys(data).forEach((key) => {
      const token = "%" + key + "%";
      const theme = query.filter((theme: any) => token === theme.token);
      labels.push(theme[0].label);
    });

    return labels;
  }

  function getColors() {
    return ["#3FA796", "#FEC260", "#A10035", "#2A0944", "#9A1663", "#1D1CE5"];
  }

  function getDatas(data: object) {
    const values: number[] = [];

    Object.keys(data).forEach((key) => {
      values.push(data[key as keyof typeof data]);
    });
    return values;
  }

  function retrieveData() {
    const key = "dives";
    const tokens: string[] = [];
    const data: Record<string, any> = {};

    entry[key as keyof typeof entry].edges
      .map((item: { node: unknown }) => item.node)
      .forEach((dive: any) => {
        tokens.push(dive[context as keyof typeof dive].token);
      });

    tokens.forEach((token: string) => {
      const propName = token.replaceAll("%", "");
      data[propName as keyof typeof data]
        ? data[propName as keyof typeof data]++
        : (data[propName as keyof typeof data] = 1);
    });

    return data;
  }

  const data = retrieveData();

  return {
    chart: {
      labels: getLabels(data),
      datasets: [
        {
          backgroundColor: getColors(),
          data: getDatas(data),
        },
      ],
    },
  };
}
