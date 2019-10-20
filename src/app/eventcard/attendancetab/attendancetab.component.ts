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
 
 event : object;
 eventA: object;
 sharedA = new Object;
 sharedS = new Object;
 
 attendees = new Array;
 members = new Array;
 test = new Array;
 labels = new Array;
 values = new Array;

 group_label = ["Gender","Swim 50m","Patrol","Role","Age"];
 group_seg = 1;
 target: boolean = false;
 notamember = 0;
 att_list = 0;
 shar = new Object;
 shared = 0;
 sharee = false;
 li = new Object;
 //list= [];
 //members = new Array;
// member_image = "";



getDetailAge(d) {
var m = this.members.find(o => o.member_id == d.scoutid);
if (m!=undefined){
 return "Age at Event:" + this.dateFormat.getDetailAge(new Date(m.date_of_birth),new Date(this.eventA.startdate)); } else { return "Not a member" }
//  this.dateFormat.get
}
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

get_count_att(l){
   var count = 0;
 for ( var i = 0; i < this.event.items.length; i++ ) {
   if (this.event.items[i].attending == "Yes"  ) {
     
     if((this.event.items[i].patrolid==-2&&(l==true)))
        { count++; }
     if((this.event.items[i].patrolid>-1&&(l==false)))
        { count++; }    
   }
 }
 for (var i = 0; i < this.sharedA.items.length; i++) {
        if (this.sharedA.items[i].sectionid != this.globals.mysection) {
          if (l != true && this.sharedA.items[i].patrolid != -2) {
            count++;
          }
          if (l == true && this.sharedA.items[i].patrolid == -2) {
            count++;
          }
        }
      }
 return count;
//
}


get_count(l){
   var count = 0;
 for ( var i = 0; i < this.event.items.length; i++ ) {
   if ((this.event.items[i].attending == "Yes" && this.att_list==0 )||(this.event.items[i].attending == "No" && this.att_list==1 )||((this.event.items[i].attending == "Invited" ||(this.event.items[i].attending == "Show in Parent Portal")) && this.att_list==2 )) {
     
     if((this.event.items[i].patrolid==-2&&(l==true)))
        { count++; }
     if((this.event.items[i].patrolid>-1&&(l==false)))
        { count++; }    
   }
 }
 return count;
//
}

get_no(l){
   var count = 0;
 for ( var i = 0; i < this.event.items.length; i++ ) {
   if ((this.event.items[i].attending == "No")) {
     if((this.event.items[i].patrolid==-2&&(l==true)))
        { count++; }
     if((this.event.items[i].patrolid>-1&&(l==false)))
        { count++; }    
   }
 }
 return count;
//
}

get_undecided(l){
   var count = 0;
 for ( var i = 0; i < this.event.items.length; i++ ) {
   if ((this.event.items[i].attending == "Invited")||(this.event.items[i].attending == "Show in Parent Portal")) {
     if((this.event.items[i].patrolid==-2&&(l==true)))
        { count++; }
     if((this.event.items[i].patrolid>-1&&(l==false)))
        { count++; }    
   }
 }
 return count;
//
}

update_att(a){this.att_list=a }

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
  this.attendees = []
  this.notamember = 0;
  //this.target = document.getElementById("incl").checked;
  for ( var i = 0; i < this.event.items.length; i++ ) {
   if (this.event.items[i].attending == "Yes") {
     var m = this.members.find(o => o.member_id == this.event.items[i].scoutid);
     if ((m != undefined)){
     if ((this.target)||(!this.target&&m.patrol_id>-1)){
      this.attendees.push(this.members.find(o => o.member_id == this.event.items[i].scoutid));      
      if (this.attendees[this.attendees.length-1].age_years >=18) {this.attendees[this.attendees.length-1].age_years="18+";}
    }
     }  else { this.notamember += 1}
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
  if ( document.getElementById('segment_summary')!=null){
  var sum = document.getElementById('segment_summary').getActiveButtonIndex();
  } else {sum = 0;}
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
 
 this.event = this.globals.event.find(f=>f.eventid==this.globals.eventcard)
 this.eventA = this.globals.eventA.find(f=>f.eventid==this.globals.eventcard)
 this.event.items.sort(this.sorting.compareValuesArray(["lastname"],"asc"))
 this.members = Object.keys(this.globals.sectiondata[1].data).map(i => this.globals.sectiondata[1].data[i]);
 this.collect_list();
 this.sharedA  = this.globals.eventS.find(e=>e.event==this.globals.eventcard)
 this.sharedS = this.globals.eventSS.find(e=>e.event==this.globals.eventcard)
 this.shared = 0;
 this.sharee = false;
 this.shar = {};
 if (this.eventA.extra!="") { 
       this.shar =  JSON.parse(this.eventA.extra)
 }      
  if (this.sharedS.hasOwnProperty('items')){
    this.shared =  this.sharedS.items.length - 1;
    }
  if (this.shar.hasOwnProperty('sharing')) {
       if (this.shar.sharing.hasOwnProperty('sharee')) {
       this.sharee = true 
        }
    }

  this.li.total_leaders_mysec = 0;
  this.li.total_members_mysec = 0;
  this.li.total_leaders_othersec = 0;
  this.li.total_members_othersec = 0;
  this.li.maxplaces = 0;
  this.li.maxplaces_incldr = false;
  this.li.maxplaces_share = 0;
  this.li.maxplaces_incldr_share = false;
  this.li.remain = 0;
  
  if(this.shared>1) {
    for (var j = 0; j < this.sharedA.items.length; j++) {
      var isldr = (this.sharedA.items[j].patrolid == -2)
      var ismy = (this.sharedA.items[j].sectionid == this.globals.mysection) 
      if (isldr) {
          ismy ?  this.li.total_leaders_mysec++ : this.li.total_leaders_othersec++;
      } else {
          ismy ?  this.li.total_members_mysec++ : this.li.total_members_othersec++;  
      } 

    }
    if (this.eventA.hasOwnProperty("attendancelimit")) {
      this.li.maxplaces = this.eventA.attendancelimit;
    }
    if (this.shar.sharing.limit>0)  
        {this.li.maxplaces_share = this.shar.sharing.limit}
    
    if (this.eventA.hasOwnProperty("attendancelimit")) {
      this.li.maxplaces = this.eventA.attendancelimit;
    }
    if (this.li.maxplaces>this.li.maxplaces_share)
    {this.li.maxplaces = this.li.maxplaces_share}
    //this.li.maxplaces_incldr_share = this.shar.sharing.limitleaders

  } else {
  // Not Shared (so Sharee or nothing)   
   for (var j = 0; j < this.event.items.length; j++) {
      if (this.event.items[j].attending == "Yes") {
        if (this.event.items[j].patrolid != -2) {
          this.li.total_members_mysec++
        } else { this.li.total_leaders_mysec++ }
        
      }
    }
    if (this.eventA.hasOwnProperty("attendancelimit")) {
      this.li.maxplaces = this.eventA.attendancelimit;
    }
    if (this.sharee) {
       
      this.li.maxplaces_share = this.eventA._shared_event_overall_limit;
      this.li.maxplaces_incldr_share = this.shar.sharing.limitleaders
        
    }
  }  
}

}