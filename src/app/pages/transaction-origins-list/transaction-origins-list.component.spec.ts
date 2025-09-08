import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionOriginsListComponent } from './transaction-origins-list.component';

describe('TransactionOriginsListComponent', () => {
  let component: TransactionOriginsListComponent;
  let fixture: ComponentFixture<TransactionOriginsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionOriginsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionOriginsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
