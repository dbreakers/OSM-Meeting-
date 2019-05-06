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

@Component({
  selector: 'ons-page[events]',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})

export class EventsComponent implements OnInit {

 monthnames= ["January","February","March","April","May","June","July","August","September","October","November","December"];
 daynames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
 smonthnames= ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"];
 sdaynames = ["Sun","Mon","Tues","Wed","Thurs","Fri","Sat"]
constructor(
    private inj: Injector,
    private globals: Globals,
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
    subtitle = subtitle + " until ";
    subtitle = subtitle + this.dateFormat.date_format_date(e,false);
    subtitle = subtitle + " (" + this.dateFormat.date_format_days_between(s,e)+" days)";
  }
  return subtitle
}

ngOnInit() {
}
}