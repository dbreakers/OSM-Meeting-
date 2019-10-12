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

import { AppComponent } from "../app.component";
import { Globals } from "../globals";
import { DateformatService } from "../dateformatter";
import * as ons from "onsenui";
import { Sortservice } from "../sort";
import { EventcardComponent } from "../eventcard/eventcard.component";

@Component({
  selector: "ons-page[events]",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.css"]
})
export class EventsComponent implements OnInit {
  constructor(
    private inj: Injector,
    private globals: Globals,
    private sorting: Sortservice,
    private _navigator: OnsNavigator,
    private dateFormat: DateformatService
  ) {}

  openMenu() {
    this.inj.get(AppComponent).menu.nativeElement.open();
  }

  event_option(eventid, s) {
    var list = this.globals.event.find(f => f.eventid == eventid);
    var evt = this.globals.eventA.find(f => f.eventid == eventid);
    var share = this.globals.eventS.find(f => f.event == eventid);
    var count = 0;
    for (var i = 0; i < list.items.length; i++) {
      if (list.items[i].attending == s)
        if (
          evt.limitincludesleaders == 1 ||
          (evt.limitincludesleaders == 0 && list.items[i].patrolid != -2)
        ) {
          count++;
        }
    }
    for (var i = 0; i < share.items.length; i++) {
      if (share.items[i].sectionid != this.globals.mysection) {
        if (
          evt.limitincludesleaders == 1 ||
          (evt.limitincludesleaders == 0 && share.items[i].patrolid != -2)
        ) {
          count++;
        }
      }
    }
    return count;
  }

  is_shared(event) {
    /* if (event.extra!="") { 
 return  JSON.parse(event.extra).hasOwnProperty('sharing')
 } else 
 {return false} */
    var f = this.globals.eventSS.find(e => e.event == event.eventid);
    return f.items.length - 1 > 1;
  }

  event_option2(eventid, s, l) {
    var list = this.globals.event.find(f => f.eventid == eventid);
    var evt = this.globals.eventA.find(f => f.eventid == eventid);
    var share = this.globals.eventS.find(f => f.event == eventid);
    var count = 0;
    for (var i = 0; i < list.items.length; i++) {
      if (list.items[i].attending == s) {
        if (l == 0 && list.items[i].patrolid != -2) {
          count++;
        }
        if (l == 1 && list.items[i].patrolid == -2) {
          count++;
        }
      }
    }
    

    if ("Yes" == s) {
      for (var i = 0; i < share.items.length; i++) {
        if (share.items[i].sectionid != this.globals.mysection) {
          if (l == 0 && share.items[i].patrolid != -2) {
            count++;
          }
          if (l == 1 && share.items[i].patrolid == -2) {
            count++;
          }
        }
      }
    }
    return count;
  }

  event_class(eventid) {
    var el = this.event_limit(eventid);
    var c = this.event_option(eventid, "Yes");
    if (el == 0) {
      return "blue";
    } else {
      var p = c / el;
      if (p <= 0.5) {
        return "green";
      }
      if (p > 0.5 && p < 0.75) {
        return "amber";
      }

      if (p >= 0.75) {
        return "red";
      }
    }
  }

  event_limit(eventid) {
    var event = this.globals.eventA.find(f => f.eventid == eventid);
    if (event.hasOwnProperty("attendancelimit")) {
      return event.attendancelimit;
    } else return 0;
  }

  event_limit_inc(eventid) {
    var event = this.globals.eventA.find(f => f.eventid == eventid);
    if (event.hasOwnProperty("limitincludesleaders")) {
      return event.limitincludesleaders;
    } else return 0;
  }

  signup(date) {
    var d = new Date(date);
    var now2 = new Date();
    var d2 = new Date(now2.getFullYear(), now2.getMonth(), now2.getDate());
    var diff = (d.getTime() - d2.getTime()) / 1000;
    diff /= 60 * 60 * 24;
    // return Math.abs(Math.round(diff));
    return Math.round(diff);
  }

  eventdates(s, e) {
    var subtitle = "";
    if (e == "1970-01-01") {
      e = null;
    }
    // if (e!=null) { subtitle = "From "; }
    subtitle = subtitle + this.dateFormat.date_format_date(s, false);
    if (e != null) {
      subtitle = subtitle + " - ";
      subtitle = subtitle + this.dateFormat.date_format_date(e, false);
      subtitle =
        subtitle +
        " (" +
        this.dateFormat.date_format_days_between(s, e) +
        " day";
      if (this.dateFormat.date_format_days_between(s, e) > 1) {
        subtitle = subtitle + "s";
      }
      subtitle = subtitle + ")";
    }
    return subtitle;
  }

  go(e, event) {
    this._navigator.element.pushPage(EventcardComponent, {
      data: { index: event.eventid }
    });
  }

  ngOnInit() {
    this.globals.eventA.sort(
      this.sorting.compareValuesArray(["startdate"], "desc")
    );
  }
}
