import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User = {
    id: '',
    username: '',
    password: '',
    name: '',
    lastName: '',
    secondLastName: '',
    phoneNumber: '',
    domain: '',
    enabled: true,
    profile: null
  };

  email: string = '';
  editMode = true;
  showPasswordField = false; // 👈 controla si se muestra el campo de contraseña
  newPassword: string = '';   // 👈 almacena la nueva contraseña

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('username');
    if (username) {
      this.userService.getUserByUsername(username).subscribe({
        next: (data: User) => {
          this.user = data;
          this.email = `${this.user.username}@${this.user.domain}`;
        },
        error: (err) => {
          console.error('Error cargando usuario', err);
          this.alertService.showError('Error cargando usuario');
        }
      });
    }
  }

  togglePasswordField(): void {
    this.showPasswordField = !this.showPasswordField;
    if (!this.showPasswordField) {
      this.newPassword = '';
    }
  }

  onSubmit(): void {
    if (this.showPasswordField && this.newPassword.trim()) {
      this.user.password = this.newPassword; // 👈 asigna la nueva contraseña
    }

    this.userService.updateUser(this.user.id, this.user, this.user.password).subscribe({
      next: () => {
        this.alertService.showSuccess('Información actualizada con éxito');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error actualizando usuario', err);
        const errorMessage = err?.error?.message || 'Error al actualizar usuario';
        this.alertService.showError(errorMessage);
      }
    });
  }
}
