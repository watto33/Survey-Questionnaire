import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;

  displayedColumns = [];
  dataSource: MatTableDataSource<any>;
  allAnswers = [];
  quesAns = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<{ allUsersAnswers: [{ answers: [] }] }>(
        'http://localhost:3000/api/answers'
      )
      .subscribe((allUsersData) => {
        this.allAnswers = allUsersData.allUsersAnswers;
        let obj = {};
        // tslint:disable-next-line: forin
        for (const singleUserAnswer in this.allAnswers) {
          for (const quesAnsObj of this.allAnswers[singleUserAnswer].answers) {
            if (quesAnsObj.answer === undefined) {
              quesAnsObj.answer = 'Not Answered';
            }
            obj[quesAnsObj.question] = quesAnsObj.answer;
          }
          this.quesAns.push(obj);
          obj = {};
        }
        this.dataSource = new MatTableDataSource(this.quesAns);
        for (const v in this.quesAns[0]) {
          this.displayedColumns.push(v);
        }

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
