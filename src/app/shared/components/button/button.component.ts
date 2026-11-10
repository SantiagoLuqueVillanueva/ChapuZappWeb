import { Component, input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  variant = input<'primary' | 'secondary' | 'soft'>('primary');
  size = input<'md' | 'sm'>('md');

  variantClasses = {
    primary: 'bg-ink text-white rounded-lg font-display text-card-title font-semibold',
    secondary:
      'bg-white text-ink border border-line rounded-lg font-display text-card-title font-semibold',
    soft: 'bg-primary text-ink rounded-lg font-display text-card-title font-semibold',
  };

  sizeClasses = {
    md: 'px-6 py-3.5',
    sm: 'px-4 py-2.5',
  };
}
