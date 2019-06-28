import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals';
import {  PhotoURLService } from '../../photoUrl';
import * as ons from 'onsenui';
import {DomSanitizer} from '@angular/platform-browser'
import {  DateformatService } from '../../dateformatter';

@Component({
  selector: 'ons-page[summarytab]',
  templateUrl: './summarytab.component.html',
  styleUrls: ['./summarytab.component.css']
})
export class SummarytabComponent implements OnInit {

  constructor(
    private sanitizer: DomSanitizer, 
    private globals: Globals,
    private dateFormat: DateformatService,
    private photoURL: PhotoURLService) {  }
 
  eventdates(s) {
  var subtitle = "";
  if (s=="1970-01-01"){ s=null}
 // if (e!=null) { subtitle = "From "; }
 if (s!=null) {
  subtitle = this.dateFormat.date_format_date(s,false);
 }
  return subtitle
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

 

  ngOnInit() {
   this.event = this.globals.event.find(f=>f.eventid==this.globals.eventcard)
   this.eventA = this.globals.eventA.find(f=>f.eventid==this.globals.eventcard)
  }

}