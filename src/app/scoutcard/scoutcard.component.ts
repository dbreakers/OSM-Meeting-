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
import { PersontabComponent } from './persontab/persontab.component';
import { EventtabComponent } from './eventtab/eventtab.component';


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
    events_list =  new Array;
    persontab = PersontabComponent;
    eventtab = EventtabComponent;
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
     this.members =  Object.keys(this.globals.sectiondata[1].data).map(i => this.globals.sectiondata[1].data[i]);
    if (this._params.data && this._params.data.index){
      this.globals.scoutcard = this._params.data.index;
    }
 }  
  

  openMenu() {
    this.inj.get(AppComponent).menu.nativeElement.open();
  }
}