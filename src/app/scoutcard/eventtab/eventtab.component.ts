import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals';
import {  PhotoURLService } from '../../photoUrl';
import * as ons from 'onsenui';

@Component({
  selector: 'ons-page[persontab]',
  templateUrl: './eventtab.component.html',
  styleUrls: ['./eventtab.component.css']
})
export class EventtabComponent implements OnInit {

  constructor( 
    private globals: Globals,
    private photoURL: PhotoURLService) {  }
 members = new Array;
 cardTitle: string = 'Custom Card';
 member = "";
 member_image = "";
 events_list =  new Array;
  
  get_photo_url(member) {
   return this.photoURL.get_osmphoto_url(member);
  }


  ngOnInit() {
 this.members =  Object.keys(this.globals.sectiondata[1].data).map(i => this.globals.sectiondata[1].data[i]);
    this.member = this.members.find(o => o.member_id === this.globals.scoutcard);
    this.cardTitle = this.member.first_name+" "+this.member.last_name;
    this.member_image = this.get_photo_url(this.member);
for ( var i = 0; i < this.globals.eventA.length; i++ ) {
          var event = this.globals.event.find(f=>f.eventid==this.globals.eventA[i].eventid);
          var ev = new Object;
          var att = event.items.find(g=>g.scoutid==this.globals.scoutcard);
          ev.name = this.globals.eventA[i].name;
          ev.eventid = event.eventid;
          if (att!=undefined){
          ev.attending = att.attending;} else {ev.attending = "No"}
          this.events_list.push(ev);
      }


  }

}