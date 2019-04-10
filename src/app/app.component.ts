//import { Component } from '@angular/core';
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
//import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {HomeComponent} from './home/home.component';
import {SectionselectComponent} from './sectionselect/sectionselect.component';
import {MainComponent} from './main/main.component';
import {GlobalsearchComponent} from './globalsearch/globalsearch.component';
import {MedicalComponent} from './medical/medical.component';
import { Globals } from './globals';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})

export class AppComponent {

constructor(private globals: Globals ) { }

  @ViewChild('menu') private menu: OnsSplitterSide;
  @ViewChild('navi') private navi: OnsNavigator;

  home = HomeComponent;
  cards = SectionselectComponent;
  main = MainComponent;
  medical = MedicalComponent;
  globalsearch = GlobalsearchComponent;

  loadPage(page) {
    if ((page==this.home)&&(this.globals.configread==true))
    { 
       page = this.main;
    }
    this.menu.nativeElement.close();
    this.navi.nativeElement.resetToPage(page, { animation: 'fade' });
  } 
  logout(page) {
    this.globals.secret="";
    this.globals.userid="";
    this.globals.configread=false;
    this.globals.config = [];
    this.menu.nativeElement.close();
    this.navi.nativeElement.resetToPage(page, { animation: 'fade' });
  } 
}