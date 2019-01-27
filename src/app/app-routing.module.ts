import { NgModule } from '@angular/core';
import { WriteLetterComponent } from './write-letter/write-letter.component';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from "./register/register.component";

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "writeLetter", component: WriteLetterComponent},
  {path: "register", component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
