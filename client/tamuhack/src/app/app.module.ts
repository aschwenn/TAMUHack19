import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ProfsPage } from '../pages/profs/profs';
import { CoursesPage } from '../pages/courses/courses';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CoursePage } from '../pages/course/course';
import { ProfPage } from '../pages/prof/prof';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { AlertController } from 'ionic-angular';

@NgModule({
  declarations: [
    MyApp,
    ProfsPage,
    CoursesPage,
    HomePage,
    TabsPage,
    CoursePage,
    ProfPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProfsPage,
    CoursesPage,
    HomePage,
    TabsPage,
    CoursePage,
    ProfPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AlertController,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
