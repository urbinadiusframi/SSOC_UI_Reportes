import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  Observable,
  catchError,
  debounceTime,
  filter,
  map,
  of,
  startWith,
  switchMap,
} from 'rxjs';
import { Sociedad } from 'src/app/models/Sociedad.model';
import { ValueSearchComponent } from 'src/app/models/ValueSearchComponent';
import { Remitente } from 'src/app/models/modelsSelectService';
import { SelectService } from 'src/app/services/select.service';

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
  control: FormControl = new FormControl('');
  filteredValues: Observable<string[]>;
  sinResultados: boolean = false;
  cargando: boolean = false;
  @Input({ required: true }) limpiarFormulario: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['limpiarFormulario']) {
      this.buttonText = this.isSelectForListarRemitente
        ? 'Seleccione un remitente'
        : 'Seleccione una sociedad';
      this.control.setValue('', { emitEvent: false });
    }
  }

  ngOnInit() {
    this.filteredValues = this.control.valueChanges
      .pipe(debounceTime(1000))
      .pipe(
        startWith(''),
        filter((value) => value !== '' && value !== ' ' && value),
        switchMap((value) => {
          const filterValue = this._normalizeValue(value || '');
          this.cargando = true;
          this.sinResultados = false;

          if (this.isSelectForListarRemitente) {
            return this.selectService.getRemitenteByQuery(filterValue).pipe(
              map((res: Remitente[]) => {
                const result = res.map((a) => a.identificacionYNombre);
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
        })
      );
  }

  private emitValues(): void {
    this.onSelectValue.emit({
      propiedad: this.nombrePropiedad,
      valor: this.control.value,
    });
  }

  onClickButtonDelete(): void {
    this.buttonText = this.isSelectForListarRemitente
      ? 'Seleccione un remitente'
      : 'Seleccione una sociedad';
    this.control.setValue('', { emitEvent: false });

    this.emitValues();
    this.sinResultados = false;
  }

  private _normalizeValue(value: string): string {
    return value
      .toLocaleLowerCase()
      .replace(/^\s+|\s+$|\s+(?=\s)/g, '')
      .trim();
  }

  onSelectOption(value: string): void {
    this.buttonText = value;
    this.control.setValue(value, { emitEvent: false });
    this.sinResultados = false;
    this.emitValues();
  }
}
