import { Servicio } from './servicio.model';
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

export type TipoCitas = 'proximas' | 'pasadas';

export interface ProfesionalDeCita {
  idProfesional: number;
  nombre: string;
  direccion: string;
}

// Forma que devuelve GET /api/citas/mias
export interface CitaCliente {
  idCita: number;
  inicio: string;
  fin: string;
  estado: EstadoCita;
  servicio: Servicio;
  profesional: ProfesionalDeCita;
}

// Cuerpo de POST /api/citas
export interface NuevaCita {
  profesionalId: number;
  servicioId: number;
  inicio: string;
  // Diferencia con la API (H6): la API todavía no recoge estos dos campos
  // y responde 400 si sobran.
  direccion: string;
  nota: string | null;
}
