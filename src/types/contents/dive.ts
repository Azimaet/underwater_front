import { DivingThemeInterface } from "./divingTheme";
import { GasInterface } from "./gas";

export class Dive {
  private _id: number | null;
  private _uuid: string | null;
  private _createdAt: Date | null;
  private _updatedAt: Date | null;
  private _date: Date | null;
  private _totalTime: number | null;
  private _maxDepth: number | null;
  private _gas: GasInterface[];
  private _divingType: DivingThemeInterface[];
  private _divingEnvironment: DivingThemeInterface | null;
  private _divingRole: DivingThemeInterface | null;
  private _user: object | null;

  constructor() {
    this._id = null;
    this._uuid = null;
    this._createdAt = null;
    this._updatedAt = null;
    this._date = null;
    this._totalTime = null;
    this._maxDepth = null;
    this._gas = [];
    this._divingType = [];
    this._divingEnvironment = null;
    this._divingRole = null;
    this._user = null;
  }

  public static describe(instance: any): Array<string> {
    return Object.getOwnPropertyNames(instance);
  }

  public get id(): number | null {
    return this._id;
  }
  public set id(id: number | null) {
    this._id = id;
  }

  public get uuid(): string | null {
    return this._uuid;
  }
  public set uuid(uuid: string | null) {
    this._uuid = uuid;
  }

  public get createdAt(): Date | null {
    return this._createdAt;
  }
  public set createdAt(date: Date | null) {
    this._createdAt = date;
  }

  public get updatedAt(): Date | null {
    return this._updatedAt;
  }
  public set updatedAt(date: Date | null) {
    this._updatedAt = date;
  }

  public get date(): Date | null {
    return this._date;
  }
  public set date(date: Date | null) {
    this._date = date;
  }

  public get totalTime(): number | null {
    return this._totalTime;
  }
  public set totalTime(time: number | null) {
    this._totalTime = time;
  }

  public get maxDepth(): number | null {
    return this._maxDepth;
  }
  public set maxDepth(depth: number | null) {
    this._maxDepth = depth;
  }

  public get gas(): GasInterface[] {
    return this._gas;
  }
  public set gas(tank) {
    // TODO
  }

  public get divingType(): DivingThemeInterface[] {
    return this._divingType;
  }
  public set divingType(type) {
    // TODO
  }

  public get divingEnvironment(): DivingThemeInterface | null {
    return this._divingEnvironment;
  }
  public set divingEnvironment(env) {
    // TODO
  }

  public get divingRole(): DivingThemeInterface | null {
    return this._divingRole;
  }
  public set divingRole(role) {
    // TODO
  }

  public get user() {
    return this._user;
  }
  public set user(user) {
    // TODO
  }

  /**
   * Get GasTank Method (target one tank in Collection)
   * @param {number} index number
   * @return {GasInterface} GasInterface
   */
  public getGasTank(index: number): GasInterface {
    return this._gas[index];
  }
  /**
   * Set GasTank Method (target one tank in Collection)
   * @param {number} index number
   * @param {GasInterface} tank GasInterface
   * @return {void} void
   */
  public setGasTank(index: number, tank: GasInterface): void {
    try {
      tank.gasMix.helium + tank.gasMix.nitrogen + tank.gasMix.oxygen !== 100;
    } catch (error) {
      console.log("Addition of GasMix fractions is not equal to 100!");
    }
    if (this.gas.length < index) {
      this.gas.push(tank);
    } else {
      this._gas[index] = tank;
    }
  }
}
