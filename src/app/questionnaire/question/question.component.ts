import { Subscription } from 'rxjs';
import { QuestionnaireService } from '../questionnaire.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit, OnDestroy {
  questions;
  answers = [];
  quesSubscription: Subscription;

  constructor(private quesService: QuestionnaireService) {}

  ngOnInit(): void {
    this.quesService.getQuestionnaire();
    this.quesSubscription = this.quesService
      .getQuestionnaireUpdateListner()
      .subscribe((questionnaire) => {
        console.log('Test');
        this.questions = questionnaire.questions;
        console.log(this.questions);
      });
  }

  ngOnDestroy(): void {
    this.quesSubscription.unsubscribe();
  }
}
