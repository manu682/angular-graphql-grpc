import { Component, OnInit } from '@angular/core';
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

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    console.log("In...1");
    this.apollo
      .watchQuery({
        query: gql`
        {
          students {
            student_id,
            student_name,
            student_age
          }
        }
        `,
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