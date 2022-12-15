import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchUsersFriendsPageComponent } from './search-users-friends-page.component';

describe('SearchUsersFriendsPageComponent', () => {
  let component: SearchUsersFriendsPageComponent;
  let fixture: ComponentFixture<SearchUsersFriendsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchUsersFriendsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchUsersFriendsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
