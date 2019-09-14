
import {
  Component,
  Injector,
  ViewChild,
  Params,
  OnInit,
  OnChanges,
  OnsSplitterSide,
  OnsNavigator,
  OnsenModule,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from 'ngx-onsenui';

import { AppComponent } from '../app.component';
import { MedicalcardComponent } from '../medicalcard/medicalcard.component';
import { MainComponent } from '../main/main.component';
import { LogonService } from '../logon.service';
import { Globals } from '../globals';
import * as ons from 'onsenui';

@Component({
  selector: 'ons-page[cards]',
  templateUrl: './sectionselect.component.html'
})

export class SectionselectComponent implements OnInit, OnChanges {
  section = new Array;
  localsection = "";
  localname = "";

  constructor(private _navigator: OnsNavigator,
    private inj: Injector,
    private globals: Globals,
    private logonService: LogonService) { }

  push(event, index) {

    if (document.getElementById(this.localsection) != null) {
      document.getElementById(this.localsection).checked = false;
    };
    if (document.getElementById(index.sectionid) != null) {

      document.getElementById(index.sectionid).checked = true;
    }
    this.localsection = index.sectionid;

  }

  find_current_term() {
    var current_term = -1;
    if (this.globals.config[2].hasOwnProperty(this.globals.mysection)) {
      for (var i = 0; i < this.globals.config[2][this.globals.mysection].length; i++) {
        if (this.globals.config[2][this.globals.mysection][i].past == true) { current_term = i }
      }
      var term = this.globals.config[2][this.globals.mysection][current_term].termid;
    }
    this.globals.current_term = current_term;
  }


  section_data_return(data) {
    //alert("heelo");
    this.globals.sectiondata = data;
      this.logonService.setAPIvalues();
    this._navigator.element.replacePage(MainComponent);
  }


  select_section() {
    this.globals.config = this.section;
    this.globals.configread = true;
    this.globals.mysection = this.localsection;
    this.find_current_term();
    var f = this.globals.config[1].find(obj => obj.sectionid == this.localsection);
    this.globals.sectionname = f.groupname + ":" + f.sectionname;
    if (this.globals.current_term != '-1') {
    this.logonService.getSectionData(this.globals.mysection, this.globals.config[2][this.globals.mysection][this.globals.current_term].termid).subscribe(SectionConfig => this.section_data_return(SectionConfig));
    } else {this.logonService.getSectionData(this.globals.mysection, '-1').subscribe(SectionConfig => this.section_data_return(SectionConfig));}


  }

  check() {
    alert("hello")
  }

  openMenu() {
    this.inj.get(AppComponent).menu.nativeElement.open();
  }
  /** 
    section_config_return(config) {
      this.section = config;
      this.globals.configread = true;
      this.globals.config = this.section;
      // Check we still have access to the chosen section
      var found = false;
      for (var i = 0; i < this.globals.config[1].length; i++) {
        if (this.globals.config[1][i].sectionid==this.globals.mysection)
        {
          found = true;
        }
      }
      if ((this.globals.mysection=="")||(found==false))
      {
        this.globals.mysection = this.globals.config[1][0].sectionid;
      }
    
    this.localsection = this.globals.mysection;
    if (found==true)
    {
  
  
  
    let promise = new Promise(function(resolve, reject) {  setTimeout(() => resolve("done!"), 400);  });
  
  promise.then(
    result => this._navigator.element.replacePage(MainComponent), // shows "done!" after 1 second
    error => alert(error) // doesn't run
  )
    };
    }
    */


  ngOnInit() {

    if (!this.globals.configread) {
      this.logonService.getSectionConfig().subscribe(SectionConfig => this.section_config_return(SectionConfig));
    } else {
    this.section = this.globals.config;
      this.localsection = this.globals.mysection;


      // resolve runs the first function in .then


    }
  }

  ngOnChanges() {
    this.section = this.globals.config;
    this.localsection = this.globals.mysection;
  }


}