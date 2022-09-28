// import { Dive } from "@/types/contents/dive";
// import { DiveManagerAction } from "../types/components/contexts";
// import { GasInterface } from "@/types/contents/gas";
// import { reactive } from "vue";

// const state = reactive({
//   dive: new Dive(),
// });

// /**
//  * Global Dive Manager. Used to represents new dive (for print it by form) or dive fetched by API.
//  * @param {DiveManagerAction} context DiveManagerAction
//  * @return {DiveInterface} dive DiveInterface
//  */
// export function useDiveManager(context: DiveManagerAction): Dive | null {
//   /**
//    * Init object Dive function.
//    * @return {Promise} Promise
//    */
//   async function initDive(): Promise<Dive> {
//     return new Promise((resolve) => {
//       resolve(state.dive);
//     });
//   }

//   // /**
//   //  * Manage Gas function.
//   //  * @param {number} index number
//   //  * @param {GasInterface} tank GasInterface
//   //  * @return {void} void
//   //  */
//   // function setGas(index: number, tank: GasInterface): void {
//   //   if (state.dive.gas.length < index) {
//   //     state.dive.gas.push(tank);
//   //   }
//   // }

//   // TODO: Fetch API pour les themes (types, roles, envs)? Dans manager sépéré ?
//   // objectif zero logique dans les templates vue.
//   // Feeder dive, props après props.

//   initDive();

//   // if (context === "CREATE_NEW_DIVE") {
//   //   const index = 1;
//   //   const tank: GasInterface = {
//   //     gasMix: {
//   //       helium: 0,
//   //       oxygen: 21,
//   //       nitrogen: 79,
//   //     },
//   //     pressureStart: 200,
//   //     pressureEnd: 50,
//   //   };

//   //   setGas(index, tank);
//   // }

//   return state.dive;
// }
