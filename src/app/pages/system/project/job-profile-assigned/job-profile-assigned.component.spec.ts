import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobProfileAssignedComponent } from './job-profile-assigned.component';

describe('JobProfileAssignedComponent', () => {
  let component: JobProfileAssignedComponent;
  let fixture: ComponentFixture<JobProfileAssignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobProfileAssignedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobProfileAssignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
