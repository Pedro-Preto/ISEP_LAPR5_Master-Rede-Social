import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagCloudAllConnectionsPageComponent } from './tag-cloud-all-connections-page.component';

describe('TagCloudAllConnectionsPageComponent', () => {
  let component: TagCloudAllConnectionsPageComponent;
  let fixture: ComponentFixture<TagCloudAllConnectionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagCloudAllConnectionsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagCloudAllConnectionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
