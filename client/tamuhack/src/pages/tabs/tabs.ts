import { Component } from '@angular/core';

import { ProfsPage } from '../profs/profs';
import { CoursesPage } from '../courses/courses';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CoursesPage;
  tab3Root = ProfsPage;

  constructor() {

  }
}
