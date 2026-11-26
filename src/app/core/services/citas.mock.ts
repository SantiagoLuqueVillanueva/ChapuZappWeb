import { CitaAgenda, ProfesionalDeCita } from '../../shared/models/cita.model';
import { Horario } from '../../shared/models/horario.model';
import { Servicio } from '../../shared/models/servicio.model';
import { lunesDe, sumarDias } from '../../features/agenda/fechas';

const HOY = new Date();
const LUNES = lunesDe(HOY);

function aIso(dia: Date, hora: string): string {
  const [horas, minutos] = hora.split(':').map(Number);
  const resultado = new Date(dia);
  resultado.setHours(horas, minutos, 0, 0);
  return resultado.toISOString();
}

// Fecha y hora contando desde el lunes de esta semana (para la agenda).
function enSemana(dia: number, hora: string): string {
  return aIso(sumarDias(LUNES, dia), hora);
}

// Fecha y hora contando desde hoy (para que Próximas y Pasadas no caduquen).
function enDias(dias: number, hora: string): string {
  return aIso(sumarDias(HOY, dias), hora);
}

export interface ProfesionalMock extends ProfesionalDeCita {
  usuarioId: number;
}

export interface ServicioMock extends Servicio {
  profesionalId: number;
}

export const PROFESIONALES_MOCK: ProfesionalMock[] = [
  { idProfesional: 1, usuarioId: 2, nombre: 'Javier Moreno', direccion: 'C/ Larios 10, Málaga' },
  { idProfesional: 2, usuarioId: 12, nombre: 'Laura Ramos', direccion: 'C/ Granada 8, Málaga' },
  { idProfesional: 3, usuarioId: 13, nombre: 'Marta Soler', direccion: 'C/ Victoria 12, Málaga' },
  {
    idProfesional: 4,
    usuarioId: 14,
    nombre: 'Carlos Ruiz',
    direccion: 'Av. de Andalucía 21, Málaga',
  },
];

export const SERVICIOS_MOCK: ServicioMock[] = [
  { idServicio: 1, profesionalId: 1, nombre: 'Reparación de fuga', precio: 55 },
  { idServicio: 2, profesionalId: 1, nombre: 'Desatasco de lavabo', precio: 60 },
  { idServicio: 3, profesionalId: 1, nombre: 'Revisión de termo', precio: 50 },
  { idServicio: 4, profesionalId: 1, nombre: 'Instalación de termo', precio: 90 },
  { idServicio: 5, profesionalId: 1, nombre: 'Cambio de grifo', precio: 45 },
  { idServicio: 6, profesionalId: 2, nombre: 'Revisión eléctrica', precio: 40 },
  { idServicio: 7, profesionalId: 2, nombre: 'Instalación de enchufes', precio: 35 },
  { idServicio: 8, profesionalId: 3, nombre: 'Pintura de habitación', precio: 150 },
  { idServicio: 9, profesionalId: 3, nombre: 'Pintura de fachada', precio: 300 },
  { idServicio: 10, profesionalId: 4, nombre: 'Apertura de puerta', precio: 70 },
  { idServicio: 11, profesionalId: 4, nombre: 'Cambio de cerradura', precio: 90 },
];

export const CITAS_MOCK: CitaAgenda[] = [
  {
    idCita: 1,
    clienteId: 9,
    profesionalId: 1,
    servicioId: 1,
    inicio: enSemana(0, '09:00'),
    fin: enSemana(0, '10:30'),
    estado: 'PROGRAMADA',
    creadoEn: enSemana(-3, '10:00'),
    clienteNombre: 'Luis P.',
    servicioNombre: 'Reparación de fuga',
    direccion: 'C/ Larios 4, Málaga',
    nota: null,
  },
  {
    idCita: 2,
    clienteId: 3,
    profesionalId: 1,
    servicioId: 2,
    inicio: enSemana(1, '10:00'),
    fin: enSemana(1, '11:00'),
    estado: 'PROGRAMADA',
    creadoEn: enSemana(-2, '18:00'),
    clienteNombre: 'Carmen V.',
    servicioNombre: 'Desatasco',
    direccion: 'Av. de Andalucía 21, Málaga',
    nota: null,
  },
  {
    idCita: 3,
    clienteId: 4,
    profesionalId: 1,
    servicioId: 3,
    inicio: enSemana(1, '12:00'),
    fin: enSemana(1, '13:00'),
    estado: 'PENDIENTE',
    creadoEn: enSemana(-1, '09:30'),
    clienteNombre: 'Jorge M.',
    servicioNombre: 'Revisión de termo',
    direccion: 'C/ Victoria 12, Málaga',
    nota: 'Hace un ruido raro al calentar el agua.',
  },
  {
    idCita: 4,
    clienteId: 5,
    profesionalId: 1,
    servicioId: 4,
    inicio: enSemana(2, '08:30'),
    fin: enSemana(2, '10:00'),
    estado: 'PROGRAMADA',
    creadoEn: enSemana(-4, '12:00'),
    clienteNombre: 'Pedro S.',
    servicioNombre: 'Instalación de termo',
    direccion: 'C/ Cuarteles 30, Málaga',
    nota: null,
  },
  {
    idCita: 5,
    clienteId: 6,
    profesionalId: 1,
    servicioId: 1,
    inicio: enSemana(3, '11:00'),
    fin: enSemana(3, '12:00'),
    estado: 'PENDIENTE',
    creadoEn: enSemana(-1, '20:15'),
    clienteNombre: 'Sara T.',
    servicioNombre: 'Reparación de fuga',
    direccion: 'Paseo de Reding 7, Málaga',
    nota: 'Gotea la tubería debajo del fregadero.',
  },
  {
    idCita: 6,
    clienteId: 1,
    profesionalId: 1,
    servicioId: 5,
    inicio: enSemana(3, '17:00'),
    fin: enSemana(3, '18:00'),
    estado: 'PROGRAMADA',
    creadoEn: enSemana(-5, '11:00'),
    clienteNombre: 'Ana García',
    servicioNombre: 'Cambio de grifo',
    direccion: 'C/ Campanillas 3, Málaga',
    nota: null,
  },
  {
    idCita: 7,
    clienteId: 7,
    profesionalId: 1,
    servicioId: 2,
    inicio: enSemana(4, '13:00'),
    fin: enSemana(4, '14:00'),
    estado: 'CANCELADA',
    creadoEn: enSemana(-2, '08:00'),
    clienteNombre: 'Marta L.',
    servicioNombre: 'Desatasco',
    direccion: 'C/ Granada 45, Málaga',
    nota: null,
  },
  {
    idCita: 8,
    clienteId: 8,
    profesionalId: 1,
    servicioId: 5,
    inicio: enSemana(8, '18:00'),
    fin: enSemana(8, '19:00'),
    estado: 'PROGRAMADA',
    creadoEn: enSemana(-1, '16:00'),
    clienteNombre: 'Lucía R.',
    servicioNombre: 'Cambio de grifo',
    direccion: 'C/ Mármoles 18, Málaga',
    nota: null,
  },
  {
    idCita: 9,
    clienteId: 1,
    profesionalId: 2,
    servicioId: 6,
    inicio: enDias(5, '16:00'),
    fin: enDias(5, '17:00'),
    estado: 'PENDIENTE',
    creadoEn: enDias(-1, '19:00'),
    clienteNombre: 'Ana García',
    servicioNombre: 'Revisión eléctrica',
    direccion: 'C/ Campanillas 3, Málaga',
    nota: 'Salta el diferencial al usar el horno.',
  },
  {
    idCita: 10,
    clienteId: 1,
    profesionalId: 3,
    servicioId: 8,
    inicio: enDias(-12, '09:00'),
    fin: enDias(-12, '10:00'),
    estado: 'PROGRAMADA',
    creadoEn: enDias(-20, '11:00'),
    clienteNombre: 'Ana García',
    servicioNombre: 'Pintura de habitación',
    direccion: 'C/ Campanillas 3, Málaga',
    nota: null,
  },
  {
    idCita: 11,
    clienteId: 1,
    profesionalId: 4,
    servicioId: 10,
    inicio: enDias(-5, '12:00'),
    fin: enDias(-5, '13:00'),
    estado: 'CANCELADA',
    creadoEn: enDias(-8, '10:00'),
    clienteNombre: 'Ana García',
    servicioNombre: 'Apertura de puerta',
    direccion: 'C/ Campanillas 3, Málaga',
    nota: null,
  },
  {
    idCita: 12,
    clienteId: 1,
    profesionalId: 1,
    servicioId: 3,
    inicio: enDias(2, '11:00'),
    fin: enDias(2, '12:00'),
    estado: 'PROGRAMADA',
    creadoEn: enDias(-3, '13:00'),
    clienteNombre: 'Ana García',
    servicioNombre: 'Revisión de termo',
    direccion: 'C/ Campanillas 3, Málaga',
    nota: null,
  },
];

export const HORARIO_MOCK: Horario[] = [
  { idHorario: 1, profesionalId: 1, diaSemana: 1, horaInicio: '08:00', horaFin: '20:00' },
  { idHorario: 2, profesionalId: 1, diaSemana: 2, horaInicio: '08:00', horaFin: '20:00' },
  { idHorario: 3, profesionalId: 1, diaSemana: 3, horaInicio: '08:00', horaFin: '20:00' },
  { idHorario: 4, profesionalId: 1, diaSemana: 4, horaInicio: '08:00', horaFin: '20:00' },
  { idHorario: 5, profesionalId: 1, diaSemana: 5, horaInicio: '08:00', horaFin: '20:00' },
  { idHorario: 6, profesionalId: 1, diaSemana: 6, horaInicio: '09:00', horaFin: '14:00' },
];
