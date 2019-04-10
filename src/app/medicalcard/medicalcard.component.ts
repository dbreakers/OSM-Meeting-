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
import {  PhotoURLService } from '../photoUrl';
@Component({
  selector: 'ons-page[medicalcard]',
  templateUrl: './medicalcard.component.html',
  styleUrls: ['./medicalcard.component.css']
})

export class MedicalcardComponent implements OnInit {
    members = new Array;
    member_index = -1;
    member_image = "";
    member = "";
    member_find="";
  constructor(
    private _params: Params, 
    private _navigator: OnsNavigator,
  private inj: Injector,
    private globals: Globals,
    private photoURL: PhotoURLService
  ) { }

  cardTitle: string = 'Custom Card';


  goto_scoutcard(event, member) {
     this._navigator.element.pushPage(ScoutcardComponent, { data: { index: member.member_id } });
  }

  get_photo_url(member) {
   return this.photoURL.get_osmphoto_url(member);
  }

  find_member(f)
  { return f.member_id === this.member_find ;}
  
  ngOnInit() { 
       this.members =  Object.keys(this.globals.sectiondata[1].data).map(i => this.globals.sectiondata[1].data[i]);
    if (this._params.data && this._params.data.index){
      this.member_find = this._params.data.index;
      this.member = this.members.find(o => o.member_id === this._params.data.index);
      this.member_index = this.members.indexOf(this.member);
      this.cardTitle = this.member.first_name+" "+this.member.last_name;
      this.member_image = this.get_photo_url(this.member);
    }  
  }
  

  openMenu() {
    this.inj.get(AppComponent).menu.nativeElement.open();
  }
}