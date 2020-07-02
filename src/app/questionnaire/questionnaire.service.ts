import { Injectable } from '@angular/core';
import { Questionnaire } from './questionnaire.model';
import { HttpClient, HttpHeaderResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireService {
  private questionnaire: Questionnaire;
  private questionnaireUpdated = new Subject<Questionnaire>();

  constructor(private http: HttpClient) {}

  // tslint:disable-next-line: typedef
  getQuestionnaire() {
    this.http
      .get<{ message: string; questions: { questionnaire: Questionnaire } }>(
        'http://localhost:3000/api/questions'
      )
      .subscribe((quesobject) => {
        this.questionnaire = quesobject.questions.questionnaire;
        this.questionnaireUpdated.next({ ...this.questionnaire });
      });
  }

  // tslint:disable-next-line: typedef
  getQuestionnaireUpdateListner() {
    return this.questionnaireUpdated.asObservable();
  }
}
