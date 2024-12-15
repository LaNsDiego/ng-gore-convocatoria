import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicTrainingCreateComponent } from './academic-training-create.component';

describe('WorkExperienceCreateComponent', () => {
  let component: AcademicTrainingCreateComponent;
  let fixture: ComponentFixture<AcademicTrainingCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcademicTrainingCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicTrainingCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
