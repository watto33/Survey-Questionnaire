import { AuthService } from './../../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;

  displayedColumns = [];
  dataSource: MatTableDataSource<any>;
  allAnswers = [];
  quesAns = [];
  isLoading;

  userIsAuthenticated;
  private authListenerSubscription: Subscription;
  surveyStatus;
  surveyStatusListnerSubscription: Subscription;

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    this.isLoading = true;
    this.http
      .get<{ allUsersAnswers: [{ answers: [] }] }>(
        'http://localhost:3000/api/questionnaire/answers'
      )
      .subscribe((allUsersData) => {
        this.isLoading = false;
        this.allAnswers = allUsersData.allUsersAnswers;
        let obj = {};
        // tslint:disable-next-line: forin
        for (const singleUserAnswer in this.allAnswers) {
          for (const quesAnsObj of this.allAnswers[singleUserAnswer]
            .userAnswers) {
            if (quesAnsObj.answer === undefined) {
              quesAnsObj.answer = 'Not Answered';
            }
            obj[quesAnsObj.question] = quesAnsObj.answer;
          }
          this.quesAns.push(obj);
          obj = {};
        }
        for (const question in this.quesAns[0]) {
          this.displayedColumns.push(question);
        }
        this.dataSource = new MatTableDataSource(this.quesAns);

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });

    this.surveyStatus = this.authService.getSurveyStatus();
    this.surveyStatusListnerSubscription = this.authService
      .getSurveyStatusListener()
      .subscribe((surveyStatus) => {
        this.surveyStatus = surveyStatus;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubscription = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.surveyStatus = this.authService.getSurveyStatus();
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    this.surveyStatusListnerSubscription.unsubscribe();
    this.authListenerSubscription.unsubscribe();
  }
}
