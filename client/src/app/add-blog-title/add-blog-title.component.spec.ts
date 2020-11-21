import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBlogTitleComponent } from './add-blog-title.component';

describe('AddBlogTitleComponent', () => {
  let component: AddBlogTitleComponent;
  let fixture: ComponentFixture<AddBlogTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBlogTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBlogTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
