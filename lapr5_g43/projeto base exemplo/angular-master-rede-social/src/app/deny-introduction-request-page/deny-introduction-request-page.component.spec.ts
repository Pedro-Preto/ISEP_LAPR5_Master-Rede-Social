import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenyIntroductionRequestPageComponent } from './deny-introduction-request-page.component';

describe('DenyIntroductionRequestPageComponent', () => {
  let component: DenyIntroductionRequestPageComponent;
  let fixture: ComponentFixture<DenyIntroductionRequestPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DenyIntroductionRequestPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DenyIntroductionRequestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
