import { computed } from "vue";
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";

/**
 * GraphQL DivingRoles Query Utilitary
 */
export function queryDivingRoles() {
  const QUERY_DIVING_ROLES = gql`
    query {
      divingRoles {
        edges {
          node {
            id
            label
            token
          }
        }
      }
    }
  `;

  const { result } = useQuery(QUERY_DIVING_ROLES);

  const roles = computed(
    () =>
      result.value?.divingRoles.edges
        .map((role: { node: unknown }) => role.node)
        .map((i: { label: any }) => i.label) ?? []
  );
  return roles;
}