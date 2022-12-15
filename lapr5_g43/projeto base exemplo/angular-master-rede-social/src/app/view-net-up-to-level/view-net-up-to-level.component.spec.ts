import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNetUpToLevelComponent } from './view-net-up-to-level.component';

describe('ViewNetUpToLevelComponent', () => {
  let component: ViewNetUpToLevelComponent;
  let fixture: ComponentFixture<ViewNetUpToLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewNetUpToLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewNetUpToLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
