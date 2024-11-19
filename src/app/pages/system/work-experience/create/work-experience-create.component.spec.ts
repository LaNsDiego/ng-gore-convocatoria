import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkExperienceCreateComponent } from './work-experience-create.component';

describe('WorkExperienceCreateComponent', () => {
  let component: WorkExperienceCreateComponent;
  let fixture: ComponentFixture<WorkExperienceCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkExperienceCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkExperienceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
