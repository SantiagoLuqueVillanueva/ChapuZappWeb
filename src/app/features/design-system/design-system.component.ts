import { Component } from '@angular/core';

interface ColorSample {
  name: string;
  figma: string;
  hex: string;
  classes: string;
}

interface TextSample {
  label: string;
  classes: string;
}

interface RadiusSample {
  name: string;
  figma: string;
  classes: string;
}

@Component({
  selector: 'app-design-system',
  imports: [],
  templateUrl: './design-system.component.html',
})
export class DesignSystemComponent {
  // Las clases se escriben completas para que Tailwind las detecte
  readonly colors: ColorSample[] = [
    { name: 'background', figma: 'bg', hex: '#F0FFF9', classes: 'bg-background' },
    { name: 'surface', figma: 'sheet', hex: '#F8FFFC', classes: 'bg-surface' },
    { name: 'card', figma: 'card', hex: '#E6FBF2', classes: 'bg-card' },
    { name: 'primary', figma: 'mint', hex: '#A7F0D9', classes: 'bg-primary' },
    { name: 'primary-soft', figma: 'mintSoft', hex: '#DDF7EE', classes: 'bg-primary-soft' },
    { name: 'primary-line', figma: 'mintLine', hex: '#7FD6B8', classes: 'bg-primary-line' },
    { name: 'accent', figma: 'teal', hex: '#4DA8A0', classes: 'bg-accent' },
    { name: 'ink', figma: 'dark', hex: '#2A4A47', classes: 'bg-ink' },
    { name: 'muted', figma: 'muted', hex: '#6B7F7B', classes: 'bg-muted' },
    { name: 'line', figma: 'border', hex: '#D5EBE3', classes: 'bg-line' },
    { name: 'busy', figma: 'busy', hex: '#E8EBEA', classes: 'bg-busy' },
    { name: 'busy-text', figma: 'busyText', hex: '#8A9693', classes: 'bg-busy-text' },
    { name: 'map', figma: 'map', hex: '#E6F3EC', classes: 'bg-map' },
    { name: 'map-block', figma: 'mapBlock', hex: '#DAE8E1', classes: 'bg-map-block' },
    { name: 'map-green', figma: 'mapGreen', hex: '#C3EADB', classes: 'bg-map-green' },
    { name: 'grabber', figma: 'grabber', hex: '#CFE5DC', classes: 'bg-grabber' },
  ];

  readonly texts: TextSample[] = [
    { label: 'Display · Plus Jakarta Sans SemiBold 28/34', classes: 'font-display text-display font-semibold' },
    { label: 'Marca · Plus Jakarta Sans Medium 28/34', classes: 'font-display text-display font-medium' },
    { label: 'H1 · Plus Jakarta Sans SemiBold 24/30', classes: 'font-display text-h1 font-semibold' },
    { label: 'H2 · Plus Jakarta Sans SemiBold 20/26', classes: 'font-display text-h2 font-semibold' },
    { label: 'H3 · Plus Jakarta Sans SemiBold 16/22', classes: 'font-display text-h3 font-semibold' },
    { label: 'Título tarjeta y botón · Plus Jakarta Sans SemiBold 15/20', classes: 'font-display text-card-title font-semibold' },
    { label: 'Cuerpo · Inter Regular 14/20', classes: 'text-body' },
    { label: 'Cuerpo medio · Inter Medium 14/20', classes: 'text-body font-medium' },
    { label: 'Chip · Inter Medium 13/18', classes: 'text-chip font-medium' },
    { label: 'Pie · Inter Regular 12/16', classes: 'text-caption' },
    { label: 'Pie medio · Inter Medium 12/16', classes: 'text-caption font-medium' },
    { label: 'Mínimo · Inter Regular 11/14', classes: 'text-tiny' },
  ];

  readonly radii: RadiusSample[] = [
    { name: 'sm · 12', figma: 'radio/sm', classes: 'rounded-sm' },
    { name: 'md · 16', figma: 'radio/md', classes: 'rounded-md' },
    { name: 'lg · 20', figma: 'radio/lg', classes: 'rounded-lg' },
    { name: 'xl · 24', figma: 'radio/xl', classes: 'rounded-xl' },
    { name: '2xl · 28', figma: 'radio/xxl', classes: 'rounded-2xl' },
    { name: 'full · 999', figma: 'radio/full', classes: 'rounded-full' },
  ];
}
