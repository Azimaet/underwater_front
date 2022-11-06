import gql from "graphql-tag";

export const QUERY_FIRST_DIVE = gql`
  query ($owner: String) {
    dives(owner: $owner, order: { date: "DESC" }, last: 1) {
      edges {
        node {
          date
        }
      }
    }
  }
`;

export const QUERY_LAST_DIVE = gql`
  query ($owner: String) {
    dives(owner: $owner, order: { date: "DESC" }, first: 1) {
      edges {
        node {
          date
        }
      }
    }
  }
`;

export const QUERY_DIVES = gql`
  query ($owner: String) {
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

export const QUERY_DIVES_BY_DATES = gql`
  query ($owner: String) {
    dives(owner: $owner) {
      edges {
        node {
          date
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

export const QUERY_DEPTH_AND_TIME_BY_DIVES = gql`
  query ($owner: String) {
    dives(owner: $owner, order: { date: "ASC" }) {
      edges {
        node {
          maxDepth
          totalTime
          date
        }
      }
    }
  }
`;

export const QUERY_DATES_BY_DIVES = gql`
  query ($owner: String) {
    dives(owner: $owner, order: { date: "ASC" }) {
      edges {
        node {
          date
        }
      }
    }
  }
`;

export const THEMES_BY_DIVES = gql`
  query ($owner: String) {
    dives(owner: $owner, order: { date: "ASC" }) {
      edges {
        node {
          divingType {
            edges {
              node {
                token
              }
            }
          }
          divingEnvironment {
            token
          }
          divingRole {
            token
          }
        }
      }
    }
  }
`;
