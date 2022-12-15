import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestUsersPageComponent } from './suggest-users-page.component';

describe('SuggestUsersPageComponent', () => {
  let component: SuggestUsersPageComponent;
  let fixture: ComponentFixture<SuggestUsersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestUsersPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestUsersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
