import { Answer } from './answers.model';
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

  private answers: Answer[];
  private answersUpdated = new Subject<Questionnaire>();

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

  getAnswers() {
    return this.answers;
  }

  getUpdatedAnswers() {
    return this.answersUpdated.asObservable();
  }

  getAllAnswers() {}
}
