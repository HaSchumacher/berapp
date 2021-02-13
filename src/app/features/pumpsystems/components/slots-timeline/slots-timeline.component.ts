import { Component, Input } from '@angular/core';
import { SlotData } from '@model/pumpsystem';
import { isNonNull } from '@utilities';
import { ChartType, Column, Formatter, Row } from 'angular-google-charts';
import { TimeLineData } from './TimeLineData';

@Component({
  selector: 'app-slots-timeline',
  templateUrl: './slots-timeline.component.html',
  styleUrls: ['./slots-timeline.component.scss'],
})
export class SlotsTimelineComponent {
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
        (out, next) => [
          ...out,
          ...next.data.map((data) => [
            next.id,
            this.dataLabelFn(data),
            'opacity:1;',
            data.from,
            data.to,
          ]),
        ],
        value.slots
          .filter((slot) => slot.data.length === 0)
          .map((slot) => [
            slot.id,
            '',
            'opacity:0;',
            value.from,
            value.to,
          ]) as Row[]
      );
    } else this._data = undefined;
  }

  formatters: Formatter[] = [
    {
      colIndex: 2,
      formatter: {
        format: (data, column) => {
          for (let row = 0; row < data.getNumberOfRows(); row++) {
            const element = data.getValue(row, column);
            data.setFormattedValue(row, column, this.dataTooltipFn(element));
          }
        },
      },
    },
    {
      colIndex: 1,
      formatter: {
        format: (data, column) => {
          for (let row = 0; row < data.getNumberOfRows(); row++) {
            const element = data.getValue(row, column);
            data.setFormattedValue(row, column, this.dataLabelFn(element));
          }
        },
      },
    },
  ];

  @Input()
  public dataLabelFn: (data: SlotData) => string = (data: SlotData) =>
    data.by ?? 'Unknown';

  @Input()
  public dataTooltipFn: (data: SlotData) => string = (data: SlotData) =>
    String((data.to.getTime() - data.from.getTime()) / 1000 / 60 / 60) ??
    'qwer';

  public get data(): Row[] {
    return this._data;
  }

  public get options(): any {
    return this._options;
  }
}
