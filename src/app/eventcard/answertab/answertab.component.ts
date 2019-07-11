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
  selector: 'ons-page[answertab]',
  templateUrl: './answertab.component.html',
  styleUrls: ['./answertab.component.css']
})
export class AnswertabComponent implements OnInit {

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
 
 //members = new Array;
// member_image = "";


collect_list() {
  this.attendees = []
  //this.target = document.getElementById("incl").checked;
  for ( var i = 0; i < this.event.items.length; i++ ) {
   if (this.event.items[i].attending == "Yes") {
     var m = this.members.find(o => o.member_id == this.event.items[i].scoutid);
     if ((this.target)||(!this.target&&m.patrol_id>-1)){
      this.attendees.push(this.members.find(o => o.member_id == this.event.items[i].scoutid));      
      if (this.attendees[this.attendees.length-1].age_years >=18) {this.attendees[this.attendees.length-1].age_years="18+";}
    }
   }
  }
 // this.test = (this.create_array("7","34"))
  this.labels = Object.keys(this.test)
  this.values = Object.values(this.test)
  this.update_summary();
 //document.getElementById('segment_summary').setActiveButton();
}  


inc_leaders() {
  this.target =  ! this.target;
  this.collect_list();
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
  this.test =[];
  if (sum==1) {  this.test = (this.create_array("9","24258")) };  
  if (sum==0) {  this.test = (this.create_array("7","34")) };
  if (sum==2) {  this.test = (this.create_array("","patrol")) };
  if (sum==3) {  this.test = (this.create_array("","patrol_role_level_label")) };
  if (sum==4) {  this.test = (this.create_array("","age_years")) };
  this.labels = Object.keys(this.test)
  this.values = Object.values(this.test) 
  this.group_seg = sum;
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