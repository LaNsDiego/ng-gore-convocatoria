import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobTitleCreateComponent } from './job-profile-create.component';

describe('JobTitleCreateComponent', () => {
  let component: JobTitleCreateComponent;
  let fixture: ComponentFixture<JobTitleCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobTitleCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobTitleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
