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

import { Observable, forkJoin, of, from } from "rxjs";

import { TermpickerComponent } from "../termpicker/termpicker.component";
import { MedicalComponent } from "../medical/medical.component";
import { ProgrammeComponent } from "../programme/programme.component";
import { GlobalsearchComponent } from "../globalsearch/globalsearch.component";
import { EventsComponent } from "../events/events.component";
import { RostaComponent } from "../rosta/rosta.component";
import { LastcheckedComponent } from "../lastchecked/lastchecked.component";
import { AppComponent } from "../app.component";
import { ScoutcardComponent } from "../scoutcard/scoutcard.component";
import { RegisterComponent } from "../register/register.component";
import { SectionselectComponent } from "../sectionselect/sectionselect.component";
import { LeaderrostaComponent } from "../leaderrosta/leaderrosta.component";
import { BirthdayComponent } from "../birthday/birthday.component";
import { QMListsComponent } from "../qmlists/qmlists.component";
import { Globals } from "../globals";
import { LogonService } from "../logon.service";
import { PhotoURLService } from "../photoUrl";
import * as ons from "onsenui";
import { Dropbox } from "dropbox";

@Component({
  selector: "ons-page[settings]",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"]
})
export class MainComponent implements OnInit {
  access = "";
  members = new Array();
  saved_data = [];
  genders = new Object();
  counter = 0;
  lastclick = "";
  lastcheck = LastcheckedComponent;
  termselect = TermpickerComponent;
  register = RegisterComponent;
  program = ProgrammeComponent;
  medical = MedicalComponent;
  events = EventsComponent;
  rosta = RostaComponent;
  globalsearch = GlobalsearchComponent;
  sectionselect = SectionselectComponent;
  birthday = BirthdayComponent;
  qmlists = QMListsComponent;
  leaderrosta = LeaderrostaComponent;
  accessToken = "";
  win: any;
  ac="";
  $scope = "";
  REDIRECT = "https://scouttoolset.firebaseapp.com/auth.html";

  images = new Object();
  dbx = new Dropbox({ clientId: "qxf5tksolzymekf" });
  
  @ViewChild("navi") private navi: OnsNavigator;

  constructor(
    private inj: Injector,
    private globals: Globals,
    private _navigator: OnsNavigator,
    private logonService: LogonService,
    private photoURL: PhotoURLService
  ) {}

  loadPage(page) {
    //  this.menu.nativeElement.close();
    //  this.navi.nativeElement.resetToPage(page, { animation: 'fade' });
    this._navigator.element.pushPage(page, { animation: "fade" });
  }

  openMenu() {
    this.inj.get(AppComponent).menu.nativeElement.open();
  }

  do_QM(qm) {
    this.globals.qmlist = qm;
    this.globals.loaded.qm = true;
  }
  
  do_events_loaded() {
    if ((this.globals.loaded.eventsS)&(this.globals.loaded.eventsA)&(this.globals.loaded.eventsL)&(this.globals.loaded.eventsSS)) {
      this.globals.loaded.events = true;
    }
  }

  do_events(e) {
    this.globals.event = e;
    this.globals.loaded.eventsL = true;
   this.do_events_loaded()
  }

  do_eventsA(e) {
    this.globals.eventA = e;
    this.globals.loaded.eventsA = true;
     this.do_events_loaded()
  }

   do_eventsS(e) {
    this.globals.eventS = e;
    this.globals.loaded.eventsS = true;
     this.do_events_loaded()
  }

     do_eventsSS(e) {
    this.globals.eventSS = e;
    this.globals.loaded.eventsSS = true;
     this.do_events_loaded()
  }

  do_progs(p) {
    this.globals.progs = p;
    // this.globals.loadprogs=true;
    this.globals.loaded.progs = true;
  }

  do_drop() {
  //debugger;
  this.accessToken = this.gup(this.$scope,"access_token")
  localStorage.setItem("dropbox_token", this.accessToken);
  //this.dbx = new Dropbox({ accessToken: this.accessToken });
 /* this.dbx
     .filesListFolder({ path: "" })
     .then(response => this.get_thumbs(response));
 */   
  
}
  validateToken(token) {}

  gup(url, name) {
    name = name.replace(/[[]/, "[").replace(/[]]/, "]");
    var regexS = "[#?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    if (results == null) return "";
    else return results[1];
  }

  dropbox() {
   this.REDIRECT = window.document.URL+"auth.html"
    var authUrl = this.dbx.getAuthenticationUrl(this.REDIRECT);

    if (this.accessToken=="") {
   //   ons.notification.alert('Dropbox logon will open in a new tab');
   ons.notification.confirm({
      message: 'DropBox logon will open in a new window',
      buttonLabels: 'OK',
      callback: i => {
        
     // localStorage.removeItem("dropbox_token")
     // this.accessToken = "";    
     
    this.win = window.open(authUrl, "_blank");//"windowname1", "width=800, height=600");
    var pollTimer =   window.setInterval(function(t,w,r,a) {

      try {
      //  console.log(w.document.URL);
        if (w.document.URL.indexOf(r) != -1) {
          window.clearInterval(pollTimer);
          var url = w.document.URL;
    
           t.$scope = url;
          w.close();
          t.do_drop();
        }
      } catch (e) {}
    }, 100, this, this.win, this.REDIRECT, this.ac); 
       }
      
    });
    }
    if (this.accessToken!="") {
      ons.notification.confirm({
      message: 'Remove connection to DropBox?',
      cancelable: true,
      callback: i => {
        if (i == 1) {
      localStorage.removeItem("dropbox_token")
      this.accessToken = "";    
        }
      }
    });
     
    }  
  }

  download() {
 localStorage.setItem(this.globals.mysection, JSON.stringify(this.globals));
 var ssets = localStorage.getItem("saved_sets");
 var current_save = new Object;
 current_save.date = new Date()
 current_save.section = this.globals.mysection;
 current_save.name = this.globals.sectionname;
 if (ssets === null){
   this.saved_data = [];
   this.saved_data.push(current_save)
 } else {
   this.saved_data = JSON.parse(ssets);
   var ms = this.globals.mysection
   if (this.saved_data.findIndex(function(element) {
      return element.section == ms;})>-1){
   this.saved_data.splice(this.saved_data.findIndex(function(element) {
      return element.section == ms;}),1)}
    this.saved_data.push(current_save)

 }
 localStorage.setItem("saved_sets", JSON.stringify(this.saved_data));

  }
  upload() {

  }

  /* section_data_return(data) {
    //alert("heelo");
    this.globals.loaded.section = true;
    this.globals.sectiondata = data;
    this.members = Object.keys(this.globals.sectiondata[1].data).map(
      i => this.globals.sectiondata[1].data[i]
    );
   
    this.genders = this.members.reduce(
      (acc, o) => ((acc[o.gender] = (acc[o.gender] || 0) + 1), acc),
      {}
    );
  }*/

  ngOnInit() {
   
    this.members = Object.keys(this.globals.sectiondata[1].data).map(
      i => this.globals.sectiondata[1].data[i]
    );
     this.genders = this.members.reduce(
      (acc, o) => ((acc[o.gender] = (acc[o.gender] || 0) + 1), acc),
      {}
    ); 
    //  if (this.globals.eventsection!=this.globals.mysection){

    if (!this.globals.access.noaccess) {
      var fj = [];
      if (!this.globals.loaded.events && this.globals.access.events > 0) {
        fj.push(
          this.logonService
            .getEventsData()
            .subscribe(Events => this.do_eventsA(Events))
        );
        fj.push(
          this.logonService
            .getEventsAData()
            .subscribe(Events => this.do_events(Events))
        );
        fj.push(
          this.logonService
            .getEventsSData()
            .subscribe(Events => this.do_eventsS(Events))
        );
        fj.push(
          this.logonService
            .getEventsSSData()
            .subscribe(Events => this.do_eventsSS(Events))
        );
      }
      if (!this.globals.loaded.progs && this.globals.access.progs > 0) {
        fj.push(
          this.logonService
            .getProgsData()
            .subscribe(Progs => this.do_progs(Progs))
        );
      }
      fj.push(
        this.logonService.getQMListData().subscribe(QM => this.do_QM(QM))
      );
      forkJoin(fj);
    }
    //  }

    // Deal with the scenario where we have access but no data
    this.access = this.globals.sectiondata[5].apis.find(i => i.apiid == 41);
    if (this.globals.access.progs > 0) {
      if (this.globals.sectiondata[4].items.length == 0) {
        this.globals.loaded.progs = true;
      }
    }
    if (this.globals.access.events > 0) {
      if (this.globals.sectiondata[3].items.length == 0) {
        this.globals.loaded.events = true;
      }
    }
    this.accessToken = localStorage.getItem("dropbox_token");
  }
}
