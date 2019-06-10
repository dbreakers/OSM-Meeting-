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
import { Globals } from '../globals';
import * as ons from 'onsenui';
import {  PhotoURLService } from '../photoUrl';
import {  Sortservice } from '../sort';

@Component({
  selector: 'ons-page[lastcheck]',
  templateUrl: './lastchecked.component.html',
   styleUrls: ['./lastchecked.component.css']
})

export class LastcheckedComponent implements OnInit {
  members = new Array;
  namefilter = "";
  typefilter = 1;
  membersdates = new Array;  
  matches = new Object;  
  constructor(private _navigator: OnsNavigator,
    private inj: Injector,
    private globals: Globals,
    private sorting: Sortservice,
    private photoURL: PhotoURLService
    ) { }

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
 no_matches(n) { return this.matches[n] }

sort_list(name,order){
  
  this.members.sort(this.compareValues(name, order))
  this.update_search(0,-1);
}



update_search(s,x) {
  if (x!=-1) {this.typefilter = x;}
  for (var i = 0; i < this.members.length; i++) {
    if (((this.members[i].last_name.toUpperCase()).indexOf(this.namefilter.toUpperCase()) == -1)&&((this.members[i].first_name.toUpperCase()).indexOf(this.namefilter.toUpperCase()) == -1))
    {this.filterdisplay[i]=false} else {this.filterdisplay[i]=true}
    if ((this.typefilter==2)&&(this.filterdisplay[i]==true)) {
      if (this.members[i].custom_data[9][24253]=="")
      {
             this.filterdisplay[i]=false         
      }
    }
    if ((this.typefilter==3)&&(this.filterdisplay[i]==true)) {
      if (this.members[i].custom_data[9][24254]=="")
      {
             this.filterdisplay[i]=false         
      }
    }
   if ((this.typefilter==4)&&(this.filterdisplay[i]==true)) {
      if (this.members[i].custom_data[9][24255]=="")
      {
             this.filterdisplay[i]=false         
      }
    }
    if ((this.typefilter==5)&&(this.filterdisplay[i]==true)) {
      if (this.members[i].custom_data[9][24257]=="")
      {
             this.filterdisplay[i]=false         
      }
    }
  }
}
get_photo_url(member) {
    return this.photoURL.get_osmphoto_url(member);
  }

  
 

  openMenu() {
    this.inj.get(AppComponent).menu.nativeElement.open();
  }

  
  ngOnInit() {

  this.members =  Object.keys(this.globals.sectiondata[1].data).map(i => this.globals.sectiondata[1].data[i]);
  this.matches = this.members.reduce((acc, o) => (acc[o.first_name] = (acc[o.first_name] || 0) + 1, acc), {});  
  for (var i = 0; i < this.members.length; i++) {
    var mbr = new Object;
    mbr.name = this.members[i].first_name + " " + this.members[i].last_name;
    mbr.last_name = this.members[i].last_name;
    mbr.first_name = this.members[i].first_name;
    mbr.photo_guid = this.members[i].photo_guid;
    mbr.member_id = this.members[i].member_id;
    mbr.full = this.members[i].custom_data[9][24267];
   // mbr.full = mbr.full.substring(0,mbr.full.indexOf(","));
    mbr.check = this.members[i].custom_data[9][24267];
    mbr.time = mbr.check.substring(mbr.check.lastIndexOf(" ")+1);
    mbr.date = mbr.check.substring(0,mbr.check.lastIndexOf(" "));
    mbr.date = mbr.date.substring(mbr.date.lastIndexOf(" ")+1);
    this.membersdates.push(mbr);//
  }
  this.membersdates.sort(this.sorting.compareValuesArray(["date"],"desc"))
}


}