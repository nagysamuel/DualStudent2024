import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesShareComponent } from './sales-share.component';

describe('SalesShareComponent', () => {
  let component: SalesShareComponent;
  let fixture: ComponentFixture<SalesShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalesShareComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
