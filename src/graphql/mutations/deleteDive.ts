import gql from "graphql-tag";

export const MUTATION_DELETE_DIVE = gql`
  mutation deleteDive($input: deleteDiveInput!) {
    deleteDive(input: $input) {
      dive {
        id
      }
    }
  }
`;
