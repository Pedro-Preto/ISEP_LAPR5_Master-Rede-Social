import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagCloudAllUsersPageComponent } from './tag-cloud-all-users-page.component';

describe('TagCloudAllUsersPageComponent', () => {
  let component: TagCloudAllUsersPageComponent;
  let fixture: ComponentFixture<TagCloudAllUsersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagCloudAllUsersPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagCloudAllUsersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
