import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSideNavbarComponent } from './app-side-navbar.component';

describe('AppSideNavbarComponent', () => {
  let component: AppSideNavbarComponent;
  let fixture: ComponentFixture<AppSideNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSideNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppSideNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
