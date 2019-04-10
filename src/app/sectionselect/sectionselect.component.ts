
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

  select_section() {
    this.globals.config = this.section;
    this.globals.configread = true;
    this.globals.mysection = this.localsection;
    this._navigator.element.replacePage(MainComponent);
   
  }

  check()
  {
    alert("hello")
  }

  openMenu() {
    this.inj.get(AppComponent).menu.nativeElement.open();
  }

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
  


  ngOnInit() {
  
    if (!this.globals.configread) {
      this.logonService.getSectionConfig().subscribe(SectionConfig => this.section_config_return(SectionConfig));
    } else { this.section = this.globals.config;
    this.localsection = this.globals.mysection; 
   

// resolve runs the first function in .then


    }
  }

  ngOnChanges() {
    this.section = this.globals.config; 
    this.localsection = this.globals.mysection;
  }


}