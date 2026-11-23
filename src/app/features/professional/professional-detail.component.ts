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
  id = input<string>('');

  readonly activeTab = signal<'precios' | 'resenas' | 'sobre-mi'>('precios');
  readonly selectedService = signal<ServiceItem | null>(null);
  readonly isLoading = signal<boolean>(false);
  readonly simulateError = signal<boolean>(false);
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
