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

import {DomSanitizer} from '@angular/platform-browser'
import * as ons from 'onsenui';
import { AppComponent } from '../app.component';
import { Globals } from '../globals';
import {  PhotoURLService } from '../photoUrl';
@Component({
  selector: 'ons-page[scoutcard]',
  templateUrl: './scoutcard.component.html',
  styleUrls: ['./scoutcard.component.css']
})

export class ScoutcardComponent implements OnInit {
    members = new Array;
    member_index = -1;
    member_image = "";
    member = "";
    member_find="";
  constructor(
    private _params: Params, 
  private inj: Injector,
  private sanitizer: DomSanitizer,
    private globals: Globals,
    private photoURL: PhotoURLService
  ) { }

  cardTitle: string = 'Custom Card';

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
  


  find_member(f)
  { return f.member_id === this.member_find ;}
  
  ngOnInit() { 
     this.members =  Object.keys(this.globals.sectiondata[1].data).map(i => this.globals.sectiondata[1].data[i]);
    if (this._params.data && this._params.data.index){
      this.member_find = this._params.data.index;
      this.member = this.members.find(o => o.member_id === this._params.data.index);
      this.member_index = this.members.indexOf(this.member);
      this.cardTitle = this.member.first_name+" "+this.member.last_name;
      this.member_image = this.get_photo_url(this.member);
    }  
  }

  openMenu() {
    this.inj.get(AppComponent).menu.nativeElement.open();
  }
}