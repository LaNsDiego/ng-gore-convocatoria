import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailRrhhComponent } from './project-detail-rrhh.component';

describe('ProjectDetailRrhhComponent', () => {
  let component: ProjectDetailRrhhComponent;
  let fixture: ComponentFixture<ProjectDetailRrhhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDetailRrhhComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectDetailRrhhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
