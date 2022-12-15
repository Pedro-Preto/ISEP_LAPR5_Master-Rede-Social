import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConnectionPageComponent } from './edit-connection-page.component';

describe('EditConnectionPageComponent', () => {
  let component: EditConnectionPageComponent;
  let fixture: ComponentFixture<EditConnectionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditConnectionPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditConnectionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
