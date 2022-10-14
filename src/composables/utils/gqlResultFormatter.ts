import { ApolloQueryResult } from "@apollo/client";

/**
 * GQL Query result Formatting Utilitary function
 * @param {ApolloQueryResult<any>} entry ApolloQueryResult<any>
 * @param {string} key string
 */
export function useGQLFormatter(entry: ApolloQueryResult<any>, key: string) {
  /**
   * Diving Theme Collection Formatter
   */
  function formateDivingThemeCollection(collection: any) {
    return (
      collection.map((i: { label: any; id: any }) => ({
        label: i.label,
        id: i.id,
      })) ?? []
    );
  }

  /**
   * GasTanks Collection Formatter
   */
  function formateDiveCollection(collection: any) {
    console.log("collection");
    console.log(collection);

    const items: any[] = [];

    const gasTanks: [] =
      collection.map((i: { gasTanks: any }) => ({
        gasTanks: i.gasTanks,
      })) ?? [];

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
