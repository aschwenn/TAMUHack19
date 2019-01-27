import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CoursesPage } from '../courses/courses';

@IonicPage()
@Component({
  selector: 'page-course',
  templateUrl: 'course.html',
})
export class CoursePage {

  course: string = CoursesPage.courseExternal;
  data: any = CoursesPage.dataExternal;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
