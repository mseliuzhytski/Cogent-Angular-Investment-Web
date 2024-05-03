import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IbmDirComponent } from './ibm-dir.component';

describe('IbmDirComponent', () => {
  let component: IbmDirComponent;
  let fixture: ComponentFixture<IbmDirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IbmDirComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IbmDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
