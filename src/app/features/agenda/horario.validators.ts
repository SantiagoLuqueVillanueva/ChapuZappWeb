import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const finDespuesDeInicio: ValidatorFn = (
  grupo: AbstractControl,
): ValidationErrors | null => {
  const activo = grupo.get('activo')?.value;
  const inicio = grupo.get('horaInicio')?.value;
  const fin = grupo.get('horaFin')?.value;

  if (!activo || !inicio || !fin) {
    return null;
  }

  return fin > inicio ? null : { finAntesDeInicio: true };
};
