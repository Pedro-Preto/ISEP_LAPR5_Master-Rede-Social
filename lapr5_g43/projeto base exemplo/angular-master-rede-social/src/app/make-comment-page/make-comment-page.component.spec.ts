import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeCommentPageComponent } from './make-comment-page.component';

describe('MakeCommentPageComponent', () => {
  let component: MakeCommentPageComponent;
  let fixture: ComponentFixture<MakeCommentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeCommentPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeCommentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
