// import { GasInterface, GasMix } from "./types/gas";

// import { DiveInterface } from "./types/dive";
// import { reactive } from "vue";

// interface State {
//   dive: DiveInterface | null;
// }
// const state: State = reactive({
//   dive: null,
// });

// /**
//  * Global Authentication Login function
//  * @param {DiveInterface} dive DiveInterface
//  * @param {number} index number
//  * @param {GasMix} newMix GasMix
//  */
// export function useDive(dive: DiveInterface, index: number, newMix: GasMix) {
//   const MINIMUM_SUM_GAS = 0;
//   const MAXIMUM_SUM_GAS = 100;
//   const EQUALIZABLES_GAS = ["helium", "oxygen", "nitrogen"];

//   state.dive = dive;

//   /**
//    * Validate expected values
//    * @param {GasMix} mix {GasMix}
//    * @returns {array}
//    */
//   function findModifiedGas(mix: GasMix): string[] {
//     const modifiedGas: string[] = [];

//     dive.gasTanks[index].gasMix.oxygen !== mix.oxygen
//       ? modifiedGas.push("oxygen")
//       : null;
//     dive.gasTanks[index].gasMix.nitrogen !== mix.nitrogen
//       ? modifiedGas.push("nitrogen")
//       : null;
//     dive.gasTanks[index].gasMix.helium !== mix.helium
//       ? modifiedGas.push("helium")
//       : null;
//     return modifiedGas;
//   }

//   /**
//    * Validate expected values
//    * @param {GasMix} mix {GasMix}
//    * @returns {GasMix}
//    */
//   function validateExpectedValues(mix: GasMix): GasMix {
//     for (const gasProp in mix) {
//       if (mix[gasProp as keyof typeof mix] > MAXIMUM_SUM_GAS) {
//         mix[gasProp as keyof typeof mix] = MAXIMUM_SUM_GAS;
//       }

//       if (mix[gasProp as keyof typeof mix] < MINIMUM_SUM_GAS) {
//         mix[gasProp as keyof typeof mix] = MINIMUM_SUM_GAS;
//       }
//     }

//     return mix;
//   }

//   /**
//    * Get Delta of Gasmix
//    * @param {GasMix} mix {GasMix}
//    * @returns {GasMix}
//    */
//   function getDeltaOfGasMix(mix: GasMix): number {
//     let delta = 0;

//     for (const gasProp in mix) {
//       delta += mix[gasProp as keyof typeof mix];
//     }

//     return delta - MAXIMUM_SUM_GAS;
//   }

//   /**
//    * Get the Gas To Equalize
//    * @param {array} modifiedGas {array}
//    * @param {number} operationToEqualize {number}
//    * @returns {string}
//    */
//   function getGasToEqualize(
//     modifiedGas: string[],
//     operationToEqualize: number
//   ): string {
//     const gasTank = state.dive?.gasTanks[index];
//     const gasMix = gasTank?.gasMix;
//     let gasToEqualize: string[] = EQUALIZABLES_GAS;

//     if (modifiedGas.length === 1) {
//       gasToEqualize = gasToEqualize.filter((gasProp) => {
//         return gasProp !== modifiedGas[0];
//       });
//     }

//     gasToEqualize.forEach((gasName) => {
//       if (
//         (gasMix &&
//           gasMix[gasName as keyof typeof gasMix] + operationToEqualize <
//             MINIMUM_SUM_GAS) ||
//         (gasMix &&
//           gasMix[gasName as keyof typeof gasMix] + operationToEqualize >
//             MAXIMUM_SUM_GAS)
//       ) {
//         gasToEqualize = gasToEqualize.filter((gasProp) => {
//           return gasProp !== gasName;
//         });
//       }
//     });

//     if (gasToEqualize.length > 1) {
//       gasToEqualize = gasToEqualize.filter((gasProp) => {
//         return gasProp !== gasTank?.lastGasUpdated;
//       });
//     }

//     const [string] = gasToEqualize;
//     return string;
//   }

//   /**
//    * Update Gas Mix method
//    * @returns {void}
//    */
//   function updateGasMix(): void {
//     newMix = validateExpectedValues(newMix);

//     const modifiedGas = findModifiedGas(newMix);

//     let delta = getDeltaOfGasMix(newMix);

//     while (delta !== 0) {
//       const operationToEqualize = Math.sign(-delta);
//       const gasToEqualize = getGasToEqualize(modifiedGas, operationToEqualize);

//       newMix[gasToEqualize as keyof typeof newMix] += operationToEqualize;

//       delta = delta + operationToEqualize;
//     }

//     dive.gasTanks[index].gasMix = newMix;
//   }

//   updateGasMix();

//   return { state };
// }
