import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenyConnectionRequestsPageComponent } from './deny-connection-requests-page.component';

describe('DenyConnectionRequestsPageComponent', () => {
  let component: DenyConnectionRequestsPageComponent;
  let fixture: ComponentFixture<DenyConnectionRequestsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DenyConnectionRequestsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DenyConnectionRequestsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
