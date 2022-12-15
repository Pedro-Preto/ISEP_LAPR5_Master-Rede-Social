import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroductionRequestsComponent } from './introduction-requests.component';

describe('IntroductionRequestsComponent', () => {
  let component: IntroductionRequestsComponent;
  let fixture: ComponentFixture<IntroductionRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntroductionRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroductionRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
