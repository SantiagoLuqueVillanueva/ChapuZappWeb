import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { Rol } from '../../shared/models/usuario.model';
import { RegisterRequest } from '../../shared/models/auth.model';
import { contrasenasIguales } from '../../shared/validators/contrasenas-iguales.validator';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { FormFieldComponent } from '../../shared/components/form-field/form-field.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, ButtonComponent, FormFieldComponent],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  cargando = signal(false);
  errorRegistro = signal<string | null>(null);

  form = this.fb.nonNullable.group(
    {
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repetirPassword: ['', Validators.required],
      rol: ['CLIENTE' as Rol, Validators.required],
    },
    { validators: contrasenasIguales('password', 'repetirPassword') },
  );

  error(campo: 'nombre' | 'email' | 'password' | 'repetirPassword'): string | null {
    const control = this.form.controls[campo];
    if (!control.touched) return null;
    if (control.hasError('required')) return 'Este campo es obligatorio';
    if (control.hasError('minlength')) {
      return campo === 'password'
        ? 'La contraseña debe tener al menos 8 caracteres'
        : 'Escribe al menos 2 letras';
    }
    if (control.hasError('email')) return 'Introduce un correo válido';
    if (campo === 'repetirPassword' && this.form.hasError('contrasenasDistintas')) {
      return 'Las contraseñas no coinciden';
    }
    return null;
  }

  registrarse(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.cargando.set(true);
    this.errorRegistro.set(null);

    const { nombre, email, password, rol } = this.form.getRawValue();
    const datos: RegisterRequest = { nombre, email, password, rol };
    this.auth
      .registro(datos)
      .pipe(switchMap(() => this.auth.login({ email: datos.email, password: datos.password })))
      .subscribe({
        next: () => {
          this.cargando.set(false);
          this.router.navigate(['/']);
        },
        error: (err: Error) => {
          this.cargando.set(false);
          this.errorRegistro.set(err.message);
        },
      });
  }
}
