import { Component, input } from '@angular/core';

@Component({
  selector: 'app-category-card',
  imports: [],
  templateUrl: './category-card.component.html',
})
export class CategoryCardComponent {
  name = input('');
  subtitle = input('');
  icon = input('');
}
