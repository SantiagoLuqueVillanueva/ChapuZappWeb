import { Franja, Servicio } from '../../shared/models/booking.model';

export const SERVICIOS_MOCK: Servicio[] = [
  { idServicio: 1, nombre: 'Reparación de fugas', precio: 45 },
  { idServicio: 2, nombre: 'Desatasco de tuberías', precio: 60 },
  { idServicio: 3, nombre: 'Instalación de grifería', precio: 55 },
];

export const FRANJAS_MOCK: Franja[] = [
  { hora: '09:00', ocupada: false },
  { hora: '10:00', ocupada: true },
  { hora: '11:00', ocupada: false },
  { hora: '12:00', ocupada: false },
  { hora: '13:00', ocupada: true },
  { hora: '16:00', ocupada: false },
  { hora: '17:00', ocupada: false },
  { hora: '18:00', ocupada: true },
];
