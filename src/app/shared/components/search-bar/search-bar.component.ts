import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface SearchFilters {
  query: string;
  location: string;
}

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
})
export class SearchBarComponent {
  @Input() placeholderQuery = '¿Qué necesitas arreglar?';
  @Input() placeholderLocation = 'Código postal o ciudad';
  @Input() buttonText = 'Buscar';

  @Output() searchSubmitted = new EventEmitter<SearchFilters>();

  onSubmit(query: string, location: string): void {
    this.searchSubmitted.emit({
      query: query.trim(),
      location: location.trim(),
    });
  }
}
