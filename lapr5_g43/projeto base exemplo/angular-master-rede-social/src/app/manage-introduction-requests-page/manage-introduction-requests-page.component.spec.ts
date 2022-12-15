import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageIntroductionRequestComponent } from './manage-introduction-requests-page.component';

describe('ManageIntroductionRequestComponent', () => {
  let component: ManageIntroductionRequestComponent;
  let fixture: ComponentFixture<ManageIntroductionRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageIntroductionRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageIntroductionRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
