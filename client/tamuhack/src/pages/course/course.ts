import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CoursesPage } from '../courses/courses';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';

@IonicPage()
@Component({
  selector: 'page-course',
  templateUrl: 'course.html',
})
export class CoursePage {

  course: string = CoursesPage.courseExternal;
  data: any = CoursesPage.dataExternal;
  newData: any = {};
  test = 1;
  test2 = '2';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.parseData();
  }

  parseData(){
    let consolidated = [];
    for(let i = 0; i < this.data.length; i++){
      let exists = false;
      let existsIndex = 0;
      for(let j = 0; j < consolidated.length; j++){
        if(this.data[i].term == consolidated[j].term){
          if(this.data[i].course == consolidated[j].course){
            if(this.data[i].dept == consolidated[j].dept){
              exists = true;
              existsIndex = j;
              break;
            }
          }
        }
      }
      if (!exists){
        // ordered insert
        // find index to insert
        let insertIndex = 0;
        for(let k = 0; k < consolidated.length; k++){
          if(consolidated[k].term < this.data[i].term){
            break;
          }
          insertIndex += 1;
        }
        let temp = this.data[i];
        consolidated.splice(insertIndex, 0, temp);
      }
      else{
        let temp = this.data[i];
        let consolidatedTotal = consolidated[existsIndex].A +
          consolidated[existsIndex].B +
          consolidated[existsIndex].C +
          consolidated[existsIndex].D +
          consolidated[existsIndex].F;
        let tempTotal = temp.A + temp.B + temp.C + temp.D + temp.F;
        let consolidatedGPA = consolidatedTotal * consolidated[existsIndex].GPA;
        let tempGPA = tempTotal * temp.GPA;
        let newGPA = (consolidatedGPA + tempGPA)/(tempTotal + consolidatedTotal);

        consolidated[existsIndex].GPA = newGPA;
        consolidated[existsIndex].A += temp.A;
        consolidated[existsIndex].B += temp.B;
        consolidated[existsIndex].C += temp.C;
        consolidated[existsIndex].D += temp.D;
        consolidated[existsIndex].F += temp.F;
        consolidated[existsIndex].I += temp.I;
        consolidated[existsIndex].S += temp.S;
        consolidated[existsIndex].U += temp.U;
        consolidated[existsIndex].Q += temp.Q;
        consolidated[existsIndex].X += temp.X;
      }
    }

    // adjust precision to 3 decimal points
    for(let x = 0; x < consolidated.length; x++){
      let temp = new Number(consolidated[x].GPA);
      consolidated[x].GPA = temp.toPrecision(4);
    }

    this.newData = consolidated;
  }

  totalStudents(sec): number {
    return sec.A + sec.B + sec.C + sec.D + sec.F + sec.I + sec.S + sec.U + sec.Q + sec.X;
  }

  truncate(term: string): string {
    console.log(term);
    return term[0] + term[1] + term[2] + term[3];
  }

}
