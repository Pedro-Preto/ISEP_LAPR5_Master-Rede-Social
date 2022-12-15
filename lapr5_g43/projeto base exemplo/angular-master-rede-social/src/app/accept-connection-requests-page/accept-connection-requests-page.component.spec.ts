import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptConnectionRequestsPageComponent } from './accept-connection-requests-page.component';

describe('AcceptConnectionRequestsPageComponent', () => {
  let component: AcceptConnectionRequestsPageComponent;
  let fixture: ComponentFixture<AcceptConnectionRequestsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptConnectionRequestsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptConnectionRequestsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
