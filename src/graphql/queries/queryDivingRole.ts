import gql from "graphql-tag";

export const QUERY_DIVING_ROLES = gql`
  query {
    divingRoles {
      edges {
        node {
          id
          label
        }
      }
    }
  }
`;
