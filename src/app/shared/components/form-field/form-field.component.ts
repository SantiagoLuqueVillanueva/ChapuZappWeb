import { Component, input } from '@angular/core';

@Component({
  selector: 'app-form-field',
  imports: [],
  templateUrl: './form-field.component.html',
})
export class FormFieldComponent {
  label = input.required<string>();
  inputId = input.required<string>();
  error = input<string | null>(null);
}
