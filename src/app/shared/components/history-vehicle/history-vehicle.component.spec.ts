import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryVehicleComponent } from './history-vehicle.component';

describe('HistoryVehicleComponent', () => {
  let component: HistoryVehicleComponent;
  let fixture: ComponentFixture<HistoryVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryVehicleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
