import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals';
import {  PhotoURLService } from '../../photoUrl';
import * as ons from 'onsenui';
import {DomSanitizer} from '@angular/platform-browser'

@Component({
  selector: 'ons-page[persontab]',
  templateUrl: './persontab.component.html',
  styleUrls: ['./persontab.component.css']
})
export class PersontabComponent implements OnInit {

  constructor(
    private sanitizer: DomSanitizer, 
    private globals: Globals,
    private photoURL: PhotoURLService) {  }
 members = new Array;
 cardTitle: string = 'Custom Card';
 member = "";
 member_image = "";
  
  get_photo_url(member) {
   return this.photoURL.get_osmphoto_url(member);
  }

  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
}

  callprompt(number) {
  
    ons.notification.confirm({
      message: 'Contact '+number+' using',
      title: 'Make a call',
      cancelable: true,
      buttonLabels: ['<ons-icon icon="fa-whatsapp" style="color: green"></ons-icon>&nbsp;WhatsApp','<ons-icon icon="fa-comment-dots" style="color: #03a9f4"></ons-icon>&nbsp;SMS','<ons-icon icon="fa-phone" style="color: black"></ons-icon>&nbsp;Call'],
      callback: answer => {
        if (answer == '0') {
           window.open("intent://send/+"+number+"#Intent;scheme=smsto;package=com.whatsapp;action=android.intent.action.SENDTO;end", "_top");
          //ons.notification.alert({message: 'That\'s the correct answer for WhatsApp!'+answer});
        } else if  (answer == '1') {
           window.open("sms://+"+number, "_top");
      //     window.open("mailto:david.breakwell@gmail.com", "_top");
       //   ons.notification.alert({message: 'Incorrect! Please try again!'+answer});
        } else if  (answer == '2') {
           window.open("tel://"+number, "_top");
        }
      }
    });
  }

  ngOnInit() {
    this.members =  Object.keys(this.globals.sectiondata[1].data).map(i => this.globals.sectiondata[1].data[i]);
    this.member = this.members.find(o => o.member_id === this.globals.scoutcard);
    this.cardTitle = this.member.first_name+" "+this.member.last_name;
    this.member_image = this.get_photo_url(this.member);
  }

}