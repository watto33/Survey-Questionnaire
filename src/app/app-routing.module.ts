import { QuestionsComponent } from './questionnaire/questions/questions.component';
import { DataTableComponent } from './questionnaire/data-table/data-table.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: DataTableComponent },
  { path: 'questions', component: QuestionsComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
