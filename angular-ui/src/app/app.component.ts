import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Student } from './app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-ui';
  students: Array<Student> = [];
  departments = [];
  loading = false;
  error = '';
  gqlQuery: string = `{
    students {
      student_id,
      student_name,
      student_age
    }
  }`;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    console.log("In...1");
    this.callAPI();
  }

  callAPI() {
    console.log('this.gqlQuery : ' + this.gqlQuery);
    this.apollo
      .watchQuery({
        query: gql`${this.gqlQuery}`,
        pollInterval: 5000,
      })
      .valueChanges.subscribe((result: any) => {
        console.log("In...2");
        const responseData = result.data;
        this.loading = result.loading;
        this.error = result.error;

        this.students = responseData.students;
        //this.departments = responseData.departments;
      });
  }
}