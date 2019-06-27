import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals';
import {  PhotoURLService } from '../../photoUrl';
import * as ons from 'onsenui';
import {DomSanitizer} from '@angular/platform-browser'
import {  DateformatService } from '../../dateformatter';
import {  Sortservice } from '../../sort';

@Component({
  selector: 'ons-page[attendancetab]',
  templateUrl: './attendancetab.component.html',
  styleUrls: ['./attendancetab.component.css']
})
export class AttendancetabComponent implements OnInit {

  constructor(
    private sanitizer: DomSanitizer, 
    private globals: Globals,
    private dateFormat: DateformatService,
    private sorting: Sortservice,
    private photoURL: PhotoURLService) {  }
// members = new Array;
 cardTitle: string = 'Custom Card';
 event : object;
// member = "";
// member_image = "";
  
eventdates(s,e) {
  var subtitle = "";
  if (e=="1970-01-01"){ e=null}
 // if (e!=null) { subtitle = "From "; }
  subtitle = subtitle + this.dateFormat.date_format_date(s,false);
  if (e!=null) {
    subtitle = subtitle + " - ";
    subtitle = subtitle + this.dateFormat.date_format_date(e,false);
  //  subtitle = subtitle + " (" + this.dateFormat.date_format_days_between(s,e)+" days)";
  }
  return subtitle
}
  
get_count(l){
   var count = 0;
 for ( var i = 0; i < this.event.items.length; i++ ) {
   if (this.event.items[i].attending == "Yes") {
     if((this.event.items[i].patrolid==-2&&(l==true)))
        { count++; }
     if((this.event.items[i].patrolid>0&&(l==false)))
        { count++; }    
   }
 }
 return count;

}

get_total(il){
   var count = 0;
 for ( var i = 0; i < this.event.items.length; i++ ) {
   if (this.event.items[i].attending == "Yes") {
     if((this.event.items[i].patrolid==-2&&(il!=0)))
        { count++; }
     if((this.event.items[i].patrolid>0))
        { count++; }    
   }
 }
 return count;

} 

remain(count,total){
  return (total-count);
}

  

  ngOnInit() {
//    this.members =  Object.keys(this.globals.sectiondata[1].data).map(i => this.globals.sectiondata[1].data[i]);
 //   this.member = this.members.find(o => o.member_id === this.globals.scoutcard);
  //  this.cardTitle = this.member.first_name+" "+this.member.last_name;
   // this.member_image = this.get_photo_url(this.member);
 this.event = this.globals.event.find(f=>f.eventid==this.globals.eventcard)
   this.eventA = this.globals.eventA.find(f=>f.eventid==this.globals.eventcard)
   this.event.items.sort(this.sorting.compareValuesArray(["lastname"],"asc"))
  }

}