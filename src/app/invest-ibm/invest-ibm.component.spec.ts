import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestIbmComponent } from './invest-ibm.component';

describe('InvestIbmComponent', () => {
  let component: InvestIbmComponent;
  let fixture: ComponentFixture<InvestIbmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvestIbmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvestIbmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
