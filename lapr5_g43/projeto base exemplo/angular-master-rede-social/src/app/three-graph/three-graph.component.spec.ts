import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeGraphComponent } from './three-graph.component';

describe('ThreeGraphComponent', () => {
  let component: ThreeGraphComponent;
  let fixture: ComponentFixture<ThreeGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreeGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
