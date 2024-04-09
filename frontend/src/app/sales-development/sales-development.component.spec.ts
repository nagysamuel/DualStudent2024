import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesDevelopmentComponent } from './sales-development.component';

describe('SalesDevelopmentComponent', () => {
  let component: SalesDevelopmentComponent;
  let fixture: ComponentFixture<SalesDevelopmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalesDevelopmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesDevelopmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
