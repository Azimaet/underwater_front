import { ApolloQueryResult } from "@apollo/client";
import { GasTank } from "../types/gas";

/**
 * Dives Collection Loader util
 * @param {ApolloQueryResult} collection ApolloQueryResult
 */
export function useDivesCollectionLoader(
  collection: ApolloQueryResult<any>,
  context?: string
) {
  const key = "dives";
  const items: any[] = [];

  collection[key as keyof typeof collection].edges
    .map((item: { node: unknown }) => item.node)
    .forEach((dive: any) => {
      if (context && context === "gasTanks") {
        const gasTanks = dive.gasTanks;

        gasTanks.forEach((tank: GasTank) => {
          items.push(tank);
        });
      } else {
        items.push(dive);
      }
    });

  return items;
}
