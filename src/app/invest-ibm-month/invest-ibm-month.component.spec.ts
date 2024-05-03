import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestIbmMonthComponent } from './invest-ibm-month.component';

describe('InvestIbmMonthComponent', () => {
  let component: InvestIbmMonthComponent;
  let fixture: ComponentFixture<InvestIbmMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvestIbmMonthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvestIbmMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
