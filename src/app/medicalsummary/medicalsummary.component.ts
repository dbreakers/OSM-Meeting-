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
import { Globals } from '../globals';
import {  PhotoURLService } from '../photoUrl';

@Component({
  selector: 'ons-page[page-nav-2]',
  templateUrl: './medicalsummary.component.html',
  styleUrls: ['./medicalsummary.component.css']
})

export class MedicalsummaryComponent implements OnInit {
    members = new Array;
    option = -1;
  
  constructor(
    private _params: Params, 
  private inj: Injector,
    private globals: Globals,
     private photoURL: PhotoURLService
  ) { }

  cardTitle: string = 'Custom Card';

include_inreport(member) 
{
  if ((this.option==1)&&(member.custom_data[9][24253]!="")) {return true}
   if ((this.option==2)&&(member.custom_data[9][24254]!="")) {return true}
    if ((this.option==3)&&(member.custom_data[9][24255]!="")) {return true}
     if ((this.option==4)&&(member.custom_data[9][24257]!="")) {return true}
     return false;
}  
  get_photo_url(member) {
    return this.photoURL.get_osmphoto_url(member);
  }

  ngOnInit() { 
     this.members =  Object.keys(this.globals.sectiondata[1].data).map(i => this.globals.sectiondata[1].data[i]);
    if (this._params.data && this._params.data.index)
      this.option = this._params.data.index;
      
  }

  openMenu() {
    this.inj.get(AppComponent).menu.nativeElement.open();
  }
}