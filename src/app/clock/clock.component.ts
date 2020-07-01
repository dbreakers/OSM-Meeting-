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
} from "ngx-onsenui";

import { Globals } from "../globals";

@Component({
  selector: "clock",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.css"]
})

export class ClockComponent implements OnInit {
  constructor(
    private inj: Injector,
    private globals: Globals,
    private _navigator: OnsNavigator,
  ) {}

  time = new Date();

  
 ngOnInit() {
 setInterval(() => {
       this.time = new Date();
    }, 1000);
 }
}