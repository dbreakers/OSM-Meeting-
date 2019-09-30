
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

import { TermpickerComponent } from '../termpicker/termpicker.component';
import { MedicalComponent } from '../medical/medical.component';
import { ProgrammeComponent } from '../programme/programme.component';
import {GlobalsearchComponent} from '../globalsearch/globalsearch.component';
import {EventsComponent} from '../events/events.component';
import {RostaComponent} from '../rosta/rosta.component';
import {LastcheckedComponent} from '../lastchecked/lastchecked.component';
import { AppComponent } from '../app.component';
import { ScoutcardComponent } from '../scoutcard/scoutcard.component';
import {RegisterComponent } from '../register/register.component';
import {SectionselectComponent} from '../sectionselect/sectionselect.component';
import {LeaderrostaComponent} from '../leaderrosta/leaderrosta.component';
import {BirthdayComponent} from '../birthday/birthday.component';
import { Globals } from '../globals';
import { LogonService } from '../logon.service';
import { PhotoURLService } from '../photoUrl';
import * as ons from 'onsenui';


@Component({
  selector: 'ons-page[settings]',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  access = "";
  members = new Array;
  matches =  new Object;
  counter = 0.
  lastclick=""
  lastcheck = LastcheckedComponent;
  termselect =  TermpickerComponent;
  register = RegisterComponent;
  program =ProgrammeComponent;
  medical = MedicalComponent;
  events = EventsComponent;
  rosta = RostaComponent;
  globalsearch = GlobalsearchComponent;
  sectionselect = SectionselectComponent;
  birthday = BirthdayComponent;
  leaderrosta = LeaderrostaComponent;
  @ViewChild('navi') private navi: OnsNavigator;

  constructor(
    private inj: Injector,
    private globals: Globals,
    private _navigator: OnsNavigator,
    private logonService: LogonService,
    private photoURL: PhotoURLService) { }


loadPage(page) {
   
  //  this.menu.nativeElement.close();
  //  this.navi.nativeElement.resetToPage(page, { animation: 'fade' });
   this._navigator.element.pushPage(page, { animation: 'fade' });
  }

section_has_roles()
{
  if (this.globals.secret!=""){
  return this.globals.patrolroles.hasOwnProperty(this.globals.config[0][this.globals.mysection].section_type);
  } else 
  { return false}
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

do_events(e){
  this.globals.event = e;
  this.globals.loaded.eventsL = true;
if ( this.globals.loaded.eventsA   ) {this.globals.loaded.events = true}
}

do_eventsA(e){
  this.globals.eventA = e;
  this.globals.loaded.eventsA = true;
  if ( this.globals.loaded.eventsL ) {this.globals.loaded.events = true}
}

do_progs(p)
{
  this.globals.progs = p;
  this.globals.loadprogs=true;
  this.globals.loaded.progs = true;
 


}

  section_data_return(data) {
    //alert("heelo");
    this.globals.loaded.section = true;
    this.globals.sectiondata = data;
    this.members =  Object.keys(this.globals.sectiondata[1].data).map(i => this.globals.sectiondata[1].data[i]);
     this.members.sort(this.compareValuesArray(["patrol","patrol_role_level","age_years","age_months"],"desc"))
     this.matches = this.members.reduce( (acc, o) => (acc[o.first_name] = (acc[o.first_name] || 0)+1, acc), {} );
  }

  ngOnInit() {  
   // this.logonService.getSectionData(this.globals.mysection,this.globals.config[2][this.globals.mysection][this.globals.current_term].termid).subscribe(SectionConfig => this.section_data_return(SectionConfig));
   this.members =  Object.keys(this.globals.sectiondata[1].data).map(i => this.globals.sectiondata[1].data[i]);
     this.members.sort(this.compareValuesArray(["patrol","patrol_role_level","age_years","age_months"],"desc"))
     this.matches = this.members.reduce( (acc, o) => (acc[o.first_name] = (acc[o.first_name] || 0)+1, acc), {} );
     if (this.globals.eventsection!=this.globals.mysection){
     this.globals.event = [];
     this.globals.eventA = [];
     if (!this.globals.access.noaccess) {
            if (this.globals.access.events>0){
             this.logonService.getEventsData().subscribe(Events => this.do_eventsA(Events));
    this.logonService.getEventsAData().subscribe(Events => this.do_events(Events));
            }
            if (this.globals.access.progs>0){
              this.logonService.getProgsData().subscribe(Progs => this.do_progs(Progs));
            }
            }
    
  
    
    this.globals.eventsection=this.globals.mysection;
    this.access = this.globals.sectiondata[5].apis.find(i=>i.apiid==41);
    if (this.globals.access.progs>0){
    if (this.globals.sectiondata[4].items.length==0) {
      this.globals.loaded.progs = true;
    }}
    if (this.globals.access.events>0){
    if  (this.globals.sectiondata[3].items.length==0) {
      this.globals.loaded.events = true;
    }}
     }
  }
}
