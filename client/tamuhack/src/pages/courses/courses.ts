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
    },
    {
      section: '513',
      term: '20183',
      prof_firstname: 'J',
      prof_lastname: 'MOORE',
      A: 5,
      B: 6,
      C: 3,
      D: 2,
      F: 2,
      GPA: 2.555,
      I: 0,
      S: 0,
      U: 0,
      Q: 1,
      X: 0
    },
    {
      section: '514',
      term: '20183',
      prof_firstname: 'J',
      prof_lastname: 'MOORE',
      A: 1,
      B: 5,
      C: 8,
      D: 2,
      F: 0,
      GPA: 2.100,
      I: 0,
      S: 0,
      U: 0,
      Q: 1,
      X: 0
    },
    {
      section: '515',
      term: '20183',
      prof_firstname: 'J',
      prof_lastname: 'MOORE',
      A: 4,
      B: 6,
      C: 7,
      D: 2,
      F: 4,
      GPA: 2.713,
      I: 0,
      S: 0,
      U: 0,
      Q: 4,
      X: 0
    },
    {
      section: '523',
      term: '20183',
      prof_firstname: 'M',
      prof_lastname: 'NOWAK',
      A: 13,
      B: 5,
      C: 2,
      D: 0,
      F: 0,
      GPA: 3.550,
      I: 0,
      S: 0,
      U: 0,
      Q: 1,
      X: 0
    }
  ];

  dummyData2: any = [
    {
      section: '200',
      term: '20181',
      prof_firstname: 'T',
      prof_lastname: 'LEYK',
      A: 28,
      B: 2,
      C: 0,
      D: 0,
      F: 0,
      GPA: 3.933,
      I: 0,
      S: 0,
      U: 0,
      Q: 0,
      X: 0
    },
    {
      section: '501',
      term: '20181',
      prof_firstname: 'T',
      prof_lastname: 'LEYK',
      A: 7,
      B: 3,
      C: 1,
      D: 0,
      F: 0,
      GPA: 3.545,
      I: 0,
      S: 0,
      U: 0,
      Q: 1,
      X: 0
    }
  ]

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
    else if (_dept == 'CSCE' && _courseno == '221'){
      temp = this.dummyData2;
    }
    else {
      temp = false;
    }
    return temp;
  }

}
