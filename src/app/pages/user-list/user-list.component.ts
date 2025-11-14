import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { AlertService } from 'src/app/services/alert.service';

declare var bootstrap: any;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  
  generatedPassword: string | null = null;
  private resetPasswordModal: any;



  constructor(
    private userService: UserService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data: User[]) => {
        this.users = data;
      },
      (error) => {
        console.error('Error al cargar los usuarios', error);
      }
    );
  }

  deleteUser(id: string): void {
    this.userService.deleteUser(id).subscribe(
      () => {
        this.users = this.users.filter(user => user.id !== id);
        this.alertService.showSuccess('Usuario eliminado con éxito');
      },
      (err) => {
        console.error('Error al eliminar el usuario', err);
        this.alertService.showError(err?.error);
      }
    );
  }

  resetPassword(username: string): void {
  this.userService.updatePassword(username).subscribe(
    (response) => {

      this.generatedPassword = response.password;

      // Abrir modal
      this.resetPasswordModal = new bootstrap.Modal(document.getElementById('resetPasswordModal'));
      this.resetPasswordModal.show();
    },
    (err) => {
      console.error('Error al restablecer la contraseña', err);
      this.alertService.showError(err?.error);
    }
  );
}
closeModal(): void {
  if (this.resetPasswordModal) {
    this.resetPasswordModal.hide();
  }
}

}
