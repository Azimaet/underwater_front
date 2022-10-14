import gql from "graphql-tag";

export const QUERY_DIVES = gql`
  query ($input: String) {
    dives(owner: $owner) {
      edges {
        node {
          id
          label
        }
      }
    }
  }
`;

export const QUERY_GASTANKS_BY_DIVES = gql`
  query ($owner: String) {
    dives(owner: $owner) {
      edges {
        node {
          gasTanks
          totalTime
        }
      }
    }
  }
`;
