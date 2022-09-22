import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";

/**
 * GraphQL DivingRoles Query Utilitary
 * @return {any} any
 */
export function queryDivingRoles(): any {
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

  return result;
}
