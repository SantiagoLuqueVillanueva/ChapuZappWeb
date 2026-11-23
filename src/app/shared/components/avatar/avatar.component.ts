import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  imports: [],
  templateUrl: './avatar.component.html',
})
export class AvatarComponent {
  nombre = input.required<string>();
  foto = input<string>();
  size = input<'sm' | 'lg'>('sm');

  iniciales = computed(() =>
    this.nombre()
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((palabra) => palabra.charAt(0).toUpperCase())
      .join(''),
  );

  sizeClasses = {
    sm: 'h-10 w-10 text-caption',
    lg: 'h-24 w-24 text-display',
  };
}
