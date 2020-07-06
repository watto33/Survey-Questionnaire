import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from './../angular-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataTableComponent } from './data-table/data-table.component';
import { QuestionComponent } from './question/question.component';
import { QuestionsComponent } from './questions/questions.component';

@NgModule({
  declarations: [QuestionsComponent, QuestionComponent, DataTableComponent],
  imports: [AngularMaterialModule, CommonModule, FormsModule],
})
export class QuestionnaireModule {}
