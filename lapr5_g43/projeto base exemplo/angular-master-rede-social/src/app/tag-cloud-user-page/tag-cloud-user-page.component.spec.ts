import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagCloudUserPageComponent } from './tag-cloud-user-page.component';

describe('TagCloudUserPageComponent', () => {
  let component: TagCloudUserPageComponent;
  let fixture: ComponentFixture<TagCloudUserPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagCloudUserPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagCloudUserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
