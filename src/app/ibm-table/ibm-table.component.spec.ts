import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IbmTableComponent } from './ibm-table.component';

describe('IbmTableComponent', () => {
  let component: IbmTableComponent;
  let fixture: ComponentFixture<IbmTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IbmTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IbmTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
