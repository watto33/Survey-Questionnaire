import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Answer } from './answers.model';
import { Questionnaire } from './questionnaire.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireService {
  private questionnaire: Questionnaire;
  private questionnaireUpdated = new Subject<Questionnaire>();

  private answers: Answer[];

  constructor(private http: HttpClient) {}

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

  getQuestionnaireUpdateListner() {
    return this.questionnaireUpdated.asObservable();
  }

  onPushAnswer(form, questions) {
    this.answers = questions.map((question) => {
      if (question.identifier.includes('date')) {
        if (form.value[question.identifier] !== undefined) {
          form.value[question.identifier] = form.value[
            question.identifier
          ].toLocaleDateString();
        }
      }
      return {
        id: question.identifier,
        question: question.headline,
        answer: form.value[question.identifier],
      };
    });

    this.http
      .post<{ message: string }>(
        'http://localhost:3000/api/answers',
        this.answers
      )
      .subscribe((responseData) => {
        console.log(responseData.message);
      });
  }
}
