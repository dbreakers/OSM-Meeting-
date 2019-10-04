
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





  openMenu() {
    this.inj.get(AppComponent).menu.nativeElement.open();
  }

  
do_QM(qm) {
  this.globals.qm = qm;
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
            this.logonService.getQMListData().subscribe(QM=> this.do_QM(QM));
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
