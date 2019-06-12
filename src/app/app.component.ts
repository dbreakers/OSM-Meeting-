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
import {EventsComponent} from './events/events.component';
import {MainComponent} from './main/main.component';
import {GlobalsearchComponent} from './globalsearch/globalsearch.component';
import {MedicalComponent} from './medical/medical.component';
import {BirthdayComponent} from './birthday/birthday.component';
import { Globals } from './globals';
import * as ons from 'onsenui';
import {HostListener} from "@angular/core";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})

export class AppComponent implements OnInit {

constructor(private globals: Globals ) { }

  @ViewChild('menu') private menu: OnsSplitterSide;
  @ViewChild('navi') private navi: OnsNavigator;


  home = HomeComponent;
  cards = SectionselectComponent;
  main = MainComponent;
  medical = MedicalComponent;
  birthday = BirthdayComponent;
  globalsearch = GlobalsearchComponent;
  events = EventsComponent;
  ons

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

@HostListener('window:beforeunload', ['$event'])
public doSomething($event) {
        $event.returnValue = "Help"
    //ons.notification.confirm({
    //  message: 'This dialog can be canceled by tapping the background or using the back button on your device.',
    //  cancelable: true,
    //  callback: i => {
    //    if (i == -1) {
          //ons.notification.alert({message: 'You canceled it!'});
    //      return false
    //    } else {return true}
    //  }
    //})
    //return false;
}
  
   ngOnInit() {
 
   }
}