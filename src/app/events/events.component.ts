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
constructor(
    private inj: Injector,
    private globals: Globals,
    private _navigator: OnsNavigator) { }

ngOnInit() {
}
}