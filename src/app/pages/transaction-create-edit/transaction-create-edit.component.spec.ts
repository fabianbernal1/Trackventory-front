import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionCreateEditComponent } from './transaction-create-edit.component';

describe('TransactionCreateEditComponent', () => {
  let component: TransactionCreateEditComponent;
  let fixture: ComponentFixture<TransactionCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionCreateEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
