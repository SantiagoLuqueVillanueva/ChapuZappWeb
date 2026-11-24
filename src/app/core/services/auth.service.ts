import { Injectable, computed, signal } from '@angular/core';
import { Observable, delay, of, tap, throwError } from 'rxjs';
import { LoginRequest, LoginResponse, RegisterRequest } from '../../shared/models/auth.model';
import { Usuario } from '../../shared/models/usuario.model';
import { CUENTAS_MOCK } from './auth.mock';

const CLAVE_TOKEN = 'chapuzapp_token';
const CLAVE_USUARIO = 'chapuzapp_usuario';
const RETARDO_MS = 400;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private cuentas = [...CUENTAS_MOCK];

  private usuarioActual = signal<Usuario | null>(this.leerUsuarioGuardado());

  usuario = this.usuarioActual.asReadonly();
  estaLogueado = computed(() => this.usuarioActual() !== null);

  login(datos: LoginRequest): Observable<LoginResponse> {
    const cuenta = this.cuentas.find(
      (c) => c.usuario.email === datos.email && c.password === datos.password,
    );
    if (!cuenta) {
      return throwError(() => new Error('Credenciales inválidas'));
    }
    const respuesta: LoginResponse = { token: 'token-simulado', usuario: cuenta.usuario };
    return of(respuesta).pipe(
      delay(RETARDO_MS),
      tap((r) => this.guardarSesion(r)),
    );
  }

  registro(datos: RegisterRequest): Observable<Usuario> {
    if (this.cuentas.some((c) => c.usuario.email === datos.email)) {
      return throwError(() => new Error('Email ya registrado'));
    }
    const ahora = new Date().toISOString();
    const nuevo: Usuario = {
      idUsuario: this.cuentas.length + 1,
      nombre: datos.nombre,
      email: datos.email,
      rol: datos.rol,
      telefono: null,
      ciudad: null,
      foto: null,
      creadoEn: ahora,
      actualizadoEn: ahora,
    };
    this.cuentas.push({ usuario: nuevo, password: datos.password });
    return of(nuevo).pipe(delay(RETARDO_MS));
  }

  actualizarPerfil(cambios: Partial<Usuario>): Observable<Usuario> {
    const actual = this.usuarioActual();
    if (!actual) {
      return throwError(() => new Error('No hay sesión iniciada'));
    }
    const actualizado: Usuario = { ...actual, ...cambios, actualizadoEn: new Date().toISOString() };
    return of(actualizado).pipe(
      delay(RETARDO_MS),
      tap((u) => {
        this.usuarioActual.set(u);
        localStorage.setItem(CLAVE_USUARIO, JSON.stringify(u));
      }),
    );
  }

  logout(): void {
    localStorage.removeItem(CLAVE_TOKEN);
    localStorage.removeItem(CLAVE_USUARIO);
    this.usuarioActual.set(null);
  }

  getToken(): string | null {
    return localStorage.getItem(CLAVE_TOKEN);
  }

  private guardarSesion(respuesta: LoginResponse): void {
    localStorage.setItem(CLAVE_TOKEN, respuesta.token);
    localStorage.setItem(CLAVE_USUARIO, JSON.stringify(respuesta.usuario));
    this.usuarioActual.set(respuesta.usuario);
  }

  private leerUsuarioGuardado(): Usuario | null {
    const guardado = localStorage.getItem(CLAVE_USUARIO);
    return guardado ? (JSON.parse(guardado) as Usuario) : null;
  }
}
