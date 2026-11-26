import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AvatarComponent } from '../avatar/avatar.component';
import { SearchProfessional } from '../../models/professional.model';

@Component({
  selector: 'app-professional-card',
  standalone: true,
  imports: [RouterLink, AvatarComponent],
  templateUrl: './professional-card.component.html',
})
export class ProfessionalCardComponent {
  professional = input.required<SearchProfessional>();
}
