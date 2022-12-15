import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeEmotionalStatePageComponent } from './change-emotional-state-page.component';

describe('ChangeEmotionalStatePageComponent', () => {
  let component: ChangeEmotionalStatePageComponent;
  let fixture: ComponentFixture<ChangeEmotionalStatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeEmotionalStatePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeEmotionalStatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
