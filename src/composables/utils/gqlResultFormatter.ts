import { ApolloQueryResult } from "@apollo/client";

export interface FormatedThemeQueryResult {
  [x: string]: any;
  id: string;
  label: string;
  token: string;
}

/**
 * GQL Query result Formatting Utilitary function
 * @param {ApolloQueryResult<any>} entry ApolloQueryResult<any>
 * @param {string} key string
 * @return {FormatedThemeQueryResult}
 */
export function useGQLFormatter(
  entry: ApolloQueryResult<any>,
  key: string
): FormatedThemeQueryResult {
  /**
   * Diving Theme Collection Formatter
   */
  function formateDivingThemeCollection(collection: any) {
    return (
      collection.map((i: { token: any; label: any; id: any }) => ({
        token: i.token,
        label: i.label,
        id: i.id,
      })) ?? []
    );
  }

  /**
   * GasTanks Collection Formatter
   */
  function formateDiveCollection(collection: any) {
    const items: any[] = [];

    collection.forEach((element: any) => {
      const gasTanks = element.gasTanks;

      gasTanks.forEach((tank: any) => {
        items.push(tank);
      });
    });

    return items;
  }

  let collection = entry[key as keyof typeof entry].edges.map(
    (item: { node: unknown }) => item.node
  );

  switch (key) {
    case "divingRoles":
    case "divingTypes":
    case "divingEnvironments":
      collection = formateDivingThemeCollection(collection);
      break;
    case "dives":
      collection = formateDiveCollection(collection);
      break;
    default:
      break;
  }

  return collection;
}
