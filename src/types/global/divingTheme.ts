export interface DivingThemeEdgeInterface {
  node: DivingThemeInterface;
}
export interface DivingThemeInterface {
  readonly id?: number;
  label: string;
  token: string;
  edges?: {
    node?: DivingThemeInterface;
  }[];
}
