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
  templateUrl: './termpicker.component.html'
})

export class TermpickerComponent implements OnInit {
  section = new Array;
  localterm = "";

  constructor(private _navigator: OnsNavigator,
    private inj: Injector,
    private globals: Globals,
    private logonService: LogonService) { }

  push(event, index, i) {
    
  //  if (document.getElementById(this.localterm) != null) {
     // document.getElementById(this.localterm).checked = false;
  //  };
  //  if (document.getElementById(index.sectionid) != null) {

    //  document.getElementById(index.sectionid).checked = true;
 //   }
    this.localterm = i;
    
  }

   section_data_return(data) {
    //alert("heelo");
  this.globals.sectiondata = data;
  this._navigator.element.replacePage(MainComponent);
  }


  select_term() {
    this.globals.current_term = this.localterm;
//    this._navigator.element.replacePage(MainComponent);
  if (this.globals.current_term!='-1') {
   this.logonService.getSectionData(this.globals.mysection,this.globals.config[2][this.globals.mysection][this.globals.current_term].termid).subscribe(SectionConfig => this.section_data_return(SectionConfig));
  } else
  {
    this.logonService.getSectionData(this.globals.mysection,'-1').subscribe(SectionConfig => this.section_data_return(SectionConfig));
  }
  }
  openMenu() {
    this.inj.get(AppComponent).menu.nativeElement.open();
  }




  ngOnInit() {
  
    if (!this.globals.configread) {
    //  this.logonService.getSectionConfig().subscribe(SectionConfig => this.section_config_return(SectionConfig));
    } else { this.section = this.globals.config;
    this.localterm = this.globals.current_term; 
      }
  }
  


}