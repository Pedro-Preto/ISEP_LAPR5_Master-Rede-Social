import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayUserPendingConnectionsPageComponent } from './display-user-pending-connections-page.component';

describe('DisplayUserPendingConnectionsPageComponent', () => {
  let component: DisplayUserPendingConnectionsPageComponent;
  let fixture: ComponentFixture<DisplayUserPendingConnectionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayUserPendingConnectionsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayUserPendingConnectionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
