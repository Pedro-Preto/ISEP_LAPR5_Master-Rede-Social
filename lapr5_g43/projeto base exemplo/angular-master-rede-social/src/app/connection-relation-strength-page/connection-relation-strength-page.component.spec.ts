import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionRelationStrengthPageComponent } from './connection-relation-strength-page.component';

describe('ConnectionRelationStrengthPageComponent', () => {
  let component: ConnectionRelationStrengthPageComponent;
  let fixture: ComponentFixture<ConnectionRelationStrengthPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectionRelationStrengthPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionRelationStrengthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
