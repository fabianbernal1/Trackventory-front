import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/services/form.service';
import { PermissionService } from 'src/app/services/permission.service';
import { Form } from 'src/app/models/form';
import { Permission } from 'src/app/models/permission';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuTree: any[] = [];
  profileId!: number;

  constructor(
    private formService: FormService,
    private permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
    this.loadFormsWithPermissions();
  }

  private loadUserProfile(): void {
    const userLS = localStorage.getItem('user');
    if (userLS) {
      const user = JSON.parse(userLS);
      this.profileId = user.profile.id;
    }
  }

  private loadFormsWithPermissions(): void {
    this.formService.getForms().subscribe({
      next: (forms: Form[]) => {
        const visibleForms = forms.filter(f => f.visible);

        this.permissionService.getPermissionsByProfile(this.profileId).subscribe({
          next: (permissions: Permission[]) => {

            // Filtrar tomando en cuenta permisos
            let allowedForms = visibleForms.filter(form => {
              const permission = permissions.find(p => p.form_pms.id === form.id);

              if (!permission || !permission.R) return false; // No puede leer → ocultar

              // 🔹 Validación especial para USERS
              if (form.url === '/users') {
                return permission.C && permission.R;
              }

              return true;
            });

            this.menuTree = this.buildTree(allowedForms);
          },
          error: err => console.error("Error cargando permisos", err)
        });
      },
      error: err => console.error("Error cargando formularios", err)
    });
  }

  private buildTree(forms: Form[]): any[] {
    const formMap = new Map<number, any>();
    forms.forEach(f => formMap.set(f.id, { ...f, children: [] }));

    const tree: any[] = [];

    formMap.forEach(form => {
      if (form.parent && formMap.has(form.parent.id)) {
        formMap.get(form.parent.id).children.push(form);
      } else {
        tree.push(form);
      }
    });

    // 🔹 Opcional: eliminar nodos sin hijos (si sirve como categoría vacía)
    return tree.filter(node => node.children.length > 0 || !node.parent);
  }
}
