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
import * as ons from 'onsenui';

@Component({
  selector: 'ons-page[events]',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})

export class EventsComponent implements OnInit {

 monthnames= ["January","February","March","April","May","June","July","August","September","October","November","December"];
 daynames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

constructor(
    private inj: Injector,
    private globals: Globals,
    private _navigator: OnsNavigator) { }

 openMenu() {
    this.inj.get(AppComponent).menu.nativeElement.open();
  }

eventdates(s,e) {
  var subtitle = "";
  if (e!=null) { subtitle = "From"; }

  if (e!=null) {
    subtitle = subtitle + " until ";
    subtitle = subtitle + "(" + "days)";
  }
  return subtitle
}

ngOnInit() {
}
}