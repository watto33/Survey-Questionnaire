import { Subscription } from 'rxjs';
import { QuestionnaireService } from '../questionnaire.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatRadioChange, MatRadioButton } from '@angular/material/radio';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit, OnDestroy {
  questions = [];
  answers = [];

  quesSubscription: Subscription;

  constructor(private quesService: QuestionnaireService) {}

  ngOnInit(): void {
    this.quesService.getQuestionnaire();
    this.quesSubscription = this.quesService
      .getQuestionnaireUpdateListner()
      .subscribe((questionnaire) => {
        this.questions = questionnaire.questions;
      });
  }

  ngOnDestroy(): void {
    this.quesSubscription.unsubscribe();
  }

  clear(i): void {
    this.answers[i] = undefined;
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    this.quesService.onPushAnswer(form, this.questions);
  }
}
