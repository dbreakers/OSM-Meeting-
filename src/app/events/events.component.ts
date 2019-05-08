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

 
constructor(
    private inj: Injector,
    private globals: Globals,
    private _navigator: OnsNavigator,
    private dateFormat: DateformatService) { }

 openMenu() {
    this.inj.get(AppComponent).menu.nativeElement.open();
  }

event_option(eventid,s){
 var list = this.globals.event.find(f=>f.eventid==eventid);
 var count = 0;
 for ( var i = 0; i < list.items.length; i++ ) {
   if (list.items[i].attending == s)
   { count++; }
 }
 return count;
}

event_class(eventid){
  var el = this.event_limit(eventid);
  var c= this.event_option(eventid,"Yes");
  if (el==0) {return "blue" } else
  {
    var p = c/el;
    if (p<=0.5) {return "green"}
    if (p>0.5&&p<0.75) {return "amber"}
    
    if (p>=0.75) {return "red"}
  }
}

event_limit(eventid){
  var event = this.globals.eventA.find(f=>f.eventid==eventid)
  if (event.hasOwnProperty("attendancelimit")) {
    return event.attendancelimit
  } else return 0
}

eventdates(s,e) {
  var subtitle = "";
  if (e=="1970-01-01"){ e=null}
 // if (e!=null) { subtitle = "From "; }
  subtitle = subtitle + this.dateFormat.date_format_date(s,false);
  if (e!=null) {
    subtitle = subtitle + " - ";
    subtitle = subtitle + this.dateFormat.date_format_date(e,false);
    subtitle = subtitle + " (" + this.dateFormat.date_format_days_between(s,e)+" days)";
  }
  return subtitle
}

ngOnInit() {
}
}