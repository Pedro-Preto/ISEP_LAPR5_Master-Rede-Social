import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagCloudUserConnectionsPageComponent } from './tag-cloud-user-connections-page.component';

describe('TagCloudUserConnectionsPageComponent', () => {
  let component: TagCloudUserConnectionsPageComponent;
  let fixture: ComponentFixture<TagCloudUserConnectionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagCloudUserConnectionsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagCloudUserConnectionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
