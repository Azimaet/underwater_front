import gql from "graphql-tag";

export const QUERY_DIVING_ENVIRONMENTS = gql`
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
