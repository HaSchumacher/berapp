export interface SlotData {
  readonly from: Date;
  readonly to: Date;
  readonly by: string;
}

export interface Slot {
  id: string;
  data: SlotData[];
}
