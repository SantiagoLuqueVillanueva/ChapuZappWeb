import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../shared/models/usuario.model';
import { USUARIO_MOCK } from './usuario.mock';
import { AvatarComponent } from '../../shared/components/avatar/avatar.component';
import { FormFieldComponent } from '../../shared/components/form-field/form-field.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

const PATRON_TELEFONO = /^(\+34)?\s?[6-9](\s?\d){8}$/;

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, AvatarComponent, FormFieldComponent, ButtonComponent],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  usuario = signal<Usuario>(USUARIO_MOCK);
  guardado = signal(false);

  form = this.fb.nonNullable.group({
    nombre: [this.usuario().nombre, [Validators.required, Validators.minLength(2)]],
    email: [this.usuario().email, [Validators.required, Validators.email]],
    telefono: [
      this.usuario().telefono ?? '',
      [Validators.required, Validators.pattern(PATRON_TELEFONO)],
    ],
    ciudad: [this.usuario().ciudad ?? '', Validators.required],
  });

  error(campo: 'nombre' | 'email' | 'telefono' | 'ciudad'): string | null {
    const control = this.form.controls[campo];
    if (!control.touched || control.valid) return null;
    if (control.hasError('required')) return 'Este campo es obligatorio';
    if (control.hasError('minlength')) return 'Escribe al menos 2 letras';
    if (control.hasError('email')) return 'Introduce un correo válido';
    if (control.hasError('pattern')) return 'Introduce un teléfono español, p. ej. +34 600 123 456';
    return null;
  }

  guardar(): void {
    if (this.form.invalid || this.form.pristine) return;
    this.usuario.update((actual) => ({ ...actual, ...this.form.getRawValue() }));
    this.form.markAsPristine();
    this.guardado.set(true);
    setTimeout(() => this.guardado.set(false), 3000);
  }

  cancelar(): void {
    const u = this.usuario();
    this.form.reset({
      nombre: u.nombre,
      email: u.email,
      telefono: u.telefono ?? '',
      ciudad: u.ciudad ?? '',
    });
  }

  cerrarSesion(): void {
    this.router.navigate(['/']);
  }
}
