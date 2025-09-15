import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/services/form.service';
import { Form } from 'src/app/models/form';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css']
})
export class FormListComponent implements OnInit {

  forms: Form[] = [];

  constructor(
    private formService: FormService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.loadForms();
  }

  loadForms(): void {
    this.formService.getForms().subscribe(
      (data: Form[]) => {
        this.forms = data;
      },
      (err) => {
        console.error('Error al cargar los formularios', err);
        this.alertService.showError(err?.error);
      }
    );
  }

  deleteForm(id: number): void {
    this.formService.deleteForm(id).subscribe(
      () => {
        this.forms = this.forms.filter(form => form.id !== id);
        this.alertService.showSuccess();
      },
      (err) => {
        console.error('Error al eliminar el formulario', err);
        this.alertService.showError(err?.error);
      }
    );
  }
}
