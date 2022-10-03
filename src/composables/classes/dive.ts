import { DivingThemeInterface } from "@/composables/types/divingTheme";
import { GasTank } from "@/composables/classes/gasTank";

export class Dive {
  private _id: number | null;
  private _uuid: string | null;
  private _createdAt: Date | null;
  private _updatedAt: Date | null;
  private _date: Date;
  private _totalTime: number;
  private _maxDepth: number;
  private _gasTanks: GasTank[];
  private _divingType: DivingThemeInterface[];
  private _divingEnvironment: DivingThemeInterface | null;
  private _divingRole: DivingThemeInterface | null;
  private _user: object | null;

  constructor() {
    this._id = null;
    this._uuid = null;
    this._createdAt = null;
    this._updatedAt = null;
    this._date = new Date();
    this._totalTime = 0;
    this._maxDepth = 0;
    this._gasTanks = [new GasTank()];
    this._divingType = [];
    this._divingEnvironment = null;
    this._divingRole = null;
    this._user = null;
  }

  public static describe(instance: any): Array<string> {
    return Object.getOwnPropertyNames(instance);
  }

  /* Getters and Setters */
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

  public get date(): Date {
    return this._date;
  }
  public set date(date: Date) {
    this._date = date;
  }

  public get totalTime(): number {
    return this._totalTime;
  }
  public set totalTime(time: number) {
    this._totalTime = time;
  }

  public get maxDepth(): number {
    return this._maxDepth;
  }
  public set maxDepth(depth: number) {
    this._maxDepth = depth;
  }

  public get gasTanks(): GasTank[] {
    return this._gasTanks;
  }
  public set gasTanks(gasTanks) {
    this._gasTanks = gasTanks;
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

  /* Custom Methods */

  /**
   * Get GasTank item Method (target one tank in Collection)
   * @param {number} index number
   * @return {GasTank} GasTank
   */
  public getGasTank(index: number): GasTank {
    return this.gasTanks[index];
  }

  /**
   * Set GasTank Method (target one tank in Collection)
   * @param {number} index number
   * @param {GasTank} gasTank GasTank
   * @return {void} void
   */
  public setGasTank(index: number, gasTank: GasTank): void {
    if (this.gasTanks.length < index) {
      this.gasTanks.push(gasTank);
    } else {
      this.gasTanks[index] = gasTank;
    }
  }
}
