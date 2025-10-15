import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent {
  username: string = '';

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private router: Router
  ) {}

  resetPassword(): void {
    if (!this.username.trim()) {
      this.alertService.showError('Debe ingresar un nombre de usuario.');
      return;
    }

    this.userService.updatePassword(this.username).subscribe({
      next: () => {
        this.alertService.showSuccess(`La contraseña del usuario "${this.username}" fue restablecida con éxito.`);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error al restablecer la contraseña', err);
        const message = err?.error?.message || 'Error al restablecer la contraseña';
        this.alertService.showError(message);
      }
    });
  }
}
