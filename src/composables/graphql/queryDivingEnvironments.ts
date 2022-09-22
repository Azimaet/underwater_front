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
            token
          }
        }
      }
    }
  `;

  const { result } = useQuery(QUERY_DIVING_ENVIRONMENTS);

  return result;
}
