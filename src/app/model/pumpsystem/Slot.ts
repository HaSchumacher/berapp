import { Identifiable } from '@model/helper';

export interface SlotData extends Identifiable {
  from: Date;
  to: Date;
  by: string;
}

export interface SlotDataItem extends SlotData {
  slotId: string;
}

export interface Slot extends Identifiable {
  data: SlotData[];
}
