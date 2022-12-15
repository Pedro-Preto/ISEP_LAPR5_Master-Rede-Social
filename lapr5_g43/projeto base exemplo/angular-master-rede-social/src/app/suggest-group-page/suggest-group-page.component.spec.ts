import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestGroupPageComponent } from './suggest-group-page.component';

describe('SuggestGroupPageComponent', () => {
  let component: SuggestGroupPageComponent;
  let fixture: ComponentFixture<SuggestGroupPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestGroupPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestGroupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
