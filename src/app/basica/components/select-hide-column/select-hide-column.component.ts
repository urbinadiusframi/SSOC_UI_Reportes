import { Component, Input, Output, EventEmitter } from '@angular/core';
import { basicaValueOptionsSelectColumns, OptionsBasicaSelectColumns } from 'src/app/models/optionsBasicaSelectColumns';

@Component({
  selector: 'app-select-hide-column',
  templateUrl: './select-hide-column.component.html',
  styleUrls: ['./select-hide-column.component.scss'],
})
export class SelectHideColumnComponent {
  @Input({ required: true }) options: OptionsBasicaSelectColumns =
    basicaValueOptionsSelectColumns;
  @Output() eventHideColumn: EventEmitter<OptionsBasicaSelectColumns> =
    new EventEmitter<OptionsBasicaSelectColumns>();

  onChecked(event: Event): void {
    const option: string = (event.target as HTMLFormElement).name;
    const value: boolean = (this.options as any)[option];

    (this.options as any)[option] = !value;

    this.eventHideColumn.emit(this.options);
  }
}
