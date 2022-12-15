import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsPostsPageComponent } from './friends-posts-page.component';

describe('FriendsPostsPageComponent', () => {
  let component: FriendsPostsPageComponent;
  let fixture: ComponentFixture<FriendsPostsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsPostsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsPostsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
