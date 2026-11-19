import { Component, computed, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MOCK_PROFESSIONALS, Professional, ServiceItem } from './professional.mock';

@Component({
  selector: 'app-professional-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './professional-detail.component.html',
})
export class ProfessionalDetailComponent {
  // Parámetro :id en la URL (inyectado gracias a withComponentInputBinding)
  id = input<string>('');

  // Pestaña activa ('precios', 'resenas', 'sobre-mi')
  readonly activeTab = signal<'precios' | 'resenas' | 'sobre-mi'>('precios');

  // Servicio seleccionado en el formulario de reserva
  readonly selectedService = signal<ServiceItem | null>(null);

  // Estados visuales simulados (carga y error)
  readonly isLoading = signal<boolean>(false);
  readonly simulateError = signal<boolean>(false);

  // Fecha y hora seleccionadas en el widget de reserva
  readonly selectedDay = signal<number>(15);
  readonly selectedTime = signal<string>('17:00');

  readonly professional = computed<Professional | null>(() => {
    const profId = this.id();
    return MOCK_PROFESSIONALS[profId] ?? null;
  });

  selectService(service: ServiceItem): void {
    this.selectedService.set(service);
  }

  toggleSimulateError(): void {
    this.simulateError.update((v) => !v);
  }
}
