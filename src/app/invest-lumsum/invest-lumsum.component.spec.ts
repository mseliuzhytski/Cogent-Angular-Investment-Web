import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestLumsumComponent } from './invest-lumsum.component';

describe('InvestLumsumComponent', () => {
  let component: InvestLumsumComponent;
  let fixture: ComponentFixture<InvestLumsumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvestLumsumComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvestLumsumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
