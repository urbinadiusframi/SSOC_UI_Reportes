import {
  Component,
  EventEmitter, inject, Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  catchError, filter, map, Observable, of
} from 'rxjs';
import { Sociedad } from 'src/app/models/Sociedad.model';
import { ValueSearchComponent } from 'src/app/models/ValueSearchComponent';
import { SelectService } from 'src/app/services/select.service';
import {
  FuncionarioDto,
  FuncionarioDTO
} from '../../../models/modelsSelectService';

@Component({
  selector: 'app-select-search-with-request',
  templateUrl: './select-search-with-request.component.html',
  styleUrls: ['./select-search-with-request.component.scss'],
})
export class SelectSearchWithRequestComponent implements OnInit, OnChanges {
  private selectService: SelectService = inject(SelectService);
  @Input({ required: true }) isSelectForListarRemitente: boolean;
  @Input({ required: true }) nombrePropiedad: string = '';
  @Input({ required: true }) buttonText: string = '';
  @Input({ required: true }) placeholder: string = '';
  @Output() onSelectValue: EventEmitter<ValueSearchComponent> =
    new EventEmitter<ValueSearchComponent>();
  grupo: FormGroup;
  // control: FormArray<string, string> = new FormArray<string, string>([]);
  filteredValues: Observable<string[]>;
  sinResultados: boolean = false;
  cargando: boolean = false;
  @Input({ required: true }) limpiarFormulario: boolean = false;


  constructor(private fb: FormBuilder) {
    this.grupo = this.fb.group({
      control: this.fb.array([]),
      texto: this.fb.control('')
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['limpiarFormulario']) {
      this.buttonText = this.isSelectForListarRemitente
        ? 'Seleccione un remitente'
        : 'Seleccione una sociedad';
      this.grupo.setValue({ control: [], texto: '' }, { emitEvent: false });
    }
  }

  ngOnInit() {
    const filterValue = this._normalizeValue(this.grupo.get('texto')?.value || '');
    this.filteredValues = this.listByFilter(filterValue);
    this.cargando = true;
    this.sinResultados = false;
    this.grupo.get('texto')?.valueChanges.subscribe({
      next: (res) => this.filteredValues = this.listByFilter('').pipe(map(str => str.filter(st => st.includes(res.toUpperCase())))),
    });
  }

  private emitValues(): void {
    this.onSelectValue.emit({
      propiedad: this.nombrePropiedad,
      valor: (this.grupo.value.control as string[]).join(','),
    });
  }

  onClickButtonDelete(): void {
    this.buttonText = this.isSelectForListarRemitente
      ? 'Seleccione un remitente'
      : 'Seleccione una sociedad';
    // this.control.setValue();
    this.grupo.patchValue({ control: [], texto: '' }, { emitEvent: false });
    this.control.clear();
    // this.filteredValues = this.listByFilter('');
    this.emitValues();
    this.sinResultados = false;
  }

  private _normalizeValue(value?: string): string {
    return value!
      .toLocaleLowerCase()
      .replace(/^\s+|\s+$|\s+(?=\s)/g, '')
      .trim();
  }

  onSelectOption(value: string): void {
    (this.control)?.push(new FormControl(value), { emitEvent: false });
    const text = (this.control.value as string[]).join(',');
    this.buttonText = text;
    // this.control.setValue(value, { emitEvent: false });
    this.sinResultados = false;
    this.grupo.patchValue({ ...this.grupo.value, text: text }, { emitEvent: false });
    this.emitValues();

  }
  get control() {
    return this.grupo.get('control') as FormArray;
  }

  is(obj: FuncionarioDTO | FuncionarioDto): obj is FuncionarioDTO { return (<FuncionarioDTO>obj).username !== undefined; }

  listByFilter(filterValue: string): Observable<string[]> {
    if (this.isSelectForListarRemitente) {
      return this.selectService.getFuncionariosAsignadosByDependencias(filterValue).pipe(
        map((res: FuncionarioDTO[] | FuncionarioDto[]) => {
          const result = res.map((a) => this.is(a) ? `${a.numeroDocumento} - ${a.nombre}` : `${a.funcionario} - ${a.nombreEmpleado} ${a.apellidoEmpleado}`);
          this.cargando = false;
          this.sinResultados = result.length === 0 ? true : false;
          return result;
        }),
        catchError((err) => {
          console.log(err);
          this.cargando = false;
          this.sinResultados = true;

          return of([]);
        })
      );
    }

    return this.selectService
      .filtrarByNumeroIdentificacionSociedad(filterValue)
      .pipe(
        map((res: Sociedad[]) => {
          const result = res.map((a) =>
            `${a.numeroId} - ${a.nombreRz}`.trim()
          );
          this.cargando = false;
          this.sinResultados = result.length === 0 ? true : false;
          return result;
        }),
        catchError((err) => {
          console.log(err);
          this.cargando = false;
          this.sinResultados = true;

          return of([]);
        })
      );
  }

}

