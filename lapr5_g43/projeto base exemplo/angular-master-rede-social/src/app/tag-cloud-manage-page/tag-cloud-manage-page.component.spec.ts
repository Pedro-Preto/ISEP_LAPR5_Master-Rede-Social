import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagCloudManagePageComponent } from './tag-cloud-manage-page.component';

describe('TagCloudManagePageComponent', () => {
  let component: TagCloudManagePageComponent;
  let fixture: ComponentFixture<TagCloudManagePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagCloudManagePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagCloudManagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
