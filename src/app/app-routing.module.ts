import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { DataTableComponent } from './questionnaire/data-table/data-table.component';
import { QuestionnaireGuard } from './questionnaire/questionnaire.guard';
import { QuestionsComponent } from './questionnaire/questions/questions.component';

const routes: Routes = [
  { path: '', component: DataTableComponent },
  {
    path: 'questions',
    component: QuestionsComponent,
    canActivate: [AuthGuard, QuestionnaireGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, QuestionnaireGuard],
})
export class AppRoutingModule {}
