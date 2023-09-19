import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-dropdown-search',
  templateUrl: './dropdown-search.component.html',
  styleUrls: ['./dropdown-search.component.scss'],
})
export class DropdownSearchComponent implements OnInit, OnChanges {
  @Input({ required: true }) formControlConsultaMigrados: FormControl =
    new FormControl('');
  @Input({ required: true }) datos: string[] = [];
  private filteredValues: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  @Input({ required: true }) limpiarFormulario: boolean = false;

  sinResultados: boolean = false;
  grupo: FormGroup;
  buttonText: string = 'Seleccione una opcion';
  filteredValues$ = this.filteredValues.asObservable();


  constructor(private fb: FormBuilder) {
    this.grupo = this.fb.group({
      control: this.fb.array([]),
      texto: this.fb.control('')
    });
  }

  ngOnInit(): void {
    this.formControlConsultaMigrados.valueChanges.subscribe({
      next: (res) => (!res) ? this.buttonText = 'Seleccione una opción' : this.buttonText,
    });
    this.grupo.get('texto')?.valueChanges.subscribe({
      next: (res) => this.filter(res),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['datos']) {
      this.filteredValues.next(changes['datos'].currentValue);
    }

    if (changes['limpiarFormulario']) {
      if (changes['limpiarFormulario'].currentValue) {
        this.buttonText = 'Seleccione una opcion';
        this.formControlConsultaMigrados.setValue('');
        this.grupo.setValue({ control: [] });
      }
    }
  }

  filter(value: string): void {
    if (!value) {
      this.sinResultados = false;
      this.filteredValues.next(this.datos);
    }

    value = this.sanatizeQuery(value);
    const result: string[] = this.datos.filter((a) => {
      const opcion: string = this.sanatizeQuery(a ?? '');

      return opcion.includes(value);
    });

    this.filteredValues.next(result.map((a) => a));

    this.sinResultados = result.length === 0 ? true : false;
  }

  sanatizeQuery(str: string): string {
    const normalizedStr = str.normalize('NFD');
    const replacedStr = normalizedStr.replace(/[\u0300-\u036f]/g, '');
    return replacedStr.toUpperCase();
  }

  onSelectOption(value: string): void {
    this.buttonText = value;
    this.control?.push(new FormControl(value), { emitEvent: false });
    // this.control.setValue(value);

    this.formControlConsultaMigrados.setValue((this.control.value as string[]).join(','));
  }

  onClickButtonDelete(): void {
    this.buttonText = 'Seleccione una opcion';
    this.formControlConsultaMigrados.setValue('');
    // this.control.setValue('');
    this.grupo.reset();
    this.filteredValues.next(this.datos);
  }

  onClickDropDown(): void {
    this.formControlConsultaMigrados.markAsTouched();
  }

  get control() {
    return this.grupo.get('control') as FormArray;
  }
}
