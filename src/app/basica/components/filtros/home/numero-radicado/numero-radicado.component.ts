import { Input } from '@angular/core';
import { Component, forwardRef, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ValidatorFn } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import 'tslib';

@Component({
  selector: 'basica-numero-radicado',
  templateUrl: './numero-radicado.component.html',
  styleUrls: ['./numero-radicado.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumeroRadicadoComponent),
      multi: true,
    },
  ],
})
export class NumeroRadicadoComponent implements ControlValueAccessor {
  value: string = '';
  @Input() control: AbstractControl<any, any> | null;

  // ControlValueAccessor methods
  onChange: any = () => {};
  onTouched: any = () => {};

  // Implement writeValue method
  writeValue(value: any): void {
    this.value = value;
  }

  // Implement registerOnChange method
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Implement registerOnTouched method
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Implement setDisabledState method (if needed)
  setDisabledState(isDisabled: boolean): void {
    // Optionally implement for disabled state handling
  }

  // Custom method to handle input changes
  onInputChange(value: string): void {
    this.value = value;
    this.onChange(value); // Notify Angular of value changes
    this.onTouched(); // Notify Angular of touched state
  }

}
