import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './../../services/user.service';
import { User } from 'src/app/models/user';
import { Profile } from 'src/app/models/profile';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  // Usuario siguiendo el modelo
  public user: User = {
    id: '',
    username: '',
    password: '',
    name: '',
    lastName: '',
    secondLastName: '',
    phoneNumber: '',
    email: '',
    enabled: true,
    profile: null
  };

  constructor(private userService: UserService, private snack: MatSnackBar, private router: Router) { }

  ngOnInit(): void { }

  formSubmit() {
    if (!this.user.email || this.user.email.trim() === '') {
      this.snack.open('El email es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }

    // Crear usuario
    this.userService.createUser(this.user,this.user.password).subscribe(
      (data) => {
        Swal.fire('Usuario guardado', 'Usuario registrado con éxito en el sistema', 'success').then(() => {
          this.router.navigate(['/login']);
        });
      },
      (error) => {
        console.error(error);
        this.snack.open('Ha ocurrido un error en el sistema !!', 'Aceptar', {
          duration: 3000
        });
      }
    );
  }

}
