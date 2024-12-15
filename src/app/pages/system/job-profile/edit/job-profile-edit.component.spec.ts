import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobProfileEditComponent } from './job-profile-edit.component';

describe('JobProfileEditComponent', () => {
  let component: JobProfileEditComponent;
  let fixture: ComponentFixture<JobProfileEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobProfileEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
