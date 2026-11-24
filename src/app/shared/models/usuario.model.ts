export type Rol = 'CLIENTE' | 'PROFESIONAL';

export interface Usuario {
  idUsuario: number;
  nombre: string;
  email: string;
  rol: Rol;
  telefono: string | null;
  ciudad: string | null;
  foto: string | null;
  creadoEn: string;
  actualizadoEn: string;
}
