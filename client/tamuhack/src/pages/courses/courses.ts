import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-courses',
  templateUrl: 'courses.html'
})
export class CoursesPage {

  courseno: string = '';
  dept: string = '';

  constructor(public navCtrl: NavController, private http: HttpClient) {

  }

  searchClass(){
    console.log('Searched for: ' + this.dept + this.courseno);
  }

  httpGetCall(_courseno, __dept){
    this.http.get(URL + '/courseQuery/').subscribe((res) => {
      console.log(res);
    });
  }

}
