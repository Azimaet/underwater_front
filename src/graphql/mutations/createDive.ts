import gql from "graphql-tag";

export const MUTATION_CREATE_DIVE = gql`
  mutation createDive($input: createDiveInput!) {
    createDive(input: $input) {
      dive {
        id
      }
    }
  }
`;
