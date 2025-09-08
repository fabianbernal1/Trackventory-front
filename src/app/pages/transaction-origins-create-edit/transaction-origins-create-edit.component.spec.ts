import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionOriginsCreateEditComponent } from './transaction-origins-create-edit.component';

describe('TransactionOriginsCreateEditComponent', () => {
  let component: TransactionOriginsCreateEditComponent;
  let fixture: ComponentFixture<TransactionOriginsCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionOriginsCreateEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionOriginsCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
