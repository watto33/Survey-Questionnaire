import { QuestionnaireGuard } from './questionnaire/questionnaire.guard';
import { AuthGuard } from './auth/auth.guard';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { QuestionsComponent } from './questionnaire/questions/questions.component';
import { DataTableComponent } from './questionnaire/data-table/data-table.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: DataTableComponent },
  {
    path: 'questions',
    component: QuestionsComponent,
    canActivate: [AuthGuard, QuestionnaireGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, QuestionnaireGuard],
})
export class AppRoutingModule {}
