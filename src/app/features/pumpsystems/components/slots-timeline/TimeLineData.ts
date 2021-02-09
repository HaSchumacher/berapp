import { Slot } from '@model/pumpsystem';

export interface TimeLineData {
  from: Date;
  to: Date;
  slots: Slot[];
}
