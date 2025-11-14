import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { AlertService } from 'src/app/services/alert.service';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/models/profile';
import { UserPasswordResponse } from 'src/app/models/userPasswordResponse';

declare var bootstrap: any;

@Component({
  selector: 'app-user-create-edit',
  templateUrl: './users-create-edit.component.html',
  styleUrls: ['./users-create-edit.component.css']
})
export class UserCreateEditComponent implements OnInit {

  user: User = {
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

  profileId: number = 0;
  profiles: Profile[] = [];
  editMode = false;

  generatedPassword: string | null = null;

  private passwordModal: any;



  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.loadProfiles();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.userService.getUserById(id).subscribe({
        next: (data: User) => {
          this.user = data;

          this.profileId = this.user.profile ? this.user.profile.id : 0;

        },
        error: (err) => {
          console.error('Error al cargar el usuario', err);
          this.alertService.showError(err?.error);
        }
      });
    }
  }

  loadProfiles(): void {
    this.profileService.getActiveProfiles().subscribe({
      next: (profiles) => this.profiles = profiles,
      error: (err) => {
        console.error('Error al cargar perfiles', err);
        this.alertService.showError(err?.error);
      }
    });
  }

  onSubmit(): void {

    if (this.profileId != 0) {
      this.user.profile = { id: this.profileId, name: '', rol_prf: { id: 0, name: '', enabled: true }, enabled: true };
    }

    if (this.editMode) {
      this.userService.updateUser(this.user.id, this.user).subscribe({
        next: () => {
          this.alertService.showSuccess('Usuario actualizado con éxito');
          this.router.navigate(['/users']);
        },
        error: (err) => {
          console.error('Error actualizando el usuario', err);
          this.alertService.showError(err?.error);
        }
      });
    } else {
  this.userService.createUser(this.user, null).subscribe({
    next: (response: UserPasswordResponse) => {

      this.generatedPassword = response.password;

      this.passwordModal = new bootstrap.Modal(document.getElementById('passwordModal'));
this.passwordModal.show();

    },
    error: (err) => {
      console.error('Error creando el usuario', err);
      this.alertService.showError(err?.error);
    }
  });
}

  }
  compareProfiles(p1: number, p2: number): boolean {
    return p1 === p2;
  }
goBack(): void {
  if (this.passwordModal) {
    this.passwordModal.hide();
  }

  setTimeout(() => {
    this.router.navigate(['/users']);
  }, 200); // da tiempo a Bootstrap a remover el backdrop
}


}
