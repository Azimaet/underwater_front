import { GasMix } from "@/composables/types/gas";

/**
 * Gas Color funny generator
 * @param {GasMix} mix {Gasmix}
 */
export function useGasColorGenerator(mix: GasMix) {
  /**
   * Hexacolor Fragment convertor function
   * @param {number} color {number}
   */
  function hexFragmentConvertor(color: number) {
    const hex = color.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  /**
   * Component to Hexacolor method
   * @param {number} red {number}
   * @param {number} green {number}
   * @param {number} blue {number}
   */
  function rgbToHexConvertor(red: number, green: number, blue: number) {
    return (
      "#" +
      hexFragmentConvertor(red) +
      hexFragmentConvertor(green) +
      hexFragmentConvertor(blue)
    );
  }

  /**
   * Percent To Base16 Convertor
   * @param {number} value {number}
   * @return {number}
   */
  function percentToBase16Convertor(value: number): number {
    return Math.round((value * 255) / 100);
  }

  return rgbToHexConvertor(
    percentToBase16Convertor(mix.helium),
    percentToBase16Convertor(mix.oxygen),
    percentToBase16Convertor(mix.nitrogen)
  );
}
