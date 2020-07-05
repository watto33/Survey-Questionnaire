import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  private token;
  private isAuthenticated = false;
  private authStatusListner = new Subject<boolean>();
  public surveyStatusListner = new Subject<boolean>();
  private tokenTimer: any;
  private userId: string;
  surveyStatus: boolean;

  createUser(email: string, password: string) {
    const authData: AuthData = { email, password };
    this.http
      .post('http://localhost:3000/api/auth/signup', authData)
      .subscribe((responseData) => {
        this.router.navigate(['/login']);
      });
  }

  login(email: string, password: string) {
    const authData: AuthData = { email, password };
    this.http
      .post<{
        token: string;
        expiresIn: number;
        userId: string;
        surveyStatus: boolean;
      }>('http://localhost:3000/api/auth/login', authData)
      .subscribe((responseData) => {
        this.token = responseData.token;
        if (this.token) {
          const expiresIn = responseData.expiresIn;
          this.setAuthTimer(expiresIn);
          this.isAuthenticated = true;
          this.userId = responseData.userId;
          this.surveyStatus = responseData.surveyStatus;
          this.surveyStatusListner.next(this.surveyStatus);
          this.authStatusListner.next(true);
          const currentDateTime = new Date();
          const expirationDate = new Date(
            currentDateTime.getTime() + expiresIn * 1000
          );
          this.saveAuthData(this.token, expirationDate, this.surveyStatus);
          this.router.navigate(['/']);
        }
      });
  }

  autoLogin() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const currentDateTime = new Date();
    const expiresIn =
      authInformation.expirationDate.getTime() - currentDateTime.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.surveyStatus = JSON.parse(authInformation.surveyStatus);
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListner.next(true);
      this.surveyStatusListner.next(JSON.parse(authInformation.surveyStatus));
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListner.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListner.asObservable();
  }

  getSurveyStatusListener() {
    return this.surveyStatusListner.asObservable();
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getSurveyStatus() {
    return this.surveyStatus;
  }

  setSurveyStatus(status) {
    this.surveyStatus = status;
    this.surveyStatusListner.next(this.surveyStatus);
  }

  private saveAuthData(token: string, expirationDate: Date, surveyStatus) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('surveyStatus', surveyStatus);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('surveyStatus');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const surveyStatus = localStorage.getItem('surveyStatus');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      surveyStatus: surveyStatus,
    };
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => this.logout(), duration * 1000);
  }
}
