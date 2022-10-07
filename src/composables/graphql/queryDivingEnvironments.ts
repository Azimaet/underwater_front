import { computed } from "vue";
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";

/**
 * GraphQL DivingEnvironments Query Utilitary
 * @return {any} any
 */
export function queryDivingEnvironments(): any {
  const QUERY_DIVING_ENVIRONMENTS = gql`
    query {
      divingEnvironments {
        edges {
          node {
            id
            label
          }
        }
      }
    }
  `;

  const { result } = useQuery(QUERY_DIVING_ENVIRONMENTS);

  const environments = computed(
    () =>
      result.value?.divingEnvironments.edges
        .map((environment: { node: unknown }) => environment.node)
        .map((i: { label: any; id: any }) => ({ label: i.label, id: i.id })) ??
      []
  );

  return environments;
}
