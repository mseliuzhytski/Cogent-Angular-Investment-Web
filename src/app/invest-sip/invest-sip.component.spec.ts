import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestSipComponent } from './invest-sip.component';

describe('InvestSipComponent', () => {
  let component: InvestSipComponent;
  let fixture: ComponentFixture<InvestSipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvestSipComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvestSipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
