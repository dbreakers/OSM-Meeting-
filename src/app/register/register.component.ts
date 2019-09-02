
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
  target = "";
  counter = 0;
  lastclick=""
  regdate = ""
  regmeeting = ""
  weeks = [];
  monthnames= ["January","February","March","April","May","June","July","August","September","October","November","December"];

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

getmonth(t) { return new Date(t).getMonth()}
 
getnamefordate(target){
//this.generate_cal(target)
var targetd = new Date(target).toISOString()
                    .split("T")[0];;
//var target2 = targetd.getFullYear() +"-"+ (targetd.getMonth()+1) +"-"+targetd.getDate();
  var e = this.globals.eventA.find(i=>i.startdate==targetd)
  
  var p = this.globals.sectiondata[4].items.find(i=>i.meetingdate==targetd)
  if (e!=undefined){return e.name}
    if (p!=undefined){return p.title}
  return 'Not a meeting or Event'

}

generate_cal2(t) {
   var i = document.getElementById("targetdate");
   this.target = new Date(i.value) 
 if (this.target!="Invalid Date"){  
this.generate_cal(this.target);
 }
}
generate_cal(date){
  var days = new Array;
  this.weeks = [];
  var c = new Date(date);
  var caldate = new Date(c.getFullYear(),c.getMonth(),1,12,0,0)
  while (caldate.getDay()!=1) {
    caldate.setDate(caldate.getDate() - 1);
  }   
  var caldate2 = new Date(c.getFullYear(),c.getMonth()+1,0,12,0,0)
  while (caldate2.getDay()!=0) {
    caldate2.setDate(caldate2.getDate() + 1);
  }
 var loop = caldate;
 while (loop<=caldate2){
   if (loop.getDay()==1)
   {
     days=[];
   }
   var d = new Object;
   d.date = new Date(loop)
   days.push(d);
   if (loop.getDay()==0)
   {
     this.weeks.push(days)
   }
   loop.setDate(loop.getDate() + 1);
 }
}

set_target(d) {
  this.target =  d.toISOString()
                    .split("T")[0];;;
  //this.generate_cal(this.target) 
  var input = document.getElementById("targetdate")
  input.value = this.target;
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
  var nowdate = new Date
  
  this.target =  nowdate.toISOString()
                    .split("T")[0];;;
  this.generate_cal(this.target) 
  var input = document.getElementById("targetdate")
  input.value = this.target;
  if (!this._params) {
     document.getElementById('dialog').show();
  }  
    this.members =  Object.keys(this.globals.sectiondata[1].data).map(i => this.globals.sectiondata[1].data[i]);
     this.members.sort(this.compareValuesArray(["patrol","patrol_role_level","age_years","age_months"],"desc"))
     this.matches = this.members.reduce( (acc, o) => (acc[o.first_name] = (acc[o.first_name] || 0)+1, acc), {} );
  }
}
