import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { FormFieldComponent } from '../../shared/components/form-field/form-field.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, ButtonComponent, FormFieldComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  returnUrl = input<string>();

  cargando = signal(false);
  errorLogin = signal<string | null>(null);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  error(campo: 'email' | 'password'): string | null {
    const control = this.form.controls[campo];
    if (!control.touched || control.valid) return null;
    if (control.hasError('required')) return 'Este campo es obligatorio';
    if (control.hasError('email')) return 'Introduce un correo válido';
    return null;
  }

  entrar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.cargando.set(true);
    this.errorLogin.set(null);

    this.auth.login(this.form.getRawValue()).subscribe({
      next: () => {
        this.cargando.set(false);
        this.router.navigateByUrl(this.returnUrl() ?? '/');
      },
      error: (err: Error) => {
        this.cargando.set(false);
        this.errorLogin.set(err.message);
      },
    });
  }
}
