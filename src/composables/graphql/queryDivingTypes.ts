import { computed } from "vue";
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";

/**
 * GraphQL DivingTypes Query Utilitary
 * @return {any} any
 */
export function queryDivingTypes(): any {
  const QUERY_DIVING_TYPES = gql`
    query {
      divingTypes {
        edges {
          node {
            id
            label
          }
        }
      }
    }
  `;

  const { result } = useQuery(QUERY_DIVING_TYPES);

  const types = computed(
    () =>
      result.value?.divingTypes.edges
        .map((type: { node: unknown }) => type.node)
        .map((i: { label: any; id: any }) => ({ label: i.label, id: i.id })) ??
      []
  );

  return types;
}
