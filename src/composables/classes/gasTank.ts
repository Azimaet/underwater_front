import { GasMix } from "@/composables/types/gas";
import { translations } from "@/i18n/index";

const MINIMUM_SUM_GAS = 0;
const MAXIMUM_SUM_GAS = 100;
const EQUALIZABLES_GAS = ["helium", "oxygen", "nitrogen"];
const { OXYGEN, AIR, NITROX, TRIMIX, HELIOX, UNBREATHABLE } =
  translations.en.GAS;

export class GasTank {
  private _gasMix: GasMix;
  private _pressureStart: number;
  private _pressureEnd: number;
  private _lastGasUpdated: string | null;

  constructor() {
    this._gasMix = {
      helium: 0,
      oxygen: 21,
      nitrogen: 79,
    };
    this._pressureStart = 200;
    this._pressureEnd = 50;
    this._lastGasUpdated = "helium";
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

  public get lastGasUpdated(): string | null {
    return this._lastGasUpdated;
  }
  public set lastGasUpdated(lastGasUpdated: string | null) {
    this._lastGasUpdated = lastGasUpdated;
  }

  /* Custom Methods */

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
   * @param {string} gasToModify {string}
   * @param {number} operationToEqualize {number}
   * @returns {string}
   */
  private getGasToEqualize(
    gasToModify: string,
    operationToEqualize: number
  ): string {
    let gasToEqualize: string[];

    gasToEqualize = EQUALIZABLES_GAS.filter((gasProp) => {
      return gasProp !== gasToModify;
    });

    gasToEqualize.forEach((gasName) => {
      if (
        this.gasMix[gasName as keyof typeof this.gasMix] + operationToEqualize <
          MINIMUM_SUM_GAS ||
        this.gasMix[gasName as keyof typeof this.gasMix] + operationToEqualize >
          MAXIMUM_SUM_GAS
      ) {
        gasToEqualize = gasToEqualize.filter((gasProp) => {
          return gasProp !== gasName;
        });
      }
    });

    if (gasToEqualize.length > 1) {
      gasToEqualize = gasToEqualize.filter((gasProp) => {
        return gasProp !== this.lastGasUpdated;
      });
    }

    const [string] = gasToEqualize;
    return string;
  }

  /**
   * Set Gas Mix method
   * @param {GasMix} newMix {GasMix}
   * @param {string} gasToModify {string}
   * @returns {void}
   */
  public setGasMix(newMix: GasMix, gasToModify: string): void {
    newMix = this.validateExpectedValues(newMix);

    let delta = this.getDeltaOfGasMix(newMix);

    while (delta !== 0) {
      const operationToEqualize = Math.sign(-delta);
      const gasToEqualize = this.getGasToEqualize(
        gasToModify,
        operationToEqualize
      );

      newMix[gasToEqualize as keyof typeof newMix] += operationToEqualize;

      delta = delta + operationToEqualize;
    }

    this.gasMix = newMix;
  }

  /**
   * Get Gas Name Method relative to gas mix
   * @return {string} gasName
   */
  public getGasName(): string {
    let gasName = "";

    if (this.gasMix.oxygen === 100) {
      gasName = OXYGEN;
    } else if (this.gasMix.nitrogen === 100 || this.gasMix.helium === 100) {
      gasName = UNBREATHABLE;
    } else if (this.gasMix.oxygen === 21 && this.gasMix.nitrogen === 79) {
      gasName = AIR;
    } else if (
      this.gasMix.oxygen > 21 &&
      this.gasMix.oxygen < 100 &&
      this.gasMix.nitrogen < 79 &&
      this.gasMix.nitrogen > 0 &&
      this.gasMix.helium === 0
    ) {
      gasName = NITROX;
    } else if (
      this.gasMix.oxygen > 0 &&
      this.gasMix.helium > 0 &&
      this.gasMix.nitrogen === 0
    ) {
      gasName = HELIOX;
    } else if (
      this.gasMix.oxygen > 0 &&
      this.gasMix.helium > 0 &&
      this.gasMix.nitrogen > 0
    ) {
      gasName = TRIMIX;
    } else {
      gasName = UNBREATHABLE;
    }
    return gasName;
  }
}
