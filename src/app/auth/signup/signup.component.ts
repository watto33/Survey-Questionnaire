import { AuthService } from './../auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  isLoading = false;

  passwordMatch;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSignUp(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (form.value.password !== form.value.confirmPassword) {
      alert("Password and confirm password doesn't match");
      return;
    }
    this.authService.createUser(form.value.email, form.value.password);
    this.isLoading = true;
  }
}
