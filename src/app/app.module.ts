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

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PageNav1Component } from './PageNav1/PageNav1.component';
import { ScoutcardComponent } from './scoutcard/scoutcard.component';
import { TermpickerComponent } from './termpicker/termpicker.component';
import { MedicalcardComponent } from './medicalcard/medicalcard.component';
import { MedicalsummaryComponent } from './medicalsummary/medicalsummary.component';
import { BirthdayComponent } from './birthday/birthday.component';
import { GlobalsearchComponent } from './globalsearch/globalsearch.component';
import { SectionselectComponent } from './sectionselect/sectionselect.component';
import { MainComponent } from './main/main.component';
import { MedicalComponent } from './medical/medical.component';
import { Globals } from './globals';

//import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

@NgModule({
  imports: [OnsenModule, HttpClientModule],
  declarations: [AppComponent, HomeComponent, PageNav1Component, SectionselectComponent, MedicalcardComponent, MainComponent, MedicalComponent, MedicalsummaryComponent, GlobalsearchComponent, ScoutcardComponent, TermpickerComponent, BirthdayComponent],
  entryComponents: [HomeComponent, PageNav1Component, SectionselectComponent, MedicalcardComponent, MainComponent, MedicalComponent, GlobalsearchComponent, MedicalsummaryComponent,ScoutcardComponent, TermpickerComponent,BirthdayComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ Globals ]
})

export class AppModule { }

//platformBrowserDynamic().bootstrapModule(AppModule);