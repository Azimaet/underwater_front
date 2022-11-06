import { ApolloQueryResult } from "@apollo/client";

/**
 * Dives Collection Loader util
 * @param {ApolloQueryResult} collection ApolloQueryResult
 */
export function useDivesCollectionLoader(collection: ApolloQueryResult<any>) {
  const key = "dives";
  const dives: any[] = [];

  collection[key as keyof typeof collection].edges
    .map((item: { node: unknown }) => item.node)
    .forEach((dive: any) => {
      dives.push(dive);
    });

  return dives;
}
