import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductClientListComponent } from './product-client-list.component';

describe('ProductClientListComponent', () => {
  let component: ProductClientListComponent;
  let fixture: ComponentFixture<ProductClientListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductClientListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductClientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
