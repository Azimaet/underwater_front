import { GAS_LIST, GasMix } from "@/composables/types/gas";

import { translations } from "@/i18n/index";

const MINIMUM_SUM_GAS = 0;
const MAXIMUM_SUM_GAS = 100;
const {
  OXYGEN,
  AIR,
  NITROX,
  TRIMIX_HYPEROX,
  TRIMIX_HYPOX,
  TRIMIX_NORMOX,
  HELIOX,
  UNBREATHABLE,
} = translations.en.GAS;

export class GasTank {
  private _gasMix: GasMix;
  private _pressureStart: number;
  private _pressureEnd: number;

  constructor() {
    this._gasMix = {
      helium: 0,
      oxygen: 21,
      nitrogen: 79,
    };
    this._pressureStart = 200;
    this._pressureEnd = 50;
  }

  public static describe(instance: any): Array<string> {
    return Object.getOwnPropertyNames(instance);
  }

  /* Getters and Setters */
  public get gasMix(): GasMix {
    return this._gasMix;
  }
  public set gasMix(gasMix: GasMix) {
    this._gasMix = gasMix;
  }

  public get pressureStart(): number {
    return this._pressureStart;
  }
  public set pressureStart(pressureStart: number) {
    this._pressureStart = pressureStart;
  }

  public get pressureEnd(): number {
    return this._pressureEnd;
  }
  public set pressureEnd(pressureEnd: number) {
    this._pressureEnd = pressureEnd;
  }

  /**
   * Validate expected values
   * @param {GasMix} mix {GasMix}
   * @returns {string}
   */
  private findModifiedGas(mix: GasMix): string {
    return this.gasMix.oxygen !== mix.oxygen
      ? "oxygen"
      : this.gasMix.nitrogen !== mix.nitrogen
      ? "nitrogen"
      : this.gasMix.helium !== mix.helium
      ? "helium"
      : "";
  }

  /**
   * Validate expected values
   * @param {GasMix} mix {GasMix}
   * @param {string} gasToModify {string}
   * @returns {GasMix}
   */
  private validateExpectedValues(mix: GasMix): GasMix {
    for (const gasProp in mix) {
      if (mix[gasProp as keyof typeof mix] > MAXIMUM_SUM_GAS) {
        mix[gasProp as keyof typeof mix] = MAXIMUM_SUM_GAS;
      }

      if (mix[gasProp as keyof typeof mix] < MINIMUM_SUM_GAS) {
        mix[gasProp as keyof typeof mix] = MINIMUM_SUM_GAS;
      }
    }

    return mix;
  }

  /**
   * Get Delta of Gasmix
   * @param {GasMix} mix {GasMix}
   * @returns {GasMix}
   */
  private getDeltaOfGasMix(mix: GasMix): number {
    let delta = 0;

    for (const gasProp in mix) {
      delta += mix[gasProp as keyof typeof mix];
    }

    return delta - MAXIMUM_SUM_GAS;
  }

  /**
   * Get the Gas To Equalize
   * @param {string[]} protectedGas {string[]}
   * @param {number} operationToEqualize {number}
   * @param {GasMix} mix {GasMix}
   * @returns {string}
   */
  private getGasToEqualize(
    protectedGas: string[],
    operationToEqualize: number,
    mix: GasMix
  ): string {
    let gasToEqualize: string[] = GAS_LIST.filter(
      (gasName) => !protectedGas.includes(gasName)
    );

    gasToEqualize.forEach((gasName) => {
      if (
        mix[gasName as keyof typeof this.gasMix] + operationToEqualize <
          MINIMUM_SUM_GAS ||
        mix[gasName as keyof typeof this.gasMix] + operationToEqualize >
          MAXIMUM_SUM_GAS
      ) {
        gasToEqualize = gasToEqualize.filter((gasProp) => {
          return gasProp !== gasName;
        });
      }
    });

    const [string] = gasToEqualize;
    return string;
  }

  /**
   * Update Gas Mix method
   * @param {GasMix} newMix {GasMix}
   * @param {string} lockedGas {string}
   * @returns {void}
   */
  public updateGasMix(newMix: GasMix, lockedGas: string): void {
    newMix = this.validateExpectedValues(newMix);

    const protectedGas: string[] = [this.findModifiedGas(newMix), lockedGas];
    let delta = this.getDeltaOfGasMix(newMix);

    while (delta > 0 || delta < 0) {
      const operationToEqualize = Math.sign(-delta);
      const gasToEqualize = this.getGasToEqualize(
        protectedGas,
        operationToEqualize,
        newMix
      );

      if (!gasToEqualize) {
        return;
      }

      newMix[gasToEqualize as keyof typeof newMix] += operationToEqualize;
      delta = delta + operationToEqualize;
    }

    this.gasMix = newMix;
  }
}
