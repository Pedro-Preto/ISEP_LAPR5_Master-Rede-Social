import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeIntroductionRequestPageComponent } from './make-introduction-request-page.component';

describe('MakeIntroductionRequestPageComponent', () => {
  let component: MakeIntroductionRequestPageComponent;
  let fixture: ComponentFixture<MakeIntroductionRequestPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeIntroductionRequestPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeIntroductionRequestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
