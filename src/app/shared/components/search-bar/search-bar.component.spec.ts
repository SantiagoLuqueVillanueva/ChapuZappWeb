import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit searchSubmitted event with query and location on submit', () => {
    spyOn(component.searchSubmitted, 'emit');

    component.query = 'Fontanero';
    component.location = 'Madrid';
    component.onSubmit();

    expect(component.searchSubmitted.emit).toHaveBeenCalledWith({
      query: 'Fontanero',
      location: 'Madrid',
    });
  });

  it('should trim inputs when emitting search', () => {
    spyOn(component.searchSubmitted, 'emit');

    component.query = '  Electricista  ';
    component.location = '  Barcelona  ';
    component.onSubmit();

    expect(component.searchSubmitted.emit).toHaveBeenCalledWith({
      query: 'Electricista',
      location: 'Barcelona',
    });
  });
});
