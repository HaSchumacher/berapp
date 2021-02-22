import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SlotData, SlotDataItem } from '@model/pumpsystem';
import { isNonNull } from '@utilities';
import {
  ChartSelectionChangedEvent,
  ChartType,
  Column,
  Formatter,
  Row,
} from 'angular-google-charts';
import { TimeLineData } from './TimeLineData';

@Component({
  selector: 'app-slots-timeline',
  templateUrl: './slots-timeline.component.html',
  styleUrls: ['./slots-timeline.component.scss'],
})
export class SlotsTimelineComponent {
  private objects: Map<number, SlotDataItem>;
  private _data: Row[];
  private _options: any;
  public readonly columns: Column[] = [
    { type: 'string', id: 'Slot' },
    { type: 'string', id: 'Label' },
    { type: 'string', role: 'style' },
    { type: 'date', id: 'Start' },
    { type: 'date', id: 'End' },
  ];
  public readonly CHART_TYPE: ChartType = ChartType.Timeline;

  @Input('data')
  public set DATA(value: TimeLineData) {
    if (isNonNull(value)) {
      let index: number = 0;
      this.objects = new Map<number, SlotDataItem>();
      // set min max: Problem min max have to be outside range of data -> workaround
      // TODO store orig data when need in future
      // TODO modify label to orig range
      value.slots = value.slots.map((slot) => ({
        ...slot,
        data: slot.data
          .filter(
            (data) =>
              data.from.getTime() <= value.to.getTime() &&
              data.to.getTime() >= value.from.getTime()
          )
          .map((data) => ({
            ...data,
            from:
              data.from.getTime() < value.from.getTime()
                ? value.from
                : data.from,
            to: data.to.getTime() > value.to.getTime() ? value.to : data.to,
          })),
      }));

      this._options = {
        hAxis: {
          minValue: value.from,
          maxValue: value.to,
        },
      };
      // set data
      this._data = value.slots.reduce(
        (out, next) =>
          out.concat(
            next.data.map((data) => {
              this.objects.set(index++, { ...data, slotId: next.id });
              return [
                next.id,
                this.dataLabelFn(data),
                'opacity:1;',
                data.from,
                data.to,
              ];
            })
          ),
        []
      );
      this._data = this._data.concat(
        value.slots
          .filter((slot) => slot.data.length === 0)
          .map((slot) => [slot.id, '', 'opacity:0;', value.from, value.to])
      );
    } else this._data = undefined;
  }

  @Input()
  public dataLabelFn: (data: SlotData) => string = (data: SlotData) =>
    data.by ?? 'Unknown';

  @Output()
  public readonly select: EventEmitter<SlotDataItem> = new EventEmitter<SlotDataItem>();

  public get data(): Row[] {
    return this._data;
  }

  public get options(): any {
    return this._options;
  }

  public _onSelect(change: ChartSelectionChangedEvent): void {
    this.select.emit(this.objects.get(change.selection[0].row));
  }
}
