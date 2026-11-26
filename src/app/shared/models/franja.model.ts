export interface Franja {
  inicio: string;
  fin: string;
  // Diferencia con la API (H6): la API solo devuelve las franjas libres;
  // aquí también llegan las ocupadas para poder enseñarlas tachadas.
  ocupada: boolean;
}
