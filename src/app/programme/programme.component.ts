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

import { AppComponent } from '../app.component';
import { Globals } from '../globals';
import {  DateformatService } from '../dateformatter';
import * as ons from 'onsenui';
import {  Sortservice } from '../sort';
import { EventcardComponent } from '../eventcard/eventcard.component';

@Component({
  selector: 'ons-page[programme]',
  templateUrl: './programme.component.html',
  styleUrls: ['./programme.component.css']
})

export class ProgrammeComponent implements OnInit {

 
constructor(
    private inj: Injector,
    private globals: Globals,
    private sorting: Sortservice,
    private _navigator: OnsNavigator,
    private dateFormat: DateformatService) { }

 openMenu() {
    this.inj.get(AppComponent).menu.nativeElement.open();
  }




eventdates(s,e) {
  var subtitle = "";
  if (e=="1970-01-01"){ e=null}
 // if (e!=null) { subtitle = "From "; }
  subtitle = subtitle + this.dateFormat.date_format_date(s,false);
  if (e!=null) {
    subtitle = subtitle + " - ";
    subtitle = subtitle + this.dateFormat.date_format_date(e,false);
    subtitle = subtitle + " (" + this.dateFormat.date_format_days_between(s,e)+" day";
    if (this.dateFormat.date_format_days_between(s,e)>1) {subtitle=subtitle+"s"}
    subtitle = subtitle + ")"; 
  }
  return subtitle
}

go(e,event){
   this._navigator.element.pushPage(EventcardComponent, { data: { index: event.eventid } });
}

ngOnInit() {
  this.globals.eventA.sort(this.sorting.compareValuesArray(["startdate"],"desc"))

}
}