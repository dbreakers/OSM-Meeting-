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

  push(event, index) {
    
    if (document.getElementById(this.localterm) != null) {
      document.getElementById(this.localterm).checked = false;
    };
    if (document.getElementById(index.sectionid) != null) {

      document.getElementById(index.sectionid).checked = true;
    }
    this.localterm = index.termid;
    
  }

  select_term() {
    this.globals.current_term = this.localterm;
    this._navigator.element.replacePage(MainComponent);
   
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