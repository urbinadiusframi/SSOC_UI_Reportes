import { Component, inject, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { searchFields } from 'src/app/models/Busqueda.model';
import { Formulario } from 'src/app/models/Formulario.model';
import { CriteriaDTO, PageDTO } from 'src/app/models/ListaCriteriosDTO.model';
import { Modulo } from 'src/app/models/modulo.model';
import { SearchRadicadoRequestDTO } from 'src/app/models/SearchRadicadoRequestDTO';
import { ValueSearchComponent } from 'src/app/models/ValueSearchComponent';
import { ConsultasReporteService } from 'src/app/services/consultas-reporte.service';
import { CustomModalService } from 'src/app/services/custom-modal.service';
import { EncabezadoProfileService } from 'src/app/services/encabezado-profile.service';
import { ValidatorsFormService } from 'src/app/services/validators-form.service';
import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';
import {
  Aplicacion,
  Ciudad,
  Departamento, FuncionarioDTO,
  FuncionarioDto, Medio,
  TipoCuaderno, TipoSeguridadDto
} from '../../../models/modelsSelectService';
import { SelectService } from '../../../services/select.service';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private encabezadoProfile: EncabezadoProfileService = inject(
    EncabezadoProfileService
  );
  private consultasReporteService: ConsultasReporteService = inject(
    ConsultasReporteService
  );
  private selectService: SelectService = inject(SelectService);
  private formBuilder: UntypedFormBuilder = inject(UntypedFormBuilder);
  private validatorFormService: ValidatorsFormService = inject(
    ValidatorsFormService
  );
  private customModalService: CustomModalService = inject(CustomModalService);
  private dialog: MatDialog = inject(MatDialog);

  tramites: string[] = [];
  MEDIO: Medio[] = [];
  tipoCuaderno: TipoCuaderno[] = [];
  departamentos: Departamento[] = [];
  modulo: Modulo[] = [];
  SEGURIDAD: TipoSeguridadDto[] = [];
  SEGURIDADES: string[] = [];
  documentos: SearchRadicadoRequestDTO[] = [];
  ciudades: Ciudad[] = [];
  funcionarios: string[] = [];
  apps: Aplicacion[] = [];
  procesos: string[] = [];
  dependencias: string[] = [];
  totalResultado: number = 0;
  loading: boolean = false;
  totalPage: Array<number> = [];
  mostarPaginador: boolean = false;
  URLBACKEND = environment.urlBackend;
  consultaRealizada: boolean = false;
  urlConsultaDescargaMasiva: string = '';
  formularioBusquedad = this.formBuilder.group(
    {
      numeroRadicado: [
        '',
        [
          Validators.maxLength(20),
          Validators.minLength(14),
          Validators.pattern('^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\\s\\-]*$'),
          this.validatorFormService.validatorIsNumeroRadicadoValid(),
        ],
      ],
      expediente: [
        '',
        [
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\\s\\-]*$'),
        ],
      ],
      entrada: [''],
      salida: [''],
      fechaHasta: [''],
      fechaRadicacion: [''],
      numeroRadicadoAnterior: [
        '',
        [
          Validators.maxLength(16),
          Validators.pattern('^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\\s\\-]*$'),
          this.validatorFormService.validatorIsNumeroRadicadoValid(),
        ],
      ],
      codigoONombreTramite: [''],
      identificacionSociedad: [''],
      dependenciaAsignada: [''],
      codigoOdependenciaOrigen: [''],
      funcionarioAsignado: [''],
      funcionarioOrigen: [''],
      identificacionDestinatario: [
        '',
        [
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\\s\\.\\-]+$'),
        ],
      ],
      identificacionRemitente: [''],
      direccion: [
        '',
        [
          Validators.pattern('^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\\s\\-./#]*$'),
          Validators.maxLength(100),
        ],
      ],
      telefono: [
        '',
        [
          Validators.maxLength(12),
          Validators.pattern('^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\\s\\.\\-\\+]+$'),
        ],
      ],
      medioEnvio: [''],
      consecutivo: [
        '',
        [
          Validators.maxLength(25),
          Validators.pattern('^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\\-_]+$'),
        ],
      ],
      tipoSeguridad: [''],
      referenciaExternaNumero: [
        '',
        [
          Validators.maxLength(60),
          Validators.pattern('^[A-Za-z0-9\\s.$\\-áéíóúÁÉÍÓÚ]*$'),
        ],
      ],
      termino: ['', [this.validatorFormService.validatorFieldTermino()]],
      usuarioRadicador: [
        '',
        [
          Validators.maxLength(80),
          Validators.pattern('^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\\s]*$'),
        ],
      ],
      multa: [
        '',
        [
          Validators.max(99999999),
          this.validatorFormService.validatorNegativeValues(),
        ],
      ],
      responsableFirma: ['', Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$')],
      fechaVence: [''],
      modulo: [''],
      aplicacion: [''],
      fechaEstadosFinancieros: [''],
      estado: [''],
      usuario: [''],
      anexosFisicos: ['', this.validatorFormService.validatorAnexosFisicos()],
      borrador: [
        '',
        [
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\\s\\-]*$'),
        ],
      ],
      lote: ['', [this.validatorFormService.validatorFieldLote()]],
      linea: ['', this.validatorFormService.validatorNegativeValues()],
      horaRadicacion: [''],
      digitalizacion: [''],
      digitalizador: ['', Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$')],
      ciudad: [''],
      codigoONombreProceso: [''],
      folios: [
        '',
        [
          Validators.max(9999),
          this.validatorFormService.validatorNegativeValues(),
        ],
      ],
      representanteLegal: [
        '',
        [
          Validators.maxLength(100),
          Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ.\\s]+$'),
        ],
      ],
      page: {
        pageNumber: 0,
        pageSize: 15,
      },
      busquedaPorContenido: ['', Validators.maxLength(500)],
      paquete: ['', Validators.pattern('^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\\s\\-]*$')],
      nombreDestinatario: [
        '',
        [
          Validators.maxLength(280),
          Validators.pattern('^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\\s\\.\\-]+$'),
        ],
      ],
      correoElectronico: [
        '',
        [this.validatorFormService.validatorEmail(), Validators.maxLength(60)],
      ],
      tipoCuaderno: [''],
      postalEstado: ['', Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$')],
      usuarioQueProyecto: [
        '',
        Validators.pattern('^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\\s]*$'),
      ],
      busquedaAvanzadaRadicacion: [
        '',
        [
          Validators.pattern('^[0-9?*,;-]+$'),
          this.validatorFormService.validatorRange(),
        ],
      ],
      departamento: [''],
    },
    {
      validators: [
        this.validatorFormService.validatorInitialDate(),
        this.validatorFormService.validatorFieldCiudadAndDepartamento(),
      ],
    }
  );
  request: any = [];
  formMustBeCleaned: boolean = false;
  logos = {
    email: environment.production
      ? '/ConsultaMigrados/assets/logo_outlook.webp'
      : 'https://res.cloudinary.com/dwnvlpcas/image/upload/v1689786479/outlook_1_npdhlr.webp',
    excel: environment.production
      ? '/ConsultaMigrados/assets/logo_excel.webp'
      : 'https://res.cloudinary.com/dwnvlpcas/image/upload/v1681143295/sobresalir_lypsqa.webp',
    pdf: environment.production
      ? '/ConsultaMigrados/assets/logo_pdf.webp'
      : 'https://res.cloudinary.com/dwnvlpcas/image/upload/v1681143295/pdf_1_smfqlf.webp',
  };

  ngOnInit(): void {
    this.getTramite();
    this.getMediosEnvio();
    this.getSeguridad();
    this.getFuncionariosAsignadosByDependencias('');
    this.getApps();
    this.getProceso();
    this.getDependencia();
    this.getTipoCuaderno();
    this.getModulos();
    this.getDepartamentos();

    this.formularioBusquedad.get('departamento')?.valueChanges.subscribe({
      next: (res) => this.onChangesInInputDepartamento(res),
    });

    this.formularioBusquedad.get('numeroRadicado')?.valueChanges.subscribe({
      next: (res) => console.log('numeroRadicado: ' + res),
    });

    this.formularioBusquedad.get('codigoOdependenciaOrigen')?.valueChanges.subscribe({
      next: (res) => {
        this.getFuncionariosAsignadosByDependencias(res.split(',').map((str: any) => str.split(' - ')[0]))
        this.funcionarios = []
        this.getFormControl('funcionarioOrigen').reset()
      },
    });
  }

  onChangesInInputDepartamento(idDepartamento: string): void {
    if (idDepartamento !== '' && idDepartamento) {
      this.getCiudades(idDepartamento);
    } else {
      this.ciudades = [];
      this.formularioBusquedad.get('ciudad')?.setValue('');
    }
  }

  isFillOnlyBusquedaPorContenido(formulario: Formulario): boolean {
    const datos: any = structuredClone(formulario);
    let result: boolean = true;
    const isFillBusquedaPorContenido: boolean = datos.busquedaPorContenido
      ? true
      : false;

    Object.keys(datos).forEach((key) => {
      if (
        !['busquedaPorContenido', 'cantidadRegistros', 'page'].includes(key) &&
        datos[key]
      ) {
        result = false;
      }
    });

    return result && isFillBusquedaPorContenido;
  }

  openDialogDescargaMasiva(title: string, url: string): void {
    this.dialog.open(ModalComponent, {
      width: '95%',
      data: {
        url,
        title,
      },
    });
  }

  isEmptyBusquedaPorContenido(formulario: Formulario): boolean {
    const datos: any = structuredClone(formulario);
    let result: boolean = false;
    const isFillBusquedaPorContenido: boolean = datos.busquedaPorContenido
      ? false
      : true;

    Object.keys(datos).forEach((key) => {
      if (
        !['busquedaPorContenido', 'cantidadRegistros', 'page'].includes(key) &&
        datos[key]
      ) {
        result = true;
      }
    });

    return result && isFillBusquedaPorContenido;
  }

  onSelectSociedadORemitente(valueSearchComponent: ValueSearchComponent) {
    this.formularioBusquedad.controls[valueSearchComponent.propiedad].setValue(
      valueSearchComponent.valor
    );
  }

  /**
   * Este metodo se usa para preparar los datos ingresados en el formulario antes de realizar la consulta.
   * @return Un objeto con los datos del formulario.
   *
   * @author Daniel Alfaro
   * @version 1.0
   */
  prepararFormulario(): CriteriaDTO[] {
    const datosFormulario = structuredClone(this.formularioBusquedad.value);
    const llavesQueNoSeDebenLimpiar: string[] = [
      'entrada',
      'salida',
      'fechaHasta',
      'fechaRadicacion',
      'fechaVence',
      'horaRadicacion',
      'page',
      'cantidadRegistros',
      'lote',
      'multa',
      'linea',
      'folios',
      'termino',
    ];
    Object.keys(datosFormulario).forEach((key) => {
      if (!llavesQueNoSeDebenLimpiar.includes(key)) {
        datosFormulario[key] = datosFormulario[key].trim?.().replace(/\s+/g, ' ');
      }
    });

    if (datosFormulario.codigoONombreTramite) {
      datosFormulario.codigoTramite = datosFormulario.codigoONombreTramite
        .split('-')[0]
        .trim();
    } else {
      datosFormulario.codigoTramite = '';
    }

    if (datosFormulario.codigoONombreProceso) {
      datosFormulario.codigoProceso = datosFormulario.codigoONombreProceso
        .split('-')[0]
        .trim();
    } else {
      datosFormulario.codigoProceso = '';
    }

    if (datosFormulario.dependenciaAsignada) {
      // datosFormulario.identificacionDependenciaAsignada =
      //   datosFormulario.dependenciaAsignada.split('-')[0].trim();
    } else {
      datosFormulario.identificacionDependenciaAsignada = '';
    }

    if (datosFormulario.codigoOdependenciaOrigen) {
      datosFormulario.codigoDependenciaOrigen =
        datosFormulario.codigoOdependenciaOrigen.split(',')
          .map((dep: string) => dep.split(' - ')[0]);
    } else {
      datosFormulario.codigoDependenciaOrigen = '';
    }

    if (datosFormulario.tipoSeguridad) {
      datosFormulario.tipoSeguridad =
        datosFormulario.tipoSeguridad.split(',')
          .map((dep: string) => dep.split(' - ')[1]);
    } else {
      datosFormulario.tipoSeguridad = '';
    }

    if (datosFormulario.busquedaAvanzadaRadicacion) {
      datosFormulario.busquedaAvanzadaRadicacion =
        this.limpiarDatosBusquedaAvanzadaRadicacion(
          datosFormulario.busquedaAvanzadaRadicacion
        );
    }

    if (datosFormulario.identificacionRemitente) {
      datosFormulario.identificacionRemitente =
        datosFormulario.identificacionRemitente.trim().split(',')
          .map((dep: string) => dep.split(' - ')[0]);
    }

    if (datosFormulario.identificacionSociedad) {
      datosFormulario.identificacionSociedad =
        datosFormulario.identificacionSociedad.split('-')[0].trim();
    }

    if (datosFormulario.funcionarioAsignado) {
      datosFormulario.funcionarioAsignado = datosFormulario.funcionarioAsignado
        .split('-')[0]
        .trim();
    }

    if (datosFormulario.funcionarioOrigen) {
      datosFormulario.funcionarioOrigen =
        datosFormulario.funcionarioOrigen.split(',')
          .map((dep: string) => dep.split(' - ')[0]);
    }

    datosFormulario.entrada = datosFormulario.entrada ? '1' : '';
    datosFormulario.salida = datosFormulario.salida ? '0' : '';

    delete datosFormulario.codigoONombreTramite;
    delete datosFormulario.codigoONombreProceso;
    delete datosFormulario.dependenciaAsignada;
    delete datosFormulario.codigoOdependenciaOrigen;
    delete datosFormulario.departamento;

    console.log(datosFormulario)

    const mappedArray = Object.entries(datosFormulario)
      .filter(([key, value]) => value !== undefined && value !== '' && key !== 'page')
      .map(([key, value]) => ({
        key: searchFields.get(key)?.field,
        value: value,
        operation: searchFields.get(key)?.operador,
      })) as CriteriaDTO[];
    console.log(mappedArray)

    return mappedArray;
  }

  limpiarDatosBusquedaAvanzadaRadicacion(value: string): string {
    return value
      .replaceAll(/[a-zA-Z]/g, '')
      .replaceAll("'", '')
      .replaceAll(/(?<=\s)\s+/g, '')
      .replace(/[^0-9,\-;?*]/g, '')
      .trim();
  }

  /**
   * Este metodo se usa para validar si el usuario diligencio al menos un campo del formulario.
   * @return Booleano, en base a si se diligencio o no al menos un campo del formulario.
   *
   * @author Daniel Alfaro
   * @version 1.0
   */
  validateForm(): boolean {
    const valoresActualesFormulario = structuredClone(
      this.formularioBusquedad.value
    );

    const { ciudad, departamento } = valoresActualesFormulario;

    delete valoresActualesFormulario.page;
    delete valoresActualesFormulario.cantidadRegistros;
    delete valoresActualesFormulario.ciudad;
    delete valoresActualesFormulario.departamento;

    for (let valorCampo of Object.values(valoresActualesFormulario)) {
      if (valorCampo && valorCampo !== ' ') {
        return true;
      }
    }

    return (ciudad === '' && departamento !== '') ||
      (ciudad === '' && departamento === '')
      ? false
      : true;
  }

  getTramite(): void {
    setTimeout(() => {
      this.selectService.getTramitesPaginated().subscribe({
        next: (res) =>
          (this.tramites = res.map((a) => a.codigo + ' - ' + a.nombre)),
      });
    }, 1500);
  }

  getTipoCuaderno(): void {
    setTimeout(() => {
      this.selectService.getTipoCuaderno().subscribe({
        next: (res) => (this.tipoCuaderno = res),
        error: (err) => console.error(err),
      });
    }, 1500);
  }

  getModulos(): void {
    setTimeout(() => {
      this.selectService.getModulos().subscribe({
        next: (res) => (this.modulo = res),
        error: (err) => console.error(err),
      });
    }, 1500);
  }

  getMediosEnvio(): void {
    setTimeout(() => {
      this.selectService.getMediosEnvio().subscribe({
        next: (res) => (this.MEDIO = res),
        error: (error) => console.error(error),
      });
    }, 1500);
  }

  getSeguridad(): void {
    this.selectService.tiposSeguridad$.subscribe({
      // next: (res: TipoSeguridadDto[]) => (this.SEGURIDAD = res),
      next: (res: TipoSeguridadDto[]) => {
        let i = 1;
        (this.SEGURIDADES = res.map(seg => `${i++} - ${seg.codigo}`.toUpperCase().trim()))
      },
    });
  }

  getCiudades(idDepartamento: string): void {
    this.selectService.getCiudades(idDepartamento).subscribe({
      next: (res) => {
        this.ciudades = res;
      },
      error: (error) => console.error(error),
    });
  }

  getApps(): void {
    setTimeout(() => {
      this.selectService.getApps().subscribe({
        next: (res) => (this.apps = res),
        error: (error) => console.error(error),
      });
    }, 1500);
  }

  getFuncionarioAsignados(): void {
    setTimeout(() => {
      this.selectService.getFuncionariosAsignados().subscribe({
        next: (res) => {
          this.funcionarios = res.map((a) =>
            `${a.idUsuario} - ${a.nombre}`.toUpperCase().trim()
          );
        },
        error: (error) => console.error(error),
      });
    }, 1500);
  }

  is(obj: FuncionarioDTO | FuncionarioDto): obj is FuncionarioDTO { return (<FuncionarioDTO>obj).username !== undefined; }

  getFuncionariosAsignadosByDependencias(dependencias: string): void {
    setTimeout(() => {
      this.selectService.getFuncionariosAsignadosByDependencias(dependencias).subscribe({
        next: (res) => {
          this.funcionarios = res.map((a: FuncionarioDTO | FuncionarioDto) =>
            (this.is(a)) ?
              `${a.username} - ${a.nombre}`.toUpperCase().trim()
              :
              `${a.funcionario} - ${a.nombreEmpleado} ${a.apellidoEmpleado}`.toUpperCase().trim()
          );
        },
        error: (error) => console.error(error),
      });
    }, 1500);
  }

  getDepartamentos(): void {
    setTimeout(() => {
      this.selectService.getDepartamentos().subscribe({
        next: (res) => {
          this.departamentos = res;
        },
        error: (error) => console.error(error),
      });
    }, 1500);
  }

  getProceso(): void {
    setTimeout(() => {
      this.selectService.getProcesos().subscribe({
        next: (res) =>
        (this.procesos = res.map((a) =>
          `${a.codigo} - ${a.nombreProceso}`.toUpperCase().trim()
        )),
        error: (error) => console.error(error),
      });
    }, 1500);
  }

  getDependencia(): void {
    setTimeout(() => {
      this.selectService.getDepedencias().subscribe({
        next: (res) =>
        (this.dependencias = res.map((a) =>
          `${a.codigo} - ${a.nombre}`.toUpperCase().trim()
        )),
        error: (error) => console.error(error),
      });
    }, 1500);
  }

  getPage(): number {
    return this.formularioBusquedad.get('page')?.value;
  }

  antes(): void {
    this.formularioBusquedad.patchValue({
      page: {
        pageNumber: this.getPage() - 1,
        pageSize: this.formularioBusquedad.value.page.pageSize,
      }
    });
    this.consultar();
  }

  despues(): void {
    this.formularioBusquedad.patchValue({
      page: {
        pageNumber: this.getPage() + 1,
        pageSize: this.formularioBusquedad.value.page.pageSize,
      }
    });
    this.consultar();
  }

  limpiarFormulario(): void {
    const formularioSinDatos = structuredClone(this.formularioBusquedad.value);

    for (let key of Object.keys(formularioSinDatos)) {
      if (key === 'page') {
        formularioSinDatos[key] = 0;
      } else if (key === 'cantidadRegistros') {
        formularioSinDatos[key] = 15;
      } else {
        formularioSinDatos[key] = '';
      }
    }

    this.formMustBeCleaned = true;
    this.request.forEach((r: any) => r.unsubscribe());
    this.request = [];
    this.formularioBusquedad.setValue(formularioSinDatos);
    this.consultaRealizada = false;
    this.documentos = [];
    this.totalResultado = 0;
    this.loading = false;
    this.mostarPaginador = false;
    setTimeout(() => {
      this.customModalService.showModalSuccess(
        'Formulario limpiado exitosamente'
      );
      this.formMustBeCleaned = false;
    }, 200);
  }

  onChangeCuantityRegisters(event: Event): void {
    const quantity: number = (event.target as HTMLFormElement)?.['value'];

    this.formularioBusquedad.patchValue({
      page: {
        pageNumber: 0,
        pageSize: quantity,
      }
    });

    this.consultar();
  }

  onClickSpecificQuantityRegisters(value: number): void {
    if (
      this.formularioBusquedad.get('cantidadRegistros')?.value !== value &&
      this.formularioBusquedad.get('page')?.value > 0
    ) {
      this.formularioBusquedad.patchValue(
        {
          page: {
            pageNumber: this.formularioBusquedad.get('page')?.value,
            pageSize: value,
          }
        },
        { emitEvent: false }
      );

      this.consultar();
    } else if (
      this.formularioBusquedad.get('cantidadRegistros')?.value !== value &&
      this.formularioBusquedad.get('page')?.value === 0
    ) {
      this.formularioBusquedad.patchValue(
        {
          page: {
            pageNumber: 0,
            pageSize: value,
          }
        },
        { emitEvent: false }
      );

      this.consultar();
    }
  }

  downloadReportPdf(): void {
    this.loading = true;

    this.encabezadoProfile
      .generateReportPdf(this.prepararFormulario())
      .subscribe({
        next: () => {
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          console.log(err);
          this.customModalService.showModalError(
            'Ocurrio un error, al momento de generar y descargar el reporte en pdf, por favor intentenlo mas tarde.'
          );
        },
      });
  }

  downloadReportPdfWithCRB(): void {
    this.loading = true;

    // this.encabezadoProfile.generateReportPdfWithCRB(this.documentos).subscribe({
    //   next: () => {
    //     this.loading = false;
    //   },
    //   error: (err) => {
    //     this.loading = false;
    //     console.log(err);
    //     this.customModalService.showModalError(
    //       'Ocurrio un error, al momento de generar y descargar el reporte en pdf, por favor intentenlo mas tarde.'
    //     );
    //   },
    // });
  }

  generateReport(isExcel: boolean = true): void {
    if (this.consultaRealizada) {
      this.customModalService
        .getSwalMixinInfo()
        .fire({
          text: 'Ingresa tu correo electrónico',
          input: 'text',
          showCancelButton: true,
          confirmButtonText: 'Confirmar',
          confirmButtonColor: '#dc7535',
          showLoaderOnConfirm: true,
          preConfirm: (correo: string) => {
            const expresionRegularEmail: RegExp =
              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;
            const expresionRegularDespuesDelArroba: RegExp =
              /^[^.]{2,}.[^.]{2,}([^.]*.[^.]{2,})*$/;
            const expresionRegularDominioCorreo: RegExp =
              /^[a-zA-Z0-9._%+-]+@supersociedades.gov.co$/;

            let isValid: boolean = false;

            if (
              expresionRegularEmail.test(correo ?? '') &&
              expresionRegularDespuesDelArroba.test(correo.split('@')[1] ?? '')
            ) {
              isValid = true;
            }

            if (!isValid) {
              Swal.showValidationMessage('Por favor ingrese un correo válido.');
            } else if (!expresionRegularDominioCorreo.test(correo ?? '')) {
              Swal.showValidationMessage(
                'El dominio del correo no es válido,  por favor ingrese un correo válido.'
              );
            }
            return correo;
          },
          allowOutsideClick: () => !Swal.isLoading(),
        })
        .then((res: any) => {
          if (res.isConfirmed) {
            // const emailRequestDTO: EmailRequestDTO = {
            //   email: res.value,
            //   buscador: {},
            //   timestamp: new Date().getTime(),
            //   tipoDeReporte: isExcel ? 'excel' : 'pdf',
            // };

            // this.encabezadoProfile
            //   .sendReportToEmail(emailRequestDTO)
            //   .subscribe();

            this.customModalService.showModalSuccess(
              'El reporte se enviará a su correo cuando se termine de generar.'
            );
          }
        });
    }
  }

  generateReportWithCRB(isExcel: boolean = true): void {
    // if (this.consultaRealizada) {
    //   this.customModalService
    //     .getSwalMixinInfo()
    //     .fire({
    //       text: 'Ingresa tu correo electrónico',
    //       input: 'text',
    //       showCancelButton: true,
    //       confirmButtonColor: '#dc7535',
    //       confirmButtonText: 'Confirmar',
    //       showLoaderOnConfirm: true,
    //       preConfirm: (correo: string) => {
    //         const expresionRegularEmail: RegExp =
    //           /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;
    //         const expresionRegularDespuesDelArroba: RegExp =
    //           /^[^.]{2,}.[^.]{2,}([^.]*.[^.]{2,})*$/;
    //         const expresionRegularDominioCorreo: RegExp =
    //           /^[a-zA-Z0-9._%+-]+@supersociedades.gov.co$/;
    //         let isValid: boolean = false;

    //         if (
    //           expresionRegularEmail.test(correo ?? '') &&
    //           expresionRegularDespuesDelArroba.test(correo.split('@')[1] ?? '')
    //         ) {
    //           isValid = true;
    //         }

    //         if (!isValid) {
    //           Swal.showValidationMessage('Por favor ingrese un correo válido.');
    //         } else if (!expresionRegularDominioCorreo.test(correo ?? '')) {
    //           Swal.showValidationMessage(
    //             'El dominio del correo no es válido,  por favor ingrese un correo válido.'
    //           );
    //         }
    //       },
    //       allowOutsideClick: () => !Swal.isLoading(),
    //     })
    //     .then((res: any) => {
    //       if (res.isConfirmed) {
    //         const emailRequestDTO: EmailRequestCRBDTO = {
    //           email: res.value,
    //           registros: this.documentos,
    //           timestamp: new Date().getTime(),
    //           tipoDeReporte: isExcel ? 'excel' : 'pdf',
    //         };

    //         this.encabezadoProfile
    //           .sendReportToEmailWithCRB(emailRequestDTO)
    //           .subscribe();

    //         this.customModalService.showModalSuccess(
    //           'El reporte se enviará a su correo cuando se termine de generar.'
    //         );
    //       }
    //     });
    // }
  }

  getFormControl(value: string): FormControl {
    return this.formularioBusquedad.controls[value] as FormControl;
  }

  downloadReportExcel(): void {
    this.loading = true;
    const buscador = this.prepararFormulario();
    this.encabezadoProfile
      .generateReportExcel(
        {
          criteria: buscador, page: this.formularioBusquedad.value.page as PageDTO
        })
      .subscribe({
        next: () => {
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          console.log(err);

          this.customModalService.showModalError(
            'Ocurrio un error, al momento de generar y descargar el reporte en excel, por favor intentenlo mas tarde.'
          );
        },
      });
  }

  downloadReportExcelWithCRB(): void {
    this.loading = true;

    // this.encabezadoProfile
    //   .generateReportExcelWithCRB(this.documentos)
    //   .subscribe({
    //     next: () => {
    //       this.loading = false;
    //     },
    //     error: (err) => {
    //       this.loading = false;
    //       console.log(err);

    //       this.customModalService.showModalError(
    //         'Ocurrio un error, al momento de generar y descargar el reporte en excel, por favor intentenlo mas tarde.'
    //       );
    //     },
    //   });
  }

  onEventKeydownInputDate(event: Event) {
    // event.preventDefault();
  }


  /**
   * Este metodo se usa para realizar la consulta en base a los campos del formulario.
   *
   * @author Daniel Alfaro
   * @version 1.0
   */
  consultar(): void {
    this.loading = true;
    const formulario: CriteriaDTO[] = this.prepararFormulario();
    let request: Subscription | null = null;
    console.log(formulario)
    request = this.consultasReporteService.searchOnlyInDB({
      criteria: formulario, page: this.formularioBusquedad.value.page as PageDTO
    }).subscribe({
      next: (res) => {
        if (res.radicados.length === 0) {
          this.customModalService.showModalError(
            'No se encontraron resultados'
          );

          this.consultaRealizada = false;
          this.loading = false;
          this.documentos = [];
          this.formularioBusquedad.patchValue(
            {
              page: {
                pageNumber: 0,
                pageSize: 15,
              },
            },
            { emitEvent: false }
          );
        } else {
          this.consultaRealizada = true;
          this.documentos =
            this.encabezadoProfile.generateUrlRadicadosYAnexos(
              res.radicados
            );
          this.totalResultado = res.radicados.length;

          this.loading = false;
          this.totalPage = new Array(res.radicados.length + 1);
          this.mostarPaginador = this.totalPage ? true : false;
          // this.urlConsultaDescargaMasiva =
          //   this.encabezadoProfile.generateSearchURLDescargaMasiva(
          //     res.encabezados
          //   );
        }
        this.loading = false;
      },
      error: (err) => {
        this.customModalService.showModalError(
          'Ocurrio un error, vuelve a intentar mas tarde por favor'
        );

        console.log('Error : ', err);
        this.loading = false;
      },
    });


    if (request) {
      this.request.push(request);
    }
  }
}
