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
import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals';
import {  PhotoURLService } from '../../photoUrl';
import * as ons from 'onsenui';
import {DomSanitizer} from '@angular/platform-browser'
import {  DateformatService } from '../../dateformatter';
import {  Sortservice } from '../../sort';
import { ScoutcardComponent } from '../../scoutcard/scoutcard.component';

@Component({
  selector: 'ons-page[attendancetab]',
  templateUrl: './attendancetab.component.html',
  styleUrls: ['./attendancetab.component.css']
})
export class AttendancetabComponent implements OnInit {

  constructor(
    private sanitizer: DomSanitizer, 
    private _navigator: OnsNavigator,
    private globals: Globals,
    private dateFormat: DateformatService,
    private sorting: Sortservice,
    private photoURL: PhotoURLService) {  }
// members = new Array;
 cardTitle: string = 'Custom Card';
 event : object;
 attendees = new Array;
 members = new Array;
 test = new Array;
  labels = new Array;
   values = new Array;
 group_label = ["Swim 50m","Gender","Patrol","Role","Age"];
 //members = new Array;
// member_image = "";

goto_scoutcard(event, member) {
 //debugger;
 //members = new Array;
     this._navigator.element.pushPage(ScoutcardComponent, { data: { index: member.scoutid } });
  }
  
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
     if((this.event.items[i].patrolid>-1&&(l==false)))
        { count++; }    
   }
 }
 return count;
//
}

get_total(il){
   var count = 0;
 for ( var i = 0; i < this.event.items.length; i++ ) {
   if (this.event.items[i].attending == "Yes") {
     if((this.event.items[i].patrolid==-2&&(il!=0)))
        { count++; }
     if((this.event.items[i].patrolid>-1))
        { count++; }    
   }
 }
 return count;

} 

remain(count,total){
  return (total-count);
}

//this.matches = this.members.reduce((acc, o) => (acc[o.patrol] = (acc[o.patrol] || 0 ) + 1, acc), {})
//this.matches = this.members.reduce((acc, o) => (acc[o.custom_data[7][34]] = (acc[o.custom_data[7][34]] || 0) + 1, acc), {});

collect_list() {
  for ( var i = 0; i < this.event.items.length; i++ ) {
   if (this.event.items[i].attending == "Yes") {
      this.attendees.push(this.members.find(o => o.member_id == this.event.items[i].scoutid));
      if (this.attendees[this.attendees.length-1].age_years >=18) {this.attendees[this.attendees.length-1].age_years="18+";}
   }
  }
  this.test = (this.create_array("7","34"))
  this.labels = Object.keys(this.test)
  this.values = Object.values(this.test)
  document.getElementById('segment_summary').setActiveButton(1);
}  

create_array(custom,field)
{
  if (custom!="") {
  return this.attendees.reduce((acc, o) => (acc[o.custom_data[custom][field]] = (acc[o.custom_data[custom][field]] || 0) + 1, acc), {});
  } else
  {
    return this.attendees.reduce((acc, o) => (acc[o[field]] = (acc[o[field]] || 0) + 1, acc), {});
  }
}

update_summary(){
  var sum = document.getElementById('segment_summary').getActiveButtonIndex();
  // ["Swim 50m","Gender","Patrol","Role","Age"]
  if (sum==0) {  this.test = (this.create_array("9","24258")) };  
  if (sum==1) {  this.test = (this.create_array("7","34")) };
  if (sum==2) {  this.test = (this.create_array("","patrol")) };
  if (sum==3) {  this.test = (this.create_array("","patrol_role_level_label")) };
  if (sum==4) {  this.test = (this.create_array("","age_years")) };

  this.labels = Object.keys(this.test)
  this.values = Object.values(this.test) 
}


  ngOnInit() {
//    this.members =  Object.keys(this.globals.sectiondata[1].data).map(i => this.globals.sectiondata[1].data[i]);
 //   this.member = this.members.find(o => o.member_id === this.globals.scoutcard);
  //  this.cardTitle = this.member.first_name+" "+this.member.last_name;
   // this.member_image = this.get_photo_url(this.member);
 this.event = this.globals.event.find(f=>f.eventid==this.globals.eventcard)
 this.eventA = this.globals.eventA.find(f=>f.eventid==this.globals.eventcard)
 this.event.items.sort(this.sorting.compareValuesArray(["lastname"],"asc"))
 this.members = Object.keys(this.globals.sectiondata[1].data).map(i => this.globals.sectiondata[1].data[i]);
 this.collect_list();
  }

}