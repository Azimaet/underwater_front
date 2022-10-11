import gql from "graphql-tag";

export const QUERY_DIVING_TYPES = gql`
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
