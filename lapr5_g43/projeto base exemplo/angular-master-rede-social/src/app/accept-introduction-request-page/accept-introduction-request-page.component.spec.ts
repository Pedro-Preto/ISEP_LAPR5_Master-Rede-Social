import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptIntroductionRequestPageComponent } from './accept-introduction-request-page.component';

describe('AcceptIntroductionRequestPageComponent', () => {
  let component: AcceptIntroductionRequestPageComponent;
  let fixture: ComponentFixture<AcceptIntroductionRequestPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptIntroductionRequestPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptIntroductionRequestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
