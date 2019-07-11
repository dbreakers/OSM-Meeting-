
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
import {  PhotoURLService } from '../../photoUrl';
import * as ons from 'onsenui';
import {DomSanitizer} from '@angular/platform-browser'
import {  DateformatService } from '../../dateformatter';
import { MedicalComponent } from '../../medical/medical.component';

@Component({
  selector: 'ons-page[summarytab]',
  templateUrl: './summarytab.component.html',
  styleUrls: ['./summarytab.component.css']
})
export class SummarytabComponent implements OnInit {

  constructor(
    private sanitizer: DomSanitizer, 
    private globals: Globals,
     private _navigator: OnsNavigator,
    private dateFormat: DateformatService,
    private photoURL: PhotoURLService) {  }
 
  event : object;
  eventA : object;

  eventdates(s) {
  var subtitle = "";
  if (s=="1970-01-01"){ s=null}
 // if (e!=null) { subtitle = "From "; }
 if (s!=null) {
  subtitle = this.dateFormat.date_format_date(s,false);
 }
  return subtitle
}

goto_medical() {
  var list = new Array;
 for ( var i = 0; i < this.event.items.length; i++ ) {
   if (this.event.items[i].attending == "Yes") {
     list.push(this.event.items[i].scoutid)
   }
 }  
this._navigator.element.pushPage(MedicalComponent, { data: { filtername: this.eventA.name, filterlist: list } });
}

eventtime(t){
  var h = t.substring(0, 2);
  var m = t.substring(3, 5);
  var s = t.substring(6, 8);
  var ampm = h >= 12 ? 'pm' : 'am';
  h = h % 12
  h = h ? h : 12;
  return h + ':' + m + ' ' + ampm;
}

signup(date) {
  var d = new Date(date);
  var now2 = new Date();
  var d2 =  new Date(now2.getFullYear(),now2.getMonth(),now2.getDate());
    var diff =(d.getTime() - d2.getTime()) / 1000;
  diff /= (60 * 60 * 24);
 // return Math.abs(Math.round(diff));
 return Math.round(diff);
 }

invites_sent(v) {
var t = 0;  
  for ( var i = 0; i < this.event.items.length; i++ ) {
    if ((this.event.items[i].attending != "")&&(v))
    { t += 1; }
    if ((this.event.items[i].attending == "")&&(!v))
    { t += 1; }
  }
  return t;
} 


  ngOnInit() {
   this.event = this.globals.event.find(f=>f.eventid==this.globals.eventcard)
   this.eventA = this.globals.eventA.find(f=>f.eventid==this.globals.eventcard)
  }

}