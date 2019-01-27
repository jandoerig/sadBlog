import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private proxy = "http://localhost:4000";
  constructor(private http :HttpClient) { }

  ngOnInit() {
  }

  register(registerForm :NgForm){
    this.http.post(this.proxy + "/api/register", {
      username: registerForm.value.username,
      email: registerForm.value.email,
      password: registerForm.value.password
    }).subscribe(res => console.log(res), err => console.log(err));
  }

}
