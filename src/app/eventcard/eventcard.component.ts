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
import { AttendancetabComponent } from './attendancetab/attendancetab.component';
import { SummarytabComponent } from './summarytab/summarytab.component';


@Component({
  selector: 'ons-page[scoutcard]',
  templateUrl: './eventcard.component.html',
  styleUrls: ['./eventcard.component.css']
})

export class EventcardComponent implements OnInit {
    members = new Array;
    member_index = -1;
    member_image = "";
    member = "";
    member_find="";
    events_list =  new Array;
    summarytab = SummarytabComponent;
    attendancetab = AttendancetabComponent;
  constructor(
    private _params: Params, 
    private _navigator: OnsNavigator,
  private inj: Injector,
  private sanitizer: DomSanitizer,
    private globals: Globals,
    private photoURL: PhotoURLService
  ) { }

  cardTitle: string = 'Custom Card';





open(n) {
  this._navigator.element.pushPage(n);
}


  


  
  ngOnInit() { 
    if (this._params.data && this._params.data.index){
      this.globals.eventcard = this._params.data.index;
       this.event = this.globals.eventA.find(f=>f.eventid==this.globals.eventcard)
    }
 }  
  

  openMenu() {
    this.inj.get(AppComponent).menu.nativeElement.open();
  }
}