import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  OptionsSelectColumns,
  defaultValueOptionsSelectColumns,
} from 'src/app/models/optionsSelectColumns';

@Component({
  selector: 'app-select-hide-column',
  templateUrl: './select-hide-column.component.html',
  styleUrls: ['./select-hide-column.component.scss'],
})
export class SelectHideColumnComponent {
  @Input({ required: true }) options: OptionsSelectColumns =
    defaultValueOptionsSelectColumns;
  @Output() eventHideColumn: EventEmitter<OptionsSelectColumns> =
    new EventEmitter<OptionsSelectColumns>();

  onChecked(event: Event): void {
    const option: string = (event.target as HTMLFormElement).name;
    const value: boolean = (this.options as any)[option];

    (this.options as any)[option] = !value;

    this.eventHideColumn.emit(this.options);
  }
}
