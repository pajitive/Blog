import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerHOmeComponent } from './banner-home.component';

describe('BannerHOmeComponent', () => {
  let component: BannerHOmeComponent;
  let fixture: ComponentFixture<BannerHOmeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerHOmeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerHOmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
