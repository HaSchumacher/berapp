export interface Slot {
  readonly from: Date;
  readonly to: Date;
  readonly by: string;
}

export type Slots = Array<Slot>;
