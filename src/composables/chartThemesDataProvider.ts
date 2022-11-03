import { ApolloQueryResult } from "@apollo/client";
import { FormatedThemeQueryResult } from "./utils/gqlResultFormatter";
import { GraphColors } from "./types/graphColors";

/**
 * GraphQL Requests Factory
 * @param {ApolloQueryResult} entry ApolloQueryResult
 * @param {FormatedThemeQueryResult} query FormatedThemeQueryResult
 * @param {string} propName string
 */
export function useThemesDataProvider(
  entry: ApolloQueryResult<any>,
  query: FormatedThemeQueryResult,
  propName: string
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

  function getColors(data: object) {
    const values: string[] = [];

    Object.keys(data).forEach((key) => {
      const colorKey = "THEME_" + key.toUpperCase();
      values.push(GraphColors[colorKey as keyof typeof GraphColors]);
    });

    return values;
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
        if (dive[propName as keyof typeof dive].token) {
          tokens.push(dive[propName as keyof typeof dive].token);
        } else {
          dive[propName as keyof typeof dive].edges
            .map((item: { node: unknown }) => item.node)
            .forEach((object: any) => {
              tokens.push(object.token);
            });
        }
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
          backgroundColor: getColors(data),
          data: getDatas(data),
        },
      ],
    },
  };
}
