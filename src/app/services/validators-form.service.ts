import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsFormService {
  validatorInitialDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const fechaInicial: string = control.get('fechaRadicacion')?.value;
      const fechaFinal: string = control.get('fechaHasta')?.value;

      if (fechaFinal && fechaInicial) {
        let timestampFechaFinal: number = +Date.parse(fechaFinal);
        let timestampFechaInicial: number = +Date.parse(fechaInicial);

        return timestampFechaInicial > timestampFechaFinal
          ? { DatesInvalid: true }
          : null;
      }

      return null;
    };
  }

  /**
   * Validador customizado para el campo busqueda avanzada radicacion, basicamente valida que el booleano HASTA tenga un rango valido, es decir que el valor inicial que ingrese el usuario no sea mayor al valor final.
   *
   * @returns ValidatorFn
   */
  validatorRange(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string =
        control?.value?.trim()?.replaceAll(/(?<=\s)\s+/g, '') ?? '';

      if (value && value.includes(';')) {
        if (value.split(';').filter((a) => a).length === 1) {
          // Validar si el usuario envio dos radicados.

          return { busquedaAvanzadaUnSoloParametro: true };
        }

        if (value.split(';').length > 2 || value.split(';').length < 2) {
          // Validar si el usuario envio mas de dos radicados.

          return { busquedaAvanzadaInvalido: true };
        }

        if (value.includes(';')) {
          // Validar que los radicados enviados sean validos.
          const radicados: string[] = value.split(';');

          if (
            !/^(?:[^-]*-[^-]*){2}[^-]*$/.test(radicados[0]) ||
            !/^(?:[^-]*-[^-]*){2}[^-]*$/.test(radicados[1])
          ) {
            // Validar que los radicados tengan dos guiones.

            return { busquedaAvanzadaRadicadosInvalidos: true };
          }

          if (
            !/^[a-zA-Z0-9]{4}-[a-zA-Z0-9]{2}-[a-zA-Z0-9]{6}$/.test(
              radicados[0]
            ) ||
            radicados[0] === '0000-00-000000' ||
            !/^[a-zA-Z0-9]{4}-[a-zA-Z0-9]{2}-[a-zA-Z0-9]{6}$/.test(
              radicados[1]
            ) ||
            radicados[1] === '0000-00-000000'
          ) {
            // Validar que los radicados tengan una estructura valida ????-??-??????? y que no sean iguales a 0000-00-000000.

            return { busquedaAvanzadaRadicadosInvalidos: true };
          }
        }

        // Validar que el valor inicial no sea mayor al valor final.
        let valorInicial: number = +value.split(';')[0].replaceAll('-', '');
        let valorFinal: number = +value.split(';')[1].replaceAll('-', '');

        return valorInicial > valorFinal
          ? { rangeBusquedaAvanzadaInvalido: true }
          : null;
      }

      return null;
    };
  }

  validatorFieldTermino(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control?.value === '' || control?.value === null) {
        return null;
      }

      const expresionRegular: RegExp = /^([1-9]|[1-9]\d)$/;

      return expresionRegular.test(control?.value.toString())
        ? null
        : { lengthTermino: true };
    };
  }

  validatorFieldLote(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control?.value === '' || control?.value === null) {
        return null;
      }

      const expresionRegular: RegExp = /^([1-9]|[1-9]\d|[1-9]\d{2})$/;

      return expresionRegular.test(control?.value.toString())
        ? null
        : { lengthLote: true };
    };
  }

  validatorFieldCiudadAndDepartamento(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const ciudad: string = control.get('ciudad')?.value;
      const departamento: string = control.get('departamento')?.value;

      if (!ciudad && departamento) {
        return { ciudadInvalid: true };
      }

      return null;
    };
  }

  validatorEmail(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control?.value === '') {
        return null;
      }

      const expresionRegularEmail: RegExp =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;
      const expresionRegularDespuesDelArroba: RegExp =
        /^[^.]{2,}.[^.]{2,}([^.]*.[^.]{2,})*$/;

      return expresionRegularEmail.test(control?.value) &&
        expresionRegularDespuesDelArroba.test(control.value.split('@')[1])
        ? null
        : { emailInvalid: true };
    };
  }

  validatorIsNumeroRadicadoValid(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control?.value === '') {
        return null;
      }

      const numeroRadicado: string = control.value;
      const numeroRadicadoSplit: string[] = numeroRadicado.split('-');

      if (!/^(?:[^-]*-[^-]*){2}[^-]*$/.test(numeroRadicado)) {
        // Validar que el numero de radicado tenga minimo y maximo dos guiones
        return { numeroRadicadoIsNotValid: true };
      } else if (
        !/^[a-zA-Z0-9]{4}-[a-zA-Z0-9]{2}-[a-zA-Z0-9]{6}$/.test(
          numeroRadicado
        ) ||
        numeroRadicado === '0000-00-000000'
      ) {
        return { numeroRadicadoIsNotValid: true };
      } else if (
        numeroRadicadoSplit[0] === '0000' ||
        numeroRadicadoSplit[0][0] === '0' ||
        numeroRadicadoSplit[0][0] === '1' ||
        numeroRadicadoSplit[1] === '00' ||
        numeroRadicadoSplit[2] === '000000'
      ) {
        return { numeroRadicadoIsNotValid: true };
      }

      return null;
    };
  }

  validatorNegativeValues(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control?.value === '') {
        return null;
      }

      return control.value < 0 ? { negativeNumber: true } : null;
    };
  }

  validatorAnexosFisicos(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control?.value === '') {
        return null;
      }

      const expresionRegularAlfanumericoPuntosGuiones =
        /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ.\s-]*$/;

      const resultadoExpresionRegularAlfanumericoPuntosGuiones =
        expresionRegularAlfanumericoPuntosGuiones.test(
          control.value.replaceAll(/[+/()]/g, '')
        );
      let validacionOtrosSimbolos = true;

      for (let caracter of control.value
        .replaceAll(/[\wáéíóúñÁÉÍÓÚÑ.-]+/g, '')
        .split('')) {
        if (!caracter.includes('+', '/', '(', ')')) {
          validacionOtrosSimbolos = false;
          break;
        }
      }

      return !resultadoExpresionRegularAlfanumericoPuntosGuiones &&
        !validacionOtrosSimbolos
        ? { invalidAnexosFisicos: true }
        : null;
    };
  }
}
