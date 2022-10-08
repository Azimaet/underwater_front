// import { Dive } from "@/composables/classes/dive";
// import { computed } from "vue";
// import gql from "graphql-tag";
// import { useMutation } from "@vue/apollo-composable";

// /**
//  * GraphQL DivingEnvironments Query Utilitary
//  * @return {any} any
//  */
// export function mutationCreateDive(dive: Dive): any {
//   const $totalTime = 45;
//   const MUTATION_CREATE_DIVE = gql`
//     mutation createDive($totalTime: number = 45) {
//       createDive(
//         dive: {
//           totalTime: $totalTime
//           maxDepth: 58
//           date: 25
//           divingType: 4
//           divingRole: 74
//           divingEnvironment: 85
//           gas: 85
//         }
//       ) {
//         dive {
//           id
//         }
//       }
//     }
//   `;

//   console.log("here");
//   console.log(dive);
//   console.log(MUTATION_CREATE_DIVE);

//   // const { mutate: createDive } = useMutation(MUTATION_CREATE_DIVE);
// }
