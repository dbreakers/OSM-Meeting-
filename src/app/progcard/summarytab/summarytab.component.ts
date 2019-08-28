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
//import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals';
//import {  PhotoURLService } from '../../photoUrl';
import * as ons from 'onsenui';
//import {DomSanitizer} from '@angular/platform-browser'
import {  DateformatService } from '../../dateformatter';
import { ScoutcardComponent } from '../../scoutcard/scoutcard.component';

@Component({
  selector: 'ons-page[summarytab]',
  templateUrl: './summarytab.component.html',
  styleUrls: ['./summarytab.component.css']
})
export class ProgSummarytabComponent implements OnInit {

prog : object;

  constructor(
    private globals: Globals,
     private _navigator: OnsNavigator,
    private dateFormat: DateformatService
 ) {  }
 
timeformat(t) {

  var h = t.substring(0, 2);
  var m = t.substring(3, 5);
  var s = t.substring(6, 8);
  var ampm = h >= 12 ? 'pm' : 'am';
  h = h % 12
  h = h ? h : 12;
  return h + ':' + m + ' ' + ampm;}

toggle(id){
  var div=document.getElementById(id);
  div.style.display = div.style.display == "none" ? "block" : "none";
  var div=document.getElementById(id);
    div=document.getElementById(id+"_minus");
    div.style.display = div.style.display == "none" ? "block" : "none"; 
       div=document.getElementById(id+"_plus");
    div.style.display = div.style.display == "none" ? "block" : "none"; 
}
eventdates(s,e) {
  var subtitle = "";
  if (e=="1970-01-01"){ e=null}
 // if (e!=null) { subtitle = "From "; }
  subtitle = subtitle + this.dateFormat.date_format_date(s,false);
  if (e!=null) {
    subtitle = subtitle + " - ";
    subtitle = subtitle + this.dateFormat.date_format_date(e,false);
    subtitle = subtitle + " (" + this.dateFormat.date_format_days_between(s,e)+" day";
    if (this.dateFormat.date_format_days_between(s,e)>1) {subtitle=subtitle+"s"}
    subtitle = subtitle + ")"; 
  }
  return subtitle
}

go(e,event){
   this._navigator.element.pushPage(ScoutcardComponent, { data: { index: event } });
}
  
  ngOnInit() {
   this.prog = this.globals.progs.find(i => i.items[0].eveningid == this.globals.progcard)
   }

}