import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestToRegisteredPageComponent } from './suggest-to-registered-page.component';

describe('SuggestToRegisteredPageComponent', () => {
  let component: SuggestToRegisteredPageComponent;
  let fixture: ComponentFixture<SuggestToRegisteredPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestToRegisteredPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestToRegisteredPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
