import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-courses',
  templateUrl: 'courses.html'
})
export class CoursesPage {

  courseno: string = '';
  dept: string = '';

  constructor(public navCtrl: NavController) {

  }

  searchClass(){
    console.log('Searched for: ' + this.dept + this.courseno);
  }

}
