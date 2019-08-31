
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
import {  PhotoURLService } from '../photoUrl';
import * as ons from 'onsenui';
@Component({
  selector: 'ons-page[settings]',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  members = new Array;
  matches =  new Object;
  counter = 0.
  lastclick=""
  regdate = ""
  regmeeting = ""
  constructor(
    private inj: Injector,
    private globals: Globals,
    private _navigator: OnsNavigator,
    private logonService: LogonService,
    private photoURL: PhotoURLService) { }

section_has_roles()
{
  if (this.globals.secret!=""){
  return this.globals.patrolroles.hasOwnProperty(this.globals.config[0][this.globals.mysection].section_type);
  } else 
  { return false}
}

select_section()
{
var scouts =  document.getElementsByClassName("pulse");
//for (var i = 0; i < scouts.length; i++) {console.log(scouts[i].id)}
}

compareValuesArray(key, order='asc') {
   return function(a, b) {
  var compare = 0;
  for (var i=0; i<key.length; i++)
  {
     if(!a.hasOwnProperty(key[i]) || 
       !b.hasOwnProperty(key[i])) {
  	  return 0; 
    }
    if (compare==0){
    const varA = (typeof a[key[i]] === 'string') ? 
      a[key[i]].toUpperCase() : a[key[i]];
    const varB = (typeof b[key[i]] === 'string') ? 
      b[key[i]].toUpperCase() : b[key[i]];
      
    
    if (varA > varB) {
      compare = 1;
    } else if (varA < varB) {
      compare = -1;
    }
    if (compare!=0)
    {
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

compareValues(key, order='asc') {
  return function(a, b) {
    if(!a.hasOwnProperty(key) || 
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

  no_matches(n)
  { return this.matches[n]}

  get_photo_url(member) {
   return this.photoURL.get_osmphoto_url(member);
  }

  go(event,member) {
    if (!(event.currentTarget.classList.contains("selected")))
    {
    event.currentTarget.classList.add("selected");
    event.currentTarget.classList.add("pulse");
    this.counter = this.counter +1;
    this.lastclick = member.first_name + " " + member.last_name;
    // this._navigator.element.pushPage(ScoutcardComponent, { data: { index: member.member_id } });

    } else
    {
      event.currentTarget.classList.remove("selected");
      event.currentTarget.classList.remove("pulse");
      this.counter = this.counter-1; 
      this.lastclick="";
      }
  }
 
  ngOnInit() {
    if (this._params) {
    if (this._params.data && this._params.data.date){
      regdate = this._params.data.date
    }
    if (this._params.data && this._params.data.meeting){
      regmeeting = this._params.data.meeting
    }
  }
    this.members =  Object.keys(this.globals.sectiondata[1].data).map(i => this.globals.sectiondata[1].data[i]);
     this.members.sort(this.compareValuesArray(["patrol","patrol_role_level","age_years","age_months"],"desc"))
     this.matches = this.members.reduce( (acc, o) => (acc[o.first_name] = (acc[o.first_name] || 0)+1, acc), {} );
  }
}
