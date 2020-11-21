import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCatComponent } from './sub-cat.component';

describe('SubCatComponent', () => {
  let component: SubCatComponent;
  let fixture: ComponentFixture<SubCatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubCatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
