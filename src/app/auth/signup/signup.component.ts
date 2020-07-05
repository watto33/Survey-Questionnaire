import { Subscription } from 'rxjs';
import { AuthService } from './../auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSubscription: Subscription;

  passwordMatch;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authStatusSubscription = this.authService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
      });
  }

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

  ngOnDestroy(): void {
    this.authStatusSubscription.unsubscribe();
  }
}
