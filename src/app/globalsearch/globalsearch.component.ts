
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
  selector: 'ons-page[globalsearch]',
  templateUrl: './globalsearch.component.html',
  styleUrls: ['./globalsearch.component.css']
})

export class GlobalsearchComponent implements OnInit {
  members = new Array;
  search_strings = new Array;
  search_match = new Array;
  matches = new Object;
  counter = 0;
  lastclick = "";
  namefilter = "";
  finditem = false;
  grid_list = 0;
  constructor(
    private inj: Injector,
    private globals: Globals,
    private _navigator: OnsNavigator,
    private logonService: LogonService,
    private photoURL: PhotoURLService) { }

   grid_list_toggle() {
     if (this.grid_list==1) {this.grid_list = 0;} else {this.grid_list = 1;} 
   }
  update_search(event) {
    //alert(event);
    //var v = document.getElementById("339550");
    //v.classList.add("hidden");
    //v.classList.remove("show");
 
    for (var i = 0; i < this.members.length; i++) {
      var v = document.getElementById(this.members[i].member_id);

      if (this.searchObj(this.members[i])) {
        if (this.grid_list==0){
        v.classList.add("show"); 
        v.classList.remove("hidden");
        }  else {
  v.classList.add("show2"); 
        v.classList.remove("hidden2");
        } 
      } else {
        if (this.grid_list==0){
         v.classList.add("hidden"); 
        v.classList.remove("show");
        
      } else {
v.classList.add("hidden2"); 
        v.classList.remove("show2");
        
      }
    }
 }
  }

  searchObj(member) {
    //console.log("search " + member.first_name);
    this.search_strings = this.namefilter.split(" ");
    this.search_match.length = this.search_strings.length;
    this.search_match.fill(false,0,this.search_strings.length);
    this.finditem = true;
    //var o = new Object;
    //o = member;
    this.searchMember(member);
    for (var fs=0; fs< this.search_strings.length; fs++ ) {
      if (this.search_match[fs]==false){
     this.finditem =  false;
    }
    }
    return this.finditem;
  }

  searchMember(member) {

    for (var key in member) {
      var value = member[key];

      if (typeof value === 'object') {
        this.searchMember(value);
      } else {
        if (value != null) {
          if (typeof value === 'string') {
            for (var fs=0; fs< this.search_strings.length; fs++ )
            {
            //if (value.toUpperCase().indexOf(this.namefilter.toUpperCase()) != -1) {
              
             // this.finditem = true;
           // }
              if (value.toUpperCase().indexOf(this.search_strings[fs].toUpperCase()) != -1) {
                this.search_match[fs] = true;
              }
            }
          }
        }
      }
    }
  }


  section_has_roles() {
    if (this.globals.secret != "") {
      return this.globals.patrolroles.hasOwnProperty(this.globals.config[0][this.globals.mysection].section_type);
    } else { return false }
  }

  compareValuesArray(key, order = 'asc') {
    return function (a, b) {
      var compare = 0;
      for (var i = 0; i < key.length; i++) {
        if (!a.hasOwnProperty(key[i]) ||
          !b.hasOwnProperty(key[i])) {
          return 0;
        }
        if (compare == 0) {
          const varA = (typeof a[key[i]] === 'string') ?
            a[key[i]].toUpperCase() : a[key[i]];
          const varB = (typeof b[key[i]] === 'string') ?
            b[key[i]].toUpperCase() : b[key[i]];


          if (varA > varB) {
            compare = 1;
          } else if (varA < varB) {
            compare = -1;
          }
          if (compare != 0) {
            return (
              (order == 'desc') ?
                (compare * -1) : compare
            );
          }

        }
      }
      return (
        (order == 'desc') ?
          (compare * -1) : compare
      );
    }
  }

  compareValues(key, order = 'asc') {
    return function (a, b) {
      if (!a.hasOwnProperty(key) ||
        !b.hasOwnProperty(key)) {
        return 0;
      }

      const varA = (typeof a[key] === 'string') ?
        a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ?
        b[key].toUpperCase() : b[key];

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

//    if (!(event.currentTarget.classList.contains("selected"))) {
//      event.currentTarget.classList.add("selected");
//      event.currentTarget.classList.add("pulse");
//      this.counter = this.counter + 1;
//      this.lastclick = member.first_name + " " + member.last_name;
//     this._navigator.element.pushPage(ScoutcardComponent, { data: { index: member.member_id } });

 //   } else {
 //     event.currentTarget.classList.remove("selected");
 //     event.currentTarget.classList.remove("pulse");
 //     this.counter = this.counter - 1;
 //     this.lastclick = "";
 //   }
  }
  section_data_return(data) {
    this.globals.sectiondata = data;
    this.members = Object.keys(this.globals.sectiondata[1].data).map(i => this.globals.sectiondata[1].data[i]);
    this.members.sort(this.compareValuesArray(["patrol", "patrol_role_level", "age_years", "age_months"], "desc"))
    this.matches = this.members.reduce((acc, o) => (acc[o.first_name] = (acc[o.first_name] || 0) + 1, acc), {});
  }
  ngOnInit() {
this.members = Object.keys(this.globals.sectiondata[1].data).map(i => this.globals.sectiondata[1].data[i]);
    this.members.sort(this.compareValuesArray(["patrol", "patrol_role_level", "age_years", "age_months"], "desc"))
    this.matches = this.members.reduce((acc, o) => (acc[o.first_name] = (acc[o.first_name] || 0) + 1, acc), {});
    this.grid_list = 1;
  }
}
