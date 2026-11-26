export interface Horario {
  idHorario: number;
  profesionalId: number;
  diaSemana: number;
  horaInicio: string;
  horaFin: string;
}

// Lo que se manda al guardar el horario: el resto (id y profesional) lo pone el servidor.
export type TramoHorario = Pick<Horario, 'diaSemana' | 'horaInicio' | 'horaFin'>;
