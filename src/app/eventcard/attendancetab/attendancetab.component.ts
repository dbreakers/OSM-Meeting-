import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals';
import {  PhotoURLService } from '../../photoUrl';
import * as ons from 'onsenui';
import {DomSanitizer} from '@angular/platform-browser'

@Component({
  selector: 'ons-page[attendancetab]',
  templateUrl: './attendancetab.component.html',
  styleUrls: ['./attendancetab.component.css']
})
export class AttendancetabComponent implements OnInit {

  constructor(
    private sanitizer: DomSanitizer, 
    private globals: Globals,
    private photoURL: PhotoURLService) {  }
// members = new Array;
 cardTitle: string = 'Custom Card';
// member = "";
// member_image = "";
  
  

  

  

  ngOnInit() {
//    this.members =  Object.keys(this.globals.sectiondata[1].data).map(i => this.globals.sectiondata[1].data[i]);
 //   this.member = this.members.find(o => o.member_id === this.globals.scoutcard);
  //  this.cardTitle = this.member.first_name+" "+this.member.last_name;
   // this.member_image = this.get_photo_url(this.member);
 this.event = this.globals.event.find(f=>f.eventid==this.globals.eventcard)
   this.eventA = this.globals.eventA.find(f=>f.eventid==this.globals.eventcard)
  }

}