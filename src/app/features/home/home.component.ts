import { Component } from '@angular/core';
import {
  SearchBarComponent,
  SearchFilters,
} from '../../shared/components/search-bar/search-bar.component';
import { CategoryCardComponent } from '../../shared/components/category-card/category-card.component';

interface CategoryItem {
  name: string;
  subtitle: string;
  icon: string;
}

interface StepItem {
  number: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchBarComponent, CategoryCardComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  readonly categories: CategoryItem[] = [
    { name: 'Fontanería', subtitle: '24 profesionales', icon: '/images/icono fontaneria.png' },
    { name: 'Electricidad', subtitle: '18 profesionales', icon: '/images/icono electricista.png' },
    { name: 'Pintura', subtitle: '15 profesionales', icon: '/images/icono pintura.png' },
    { name: 'Carpintería', subtitle: '11 profesionales', icon: '' },
    { name: 'Cerrajería', subtitle: '9 profesionales', icon: '/images/icono cerrajeria.png' },
    { name: 'Electrodomésticos', subtitle: '13 profesionales', icon: '' },
  ];

  readonly steps: StepItem[] = [
    {
      number: 1,
      title: 'Busca',
      description: 'Filtra por servicio, cercanía, precio y disponibilidad en tu barrio.',
    },
    {
      number: 2,
      title: 'Reserva',
      description: 'Elige día y hora en la agenda del profesional y confirma al momento.',
    },
    {
      number: 3,
      title: 'Chatea y valora',
      description: 'Habla por el chat de la cita y deja tu reseña al terminar.',
    },
  ];

  onSearch(filters: SearchFilters): void {
    console.log('Búsqueda lanzada en Home:', filters);
  }
}
