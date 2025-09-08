import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/services/form.service';
import { Form } from 'src/app/models/form';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuTree: any[] = []; // Árbol de menús

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.loadForms();
  }

  private loadForms(): void {
    this.formService.getForms().subscribe({
      next: (data: Form[]) => {
        // 🔹 Filtrar solo visibles
        const visibleForms = data.filter(f => f.visible);

        // 🔹 Construir jerarquía
        this.menuTree = this.buildTree(visibleForms);
      },
      error: (err) => {
        console.error('Error cargando los formularios', err);
      }
    });
  }

  private buildTree(forms: Form[]): any[] {
    const formMap = new Map<number, any>();

    // Inicializar nodos
    forms.forEach(f => {
      formMap.set(f.id, { ...f, children: [] });
    });

    const tree: any[] = [];

    // Asignar hijos a padres
    formMap.forEach(form => {
      if (form.parent && formMap.has(form.parent.id)) {
        formMap.get(form.parent.id).children.push(form);
      } else {
        tree.push(form); // Si no tiene padre → raíz
      }
    });

    return tree;
  }
}
