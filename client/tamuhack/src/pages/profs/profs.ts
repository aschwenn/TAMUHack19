import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { ProfPage } from '../prof/prof';

@Component({
  selector: 'page-profs',
  templateUrl: 'profs.html'
})
export class ProfsPage {

  last: string = '';
  first: string = '';

  static lastExternal: string = '';
  static firstExternal: string = '';
  static dataExternal: any = {};

  dummyData: any = [
    {
      dept: 'CSCE',
      course: '121',
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
      dept: 'CSCE',
      course: '121',
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
      dept: 'CSCE',
      course: '121',
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
      dept: 'CSCE',
      course: '221',
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
      dept: 'CSCE',
      course: '221',
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

  constructor(public navCtrl: NavController, private http: HttpClient, private alertCtrl: AlertController) {

  }

  searchProf() {
    this.last = this.last.toUpperCase();
    this.first = this.first.toUpperCase();
    console.log('Searched for: ' + this.last + this.first);
    let result = this.httpGetCall(this.last, this.first);
    if (!result) {
      // Course not found
      const alert = this.alertCtrl.create({
        title: 'Professor not found',
        subTitle: this.first + ' ' + this.last,
        message: 'Please try a valid TAMU instructor.',
        buttons: ['OK']
      });
      alert.present();
      
    }
    else {
      // Open course data
      ProfsPage.lastExternal = this.last;
      ProfsPage.firstExternal = this.first;
      ProfsPage.dataExternal = result;
      this.navCtrl.push(ProfPage);
    }
  }

  httpGetCall(_last, _first): any{
    /*this.http.get(MyApp.URL + '/').subscribe((res) => {
      console.log(res);
    });*/
    let temp;
    if (_last == 'LEYK' && _first == 'T'){
      temp = this.dummyData;
    }
    else {
      temp = false;
    }
    return temp;
  }

}
