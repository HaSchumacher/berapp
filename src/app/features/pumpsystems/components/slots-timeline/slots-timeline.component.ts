import { Component, Input } from '@angular/core';
import { Slot, SlotData } from '@model/pumpsystem';
import { isNonNull } from '@utilities';
import { ChartType, Formatter, Row } from 'angular-google-charts';

@Component({
  selector: 'app-slots-timeline',
  templateUrl: './slots-timeline.component.html',
  styleUrls: ['./slots-timeline.component.scss'],
})
export class SlotsTimelineComponent {
  private _data: Row[];
  private _options: any;
  public readonly CHART_TYPE: ChartType = ChartType.Timeline;

  @Input()
  public set slots(value: Slot[]) {
    if (isNonNull(value)) {
      this._options = {
        hAxis: {
          minValue: this.from,
          maxValue: this.to,
        },
      };
      this._data = value.reduce(
        (out, next) => [
          ...out,
          ...next.data.map((data) => [next.id, data.from, data.to]),
        ],
        [] as Row[]
      );
    }
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

  /** Left bound
   *
   */
  @Input()
  public from: Date;
  /**
   * Right bound
   */
  @Input()
  public to: Date;

  public get data(): Row[] {
    return this._data;
  }

  public get options(): any {
    return this._options;
  }
}
