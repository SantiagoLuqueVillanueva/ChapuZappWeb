import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function contrasenasIguales(campo: string, campoRepetir: string): ValidatorFn {
  return (grupo: AbstractControl): ValidationErrors | null => {
    const password = grupo.get(campo)?.value;
    const repetir = grupo.get(campoRepetir)?.value;
    if (!repetir) return null;
    return password === repetir ? null : { contrasenasDistintas: true };
  };
}
