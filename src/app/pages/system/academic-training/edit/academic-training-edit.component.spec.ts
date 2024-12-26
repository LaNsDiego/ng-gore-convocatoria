import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicTrainingEditComponent } from './academic-training-edit.component';

describe('AcademicTrainingEditComponent', () => {
  let component: AcademicTrainingEditComponent;
  let fixture: ComponentFixture<AcademicTrainingEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcademicTrainingEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicTrainingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
