import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IbmTableMComponent } from './ibm-table-m.component';

describe('IbmTableMComponent', () => {
  let component: IbmTableMComponent;
  let fixture: ComponentFixture<IbmTableMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IbmTableMComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IbmTableMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
