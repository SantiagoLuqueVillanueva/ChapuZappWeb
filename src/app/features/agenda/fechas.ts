export function lunesDe(fecha: Date): Date {
  const lunes = new Date(fecha);
  const diasDesdeLunes = (lunes.getDay() + 6) % 7;
  lunes.setDate(lunes.getDate() - diasDesdeLunes);
  lunes.setHours(0, 0, 0, 0);
  return lunes;
}

export function sumarDias(fecha: Date, dias: number): Date {
  const resultado = new Date(fecha);
  resultado.setDate(resultado.getDate() + dias);
  return resultado;
}

export function mismoDia(a: Date, b: Date): boolean {
  return a.toDateString() === b.toDateString();
}
