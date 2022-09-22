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
            token
          }
        }
      }
    }
  `;

  const { result } = useQuery(QUERY_DIVING_TYPES);

  return result;
}
