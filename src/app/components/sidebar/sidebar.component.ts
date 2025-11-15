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
        // Filtrar los visibles inicialmente
        const visibleForms = forms.filter(f => f.visible);

        // Consultar permisos del usuario
        this.permissionService.getPermissionsByProfile(this.profileId).subscribe({
          next: (permissions: Permission[]) => {
            // Dejar solo formularios con permiso R en true
            const allowedForms = visibleForms.filter(form =>
              permissions.some(p => p.form_pms.id === form.id && p.R)
            );

            // Construir el menú jerárquico
            this.menuTree = this.buildTree(allowedForms);
          },
          error: err => console.error("Error cargando permisos", err)
        });
      },
      error: err => console.error("Error cargando formularios", err)
    });
  }

  // Construye la jerarquía respetando padres e hijos permitidos
  private buildTree(forms: Form[]): any[] {
    const formMap = new Map<number, any>();

    forms.forEach(f => {
      formMap.set(f.id, { ...f, children: [] });
    });

    const tree: any[] = [];

    formMap.forEach(form => {
      if (form.parent && formMap.has(form.parent.id)) {
        formMap.get(form.parent.id).children.push(form);
      } else {
        tree.push(form);
      }
    });

    return tree;
  }
}
