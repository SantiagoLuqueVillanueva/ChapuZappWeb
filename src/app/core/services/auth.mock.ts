import { Usuario } from '../../shared/models/usuario.model';

export interface CuentaMock {
  usuario: Usuario;
  password: string;
}

export const CUENTAS_MOCK: CuentaMock[] = [
  {
    password: 'Chapuzapp123',
    usuario: {
      idUsuario: 1,
      nombre: 'Ana García',
      email: 'cliente@chapuzapp.test',
      rol: 'CLIENTE',
      telefono: '+34 600 123 456',
      ciudad: 'Campanillas, Málaga',
      foto: null,
      creadoEn: '2026-11-04T13:00:00.000Z',
      actualizadoEn: '2026-11-04T13:00:00.000Z',
    },
  },
  {
    password: 'Chapuzapp123',
    usuario: {
      idUsuario: 2,
      nombre: 'Carlos Ruiz',
      email: 'profesional@chapuzapp.test',
      rol: 'PROFESIONAL',
      telefono: '+34 611 222 333',
      ciudad: 'Teatinos, Málaga',
      foto: null,
      creadoEn: '2026-11-04T13:00:00.000Z',
      actualizadoEn: '2026-11-04T13:00:00.000Z',
    },
  },
];
