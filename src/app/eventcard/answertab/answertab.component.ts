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
 selectedModifier="";
 eventA : object;
 attendees = new Array;
 members = new Array;
 test = new Array;
  labels = new Array;
   values = new Array;
 sum  = 0;
 //members = new Array;
// member_image = "";





create_array(field)
{
  
    return this.attendees.reduce((acc, o) => (acc[o[field].trim()] = (acc[o[field].trim()] || 0) + 1, acc), {});
}


collect_list() {
  this.attendees = []
  //this.target = document.getElementById("incl").checked;
  for ( var i = 0; i < this.event.items.length; i++ ) {
   if (this.event.items[i].attending == "Yes") {
      this.attendees.push(this.event.items[i]);      
      }
   }
  }
   

editSelects(e)
{ 
 this.sum = document.getElementById('selectfield').value;
 this.test = this.create_array(this.eventA.structure[1].rows[this.sum].field)
  this.labels = Object.keys(this.test)
  this.values = Object.values(this.test)
  return 1}

  ngOnInit() {
//    this.members =  Object.keys(this.globals.sectiondata[1].data).map(i => this.globals.sectiondata[1].data[i]);
 //   this.member = this.members.find(o => o.member_id === this.globals.scoutcard);
  //  this.cardTitle = this.member.first_name+" "+this.member.last_name;
   // this.member_image = this.get_photo_url(this.member);
 this.event = this.globals.event.find(f=>f.eventid==this.globals.eventcard)
 this.eventA = this.globals.eventA.find(f=>f.eventid==this.globals.eventcard)
 this.event.items.sort(this.sorting.compareValuesArray(["lastname"],"asc"))
 this.members = Object.keys(this.globals.sectiondata[1].data).map(i => this.globals.sectiondata[1].data[i]);
 //this.collect_list();
 this.collect_list();
 this.test = this.create_array(this.eventA.structure[1].rows[0].field)
  this.labels = Object.keys(this.test)
  this.values = Object.values(this.test) 
  }

}