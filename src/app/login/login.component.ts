import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private proxy = "http://localhost:4000";
  constructor(private http :HttpClient) {
  }

  ngOnInit() {
  }

  login(loginForm :NgForm) {
    console.log(loginForm.value);
    this.http.post(this.proxy + "/api/login", {
        username: loginForm.value.username,
        password: loginForm.value.password
    })
      .subscribe((res) => {
        console.log(res);
      }, (err) => {
        console.log(err);
      });
  }
}
