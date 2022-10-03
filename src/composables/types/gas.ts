export interface GasInterface {
  gasMix: {
    helium: number;
    oxygen: number;
    nitrogen: number;
  };
  pressureStart: number;
  pressureEnd: number;
}

export interface GasMix {
  helium: number;
  oxygen: number;
  nitrogen: number;
}
