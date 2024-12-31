import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodReqDetailComponent } from './period-req-detail.component';

describe('PeriodReqDetailComponent', () => {
  let component: PeriodReqDetailComponent;
  let fixture: ComponentFixture<PeriodReqDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeriodReqDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeriodReqDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
