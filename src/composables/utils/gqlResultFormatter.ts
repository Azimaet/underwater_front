import { ApolloQueryResult } from "@apollo/client";

/**
 * GQL Query result Formatting Utilitary function
 * @param {ApolloQueryResult<any>} entry ApolloQueryResult<any>
 * @param {string} key string
 */
export function useGQLFormatter(entry: ApolloQueryResult<any>, key: string) {
  return (
    entry[key as keyof typeof entry].edges
      .map((item: { node: unknown }) => item.node)
      .map((i: { label: any; id: any }) => ({
        label: i.label,
        id: i.id,
      })) ?? []
  );
}
