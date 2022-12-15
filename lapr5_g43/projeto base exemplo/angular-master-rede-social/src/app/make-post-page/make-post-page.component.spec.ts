import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakePostPageComponent } from './make-post-page.component';

describe('MakePostPageComponent', () => {
  let component: MakePostPageComponent;
  let fixture: ComponentFixture<MakePostPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakePostPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakePostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
