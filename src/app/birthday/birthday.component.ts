
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
import { ScoutcardComponent } from '../scoutcard/scoutcard.component';
import { Globals } from '../globals';
import { LogonService } from '../logon.service';
import { PhotoURLService } from '../photoUrl';
import * as ons from 'onsenui';
@Component({
  selector: 'ons-page[birthday]',
  templateUrl: './birthday.component.html',
  styleUrls: ['./birthday.component.css']
})

export class BirthdayComponent implements OnInit {
  members = new Array;
  search_strings = new Array;
  search_match = new Array;
  matches = new Object;
  counter = 0;
  lastclick = "";
  namefilter = "";
  finditem = false;
  grid_list = 0;
  monthnames= ["January","February","March","April","May","June","July","August","September","October","November","December"];
  daynames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  constructor(
    private inj: Injector,
    private globals: Globals,
    private _navigator: OnsNavigator,
    private logonService: LogonService,
    private photoURL: PhotoURLService) { }

  
  monthname(date) {
    var d = new Date(date);
    return this.monthnames[d.getMonth()];
   //return parseInt(d.substring(5,7),10)-1;
  
  }

getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
  
nth(d) {
      if(d>3 && d<21) return 'th'; // thanks kennebec
      switch (d % 10) {
            case 1:  return "st";
            case 2:  return "nd";
            case 3:  return "rd";
            default: return "th";
        }
    } 

  subhead(date) {
    var d = new Date(date);
    var now2 = new Date();
    var d2 =  new Date(now2.getFullYear(),now2.getMonth(),now2.getDate());
    var d3 =  new Date(now2.getFullYear(),d.getMonth(),d.getDate());
    var year = now2.getFullYear();
    var ss = this.getAge(date)+" Next Birthday ";
    if (d3<d2) { year = year + 1;}
    var d4 = new Date(year,d.getMonth(),d.getDate());
    ss = ss + this.daynames[d4.getDay()] + " " +d.getDate()+this.nth(d.getDate())+" "+year;
    return ss;
  }
  
  section_has_roles() {
    if (this.globals.secret != "") {
      return this.globals.patrolroles.hasOwnProperty(this.globals.config[0][this.globals.mysection].section_type);
    } else { return false }
  }


  comparemonthValues(key, order = 'asc') {
    return function (a, b) {
      if (!a.hasOwnProperty(key) ||
        !b.hasOwnProperty(key)) {
        return 0;
      }

      const varA = (typeof a[key] === 'string') ?
        a[key].toUpperCase().substring(5,10) : a[key];
      const varB = (typeof b[key] === 'string') ?
        b[key].toUpperCase().substring(5,10) : b[key];
     
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
     
      return (
        (order == 'desc') ?
          (comparison * -1) : comparison
      );
    };
  }

  openMenu() {
    this.inj.get(AppComponent).menu.nativeElement.open();
  }

  no_matches(n) { return this.matches[n] }

  get_photo_url(member) {
    return this.photoURL.get_osmphoto_url(member);
  }

  go(event, member) {
    this._navigator.element.pushPage(ScoutcardComponent, { data: { index: member.member_id } });
  }
  
  ngOnInit() {
this.members = Object.keys(this.globals.sectiondata[1].data).map(i => this.globals.sectiondata[1].data[i]);
    this.members.sort(this.comparemonthValues("date_of_birth", "asc"))
    this.matches = this.members.reduce((acc, o) => (acc[o.first_name] = (acc[o.first_name] || 0) + 1, acc), {});
  
  }
}