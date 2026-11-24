export type AppointmentStatus = 'pendiente' | 'confirmada' | 'completada' | 'cancelada';

export interface Appointment {
  id: number;
  professionalName: string;
  service: string;
  date: string;
  time: string;
  status: AppointmentStatus;
}
