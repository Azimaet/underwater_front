import gql from "graphql-tag";

export const MUTATION_UPDATE_DIVE = gql`
  mutation updateDive($input: updateDiveInput!) {
    updateDive(input: $input) {
      dive {
        id
      }
    }
  }
`;
