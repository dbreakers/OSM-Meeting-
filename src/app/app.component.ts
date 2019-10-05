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
import { TermpickerComponent } from './termpicker/termpicker.component';
import {EventsComponent} from './events/events.component';
import {ProgrammeComponent} from './programme/programme.component';
import {MainComponent} from './main/main.component';
import {RostaComponent} from './rosta/rosta.component';
import {GlobalsearchComponent} from './globalsearch/globalsearch.component';
import {MedicalComponent} from './medical/medical.component';
import {BirthdayComponent} from './birthday/birthday.component';
import { LastcheckedComponent} from './lastchecked/lastchecked.component';
import {LeaderrostaComponent} from './leaderrosta/leaderrosta.component';
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
  terms = TermpickerComponent;
  medical = MedicalComponent;
  birthday = BirthdayComponent;
  globalsearch = GlobalsearchComponent;
  events = EventsComponent;
  progs = ProgrammeComponent;
  rosta = RostaComponent;
  lrosta = LeaderrostaComponent;
  checked = LastcheckedComponent;
   
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
    this.globals.event = [];
    this.globals.eventA = [];
    this.globals.progs = [];
    this.globals.qmlist = [];
    for (var i=0; i< Object.keys(this.globals.loaded).length; i++) 
    {
    this.globals.loaded[Object.keys(this.globals.loaded)[i]] = false;
    }
    
    for (var i=0; i< Object.keys(this.globals.errors).length; i++) 
    {
    this.globals.errors[Object.keys(this.globals.errors)[i]] = false;
    }
    
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