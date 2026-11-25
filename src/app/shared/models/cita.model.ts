export type EstadoCita = 'PENDIENTE' | 'PROGRAMADA' | 'CANCELADA';

export interface Cita {
  idCita: number;
  clienteId: number;
  profesionalId: number;
  servicioId: number;
  inicio: string;
  fin: string;
  estado: EstadoCita;
  creadoEn: string;
}

export interface CitaAgenda extends Cita {
  clienteNombre: string;
  servicioNombre: string;
  direccion: string;
  nota: string | null;
}
