import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { MyApp } from '../../app/app.component';
import { CoursePage } from '../course/course';

@Component({
  selector: 'page-courses',
  templateUrl: 'courses.html'
})
export class CoursesPage {

  courseno: string = '';
  dept: string = '';

  static courseExternal: string = '';
  static dataExternal: any;

  dummyData: any = [
    {
      section: '501',
      term: '20183',
      prof_firstname: 'T',
      prof_lastname: 'LEYK',
      A: 13,
      B: 6,
      C: 8,
      D: 0,
      F: 0,
      GPA: 3.185,
      I: 0,
      S: 0,
      U: 0,
      Q: 5,
      X: 0
    },
    {
      section: '502',
      term: '20183',
      prof_firstname: 'T',
      prof_lastname: 'LEYK',
      A: 9,
      B: 10,
      C: 6,
      D: 0,
      F: 0,
      GPA: 3.120,
      I: 0,
      S: 0,
      U: 0,
      Q: 1,
      X: 0
    },
    {
      section: '503',
      term: '20183',
      prof_firstname: 'T',
      prof_lastname: 'LEYK',
      A: 10,
      B: 5,
      C: 5,
      D: 1,
      F: 0,
      GPA: 3.142,
      I: 0,
      S: 0,
      U: 0,
      Q: 1,
      X: 0
    }
  ];

  constructor(public navCtrl: NavController, private http: HttpClient, public alertCtrl: AlertController) {

  }

  searchClass(){
    this.dept = this.dept.toUpperCase();
    console.log('Searched for: ' + this.dept + this.courseno);
    let result = this.httpGetCall(this.courseno, this.dept);
    if (!result) {
      // Course not found
      const alert = this.alertCtrl.create({
        title: 'Course not found',
        subTitle: this.dept + ' ' + this.courseno,
        message: 'Please try a valid department and course number.',
        buttons: ['OK']
      });
      alert.present();
      
    }
    else {
      // Open course data
      CoursesPage.courseExternal = this.dept + ' ' + this.courseno;
      CoursesPage.dataExternal = result;
      this.navCtrl.push(CoursePage);
    }
  }

  httpGetCall(_courseno, _dept): any{
    /*this.http.get(MyApp.URL + '/').subscribe((res) => {
      console.log(res);
    });*/
    let temp;
    if (_dept == 'CSCE' && _courseno == '121'){
      temp = this.dummyData;
    }
    else {
      temp = false;
    }
    return temp;
  }

}
