import { AuthGuardGuard } from './services/auth-guard.guard';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { StoreListComponent } from './pages/store-list/store-list.component';
import { StoreCreateEditComponent } from './pages/store-create-edit/store-create-edit.component';
import { ProductCreateEditComponent } from './pages/product-create-edit/product-create-edit.component';
import { CategoryListComponent } from './pages/category-list/category-list.component'; 
import { CategoryCreateEditComponent } from './pages/category-create-edit/category-create-edit.component'; 
import { ColorListComponent } from './pages/color-list/color-list.component';
import { ColorCreateEditComponent } from './pages/color-create-edit/color-create-edit.component'; 
import { RoleListComponent } from './pages/role-list/role-list.component';
import { RoleCreateEditComponent } from './pages/role-create-edit/role-create-edit.component';
import { FormListComponent } from './pages/form-list/form-list.component';
import { FormCreateEditComponent } from './pages/form-create-edit/form-create-edit.component';
import { ProfileListComponent } from './pages/profile-list/profile-list.component';
import { ProfileCreateEditComponent } from './pages/profile-create-edit/profile-create-edit.component';
import { TransactionTypesListComponent } from './pages/transaction-types-list/transaction-types-list.component';
import { TransactionTypeCreateEditComponent } from './pages/transaction-types-create-edit/transaction-types-create-edit.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserCreateEditComponent } from './pages/users-create-edit/users-create-edit.component';
import { TransactionOriginsListComponent } from './pages/transaction-origins-list/transaction-origins-list.component';
import { TransactionOriginsCreateEditComponent } from './pages/transaction-origins-create-edit/transaction-origins-create-edit.component';
import { TransactionListComponent } from './pages/transaction-list/transaction-list.component';
import { TransactionCreateEditComponent } from './pages/transaction-create-edit/transaction-create-edit.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';

const routes: Routes = [
  {
    path : '',
    component : HomeComponent,
    pathMatch : 'full',
    canActivate:[AuthGuardGuard]
  },
  {
    path : 'signup',
    component : SignupComponent,
    pathMatch : 'full'
  },
  {
    path : 'login',
    component : LoginComponent,
    pathMatch : 'full'
  },
  {
    path : 'products',
    component : ProductListComponent,
    pathMatch : 'full',
    canActivate:[AuthGuardGuard]
  },
  {
    path : 'product-create',
    component : ProductCreateEditComponent ,
    pathMatch : 'full',
    canActivate:[AuthGuardGuard]
  },
  {
    path : 'product-edit/:productId',
    component : ProductCreateEditComponent  ,
    pathMatch : 'full',
    canActivate:[AuthGuardGuard]
  },
  {
    path : 'stores',
    component : StoreListComponent ,
    pathMatch : 'full',
    canActivate:[AuthGuardGuard]
  },
  {
    path : 'store-create',
    component : StoreCreateEditComponent ,
    pathMatch : 'full',
    canActivate:[AuthGuardGuard]
  },
  {
    path : 'store-edit/:id',
    component : StoreCreateEditComponent ,
    pathMatch : 'full',
    canActivate:[AuthGuardGuard]
  },
  {
    path : 'categories',
    component : CategoryListComponent ,
    pathMatch : 'full',
    canActivate:[AuthGuardGuard]
  },
  {
    path : 'category-create',
    component : CategoryCreateEditComponent ,
    pathMatch : 'full',
    canActivate:[AuthGuardGuard]
  },
  {
    path : 'category-edit/:id',
    component : CategoryCreateEditComponent ,
    pathMatch : 'full',
    canActivate:[AuthGuardGuard]
  },
  {
    path : 'colors',
    component : ColorListComponent ,
    pathMatch : 'full',
    canActivate:[AuthGuardGuard]
  },
  {
    path : 'color-create',
    component : ColorCreateEditComponent ,
    pathMatch : 'full',
    canActivate:[AuthGuardGuard]
  },
  {
    path : 'color-edit/:id',
    component : ColorCreateEditComponent ,
    pathMatch : 'full',
    canActivate:[AuthGuardGuard]
  },
  {
    path : 'roles',
    component : RoleListComponent ,
    pathMatch : 'full',
    canActivate:[AuthGuardGuard]
  },
  {
    path : 'role-create',
    component : RoleCreateEditComponent ,
    pathMatch : 'full',
    canActivate:[AuthGuardGuard]
  },
  {
    path : 'role-edit/:id',
    component : RoleCreateEditComponent ,
    pathMatch : 'full',
    canActivate:[AuthGuardGuard]
  },
  {
    path : 'forms',
    component : FormListComponent ,
    pathMatch : 'full',
    canActivate:[AuthGuardGuard]
  },
  {
    path : 'form-create',
    component : FormCreateEditComponent ,
    pathMatch : 'full',
    canActivate:[AuthGuardGuard]
  },
  {
    path : 'form-edit/:id',
    component : FormCreateEditComponent ,
    pathMatch : 'full',
    canActivate:[AuthGuardGuard]
  },
  {
    path : 'profiles',
    component : ProfileListComponent ,
    pathMatch : 'full',
    canActivate:[AuthGuardGuard]
  },
  {
    path : 'profile-create',
    component : ProfileCreateEditComponent ,
    pathMatch : 'full',
    canActivate:[AuthGuardGuard]
  },
  {
    path : 'profile-edit/:id',
    component : ProfileCreateEditComponent ,
    pathMatch : 'full',
    canActivate:[AuthGuardGuard]
  },
  {
    path : 'transactionTypes',
    component : TransactionTypesListComponent ,
    pathMatch : 'full',
    canActivate:[AuthGuardGuard]
  },
  {
    path : 'transactionTypes-create',
    component : TransactionTypeCreateEditComponent ,
    pathMatch : 'full',
    canActivate:[AuthGuardGuard]
  },
  {
    path : 'transactionTypes-edit/:id',
    component : TransactionTypeCreateEditComponent ,
    pathMatch : 'full',
    canActivate:[AuthGuardGuard]
  },
  {
    path : 'users',
    component : UserListComponent ,
    pathMatch : 'full',
    canActivate:[AuthGuardGuard]
  },
  {
    path : 'user-create',
    component : UserCreateEditComponent ,
    pathMatch : 'full',
    canActivate:[AuthGuardGuard]
  },
  {
    path : 'user-edit/:id',
    component : UserCreateEditComponent ,
    pathMatch : 'full',
    canActivate:[AuthGuardGuard]
  },
  {
    path : 'transactionOrigins',
    component : TransactionOriginsListComponent ,
    pathMatch : 'full',
    canActivate:[AuthGuardGuard]
  },
  {
    path : 'transactionOrigins-create',
    component : TransactionOriginsCreateEditComponent ,
    pathMatch : 'full',
    canActivate:[AuthGuardGuard]
  },
  {
    path : 'transactionOrigins-edit/:id',
    component : TransactionOriginsCreateEditComponent ,
    pathMatch : 'full',
    canActivate:[AuthGuardGuard]
  },
  {
    path : 'transactions',
    component : TransactionListComponent ,
    pathMatch : 'full',
    canActivate:[AuthGuardGuard]
  },
  {
    path : 'transactions-create',
    component : TransactionCreateEditComponent ,
    pathMatch : 'full',
    canActivate:[AuthGuardGuard]
  },
  {
    path : 'transactions-edit/:id',
    component : TransactionCreateEditComponent ,
    pathMatch : 'full',
    canActivate:[AuthGuardGuard]
  },
  {
    path : 'user-autoEdit/:username',
    component : UserEditComponent ,
    pathMatch : 'full',
    canActivate:[AuthGuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
