//import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  Component,
  Injector,
  ViewChild,
  Params,
  OnInit,
  OnsSplitterSide,
  OnsNavigator,
  OnsenModule,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from 'ngx-onsenui';

import { HttpClientModule }    from '@angular/common/http';

//import {HttpClientModule} from 'ngx-http-client';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';
import { EventsComponent } from './events/events.component';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ProgcardComponent } from './progcard/progcard.component';
import { ProgrammeComponent } from './programme/programme.component';
import { PageNav1Component } from './PageNav1/PageNav1.component';
import { ScoutcardComponent } from './scoutcard/scoutcard.component';
import { TermpickerComponent } from './termpicker/termpicker.component';
import { MedicalcardComponent } from './medicalcard/medicalcard.component';
import { LeaderrostaComponent } from './leaderrosta/leaderrosta.component';
import { MedicalsummaryComponent } from './medicalsummary/medicalsummary.component';
import { BirthdayComponent } from './birthday/birthday.component';
import { LastcheckedComponent } from './lastchecked/lastchecked.component';
import { GlobalsearchComponent } from './globalsearch/globalsearch.component';
import { RostaComponent } from './rosta/rosta.component';
import { SectionselectComponent } from './sectionselect/sectionselect.component';
import { MainComponent } from './main/main.component';
import { MedicalComponent } from './medical/medical.component';
import { Globals } from './globals';
import {DelayInterceptor} from './delay.service';
import { EventtabComponent } from './scoutcard/eventtab/eventtab.component';
import { PersontabComponent } from './scoutcard/persontab/persontab.component';
import { EventcardComponent } from './eventcard/eventcard.component';
import { SummarytabComponent } from './eventcard/summarytab/summarytab.component';
import { ProgSummarytabComponent } from './progcard/summarytab/summarytab.component';
import { AnswertabComponent } from './eventcard/answertab/answertab.component';
import { AttendancetabComponent } from './eventcard/attendancetab/attendancetab.component';
//import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
@NgModule({
  imports: [OnsenModule, HttpClientModule, 
  ServiceWorkerModule.register('/ngsw-worker.js')],
  declarations: [AppComponent, HomeComponent, PageNav1Component, SectionselectComponent, MedicalcardComponent, MainComponent, MedicalComponent, MedicalsummaryComponent, GlobalsearchComponent, ScoutcardComponent, LeaderrostaComponent, TermpickerComponent, ProgcardComponent, BirthdayComponent,RegisterComponent,EventsComponent,EventtabComponent, ProgrammeComponent, PersontabComponent,LastcheckedComponent, SummarytabComponent,AnswertabComponent, AttendancetabComponent, EventcardComponent, ProgSummarytabComponent, RostaComponent ],
  entryComponents: [HomeComponent, PageNav1Component, ProgrammeComponent, SectionselectComponent, MedicalcardComponent, MainComponent, MedicalComponent, LeaderrostaComponent, RegisterComponent,GlobalsearchComponent, ProgcardComponent, MedicalsummaryComponent,ScoutcardComponent, TermpickerComponent,BirthdayComponent,EventsComponent,EventtabComponent, AnswertabComponent, PersontabComponent,LastcheckedComponent,SummarytabComponent,AttendancetabComponent, EventcardComponent,ProgSummarytabComponent, RostaComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ Globals, { provide: HTTP_INTERCEPTORS, useClass: DelayInterceptor, multi: true}]
})

export class AppModule {}

//platformBrowserDynamic().bootstrapModule(AppModule);